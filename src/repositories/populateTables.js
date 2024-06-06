const fs = require('fs');
const path = require('path');

async function isTableEmpty(tableName, query) {
    const result = await query(`SELECT EXISTS (SELECT 1 FROM ${tableName} LIMIT 1) AS exist`);
    console.log(`Перевірка таблиці ${tableName}:`, result); // Додаємо логування
    return !result[0].exist; // Переконуємось, що в таблиці немає записів
}

async function populateTableFromFile(filePath, insertQuery, valuesMapper, query) {
    const dataPath = path.join(__dirname, 'data', filePath);
    let data;
    try {
        data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
        console.log(`Дані з файлу ${dataPath} успішно зчитані:`, data); // Додаємо логування
    } catch (err) {
        console.error(`Помилка при зчитуванні або парсингу файлу ${dataPath}:`, err);
        return;
    }

    if (!Array.isArray(data)) {
        console.error(`Помилка: дані з файлу ${dataPath} не є масивом.`);
        return;
    }

    for (const item of data) {
        console.log(`Вставка даних:`, item); // Логування даних перед вставкою
        await query(insertQuery, valuesMapper(item));
    }
}

async function populateEpicWorkTypesAndTags(query) {
    try {
        const epicWorksPath = path.join(__dirname, 'data', 'epic_works.json');
        const charactersPath = path.join(__dirname, 'data', 'characters.json');
        const epicKeywordsPath = path.join(__dirname, 'data', 'epicKeywords.json');

        const epicWorks = JSON.parse(fs.readFileSync(epicWorksPath, 'utf8'));
        const characters = JSON.parse(fs.readFileSync(charactersPath, 'utf8'));
        const epicKeywords = JSON.parse(fs.readFileSync(epicKeywordsPath, 'utf8'));

        const uniqueTypes = new Set();
        const uniqueTags = new Set();

        // Витягуємо унікальні типи та теги з epic_works.json
        epicWorks.forEach(work => {
            work.epic_work_types.forEach(type => uniqueTypes.add(type));
            work.tags.forEach(tag => uniqueTags.add(tag));
        });

        // Витягуємо унікальні теги з characters.json
        characters.forEach(character => {
            if (character.tags) {
                character.tags.forEach(tag => uniqueTags.add(tag));
            }
        });

        // Витягуємо унікальні теги з epicKeywords.json
        epicKeywords.forEach(keyword => {
            if (keyword.tags) {
                keyword.tags.forEach(tag => uniqueTags.add(tag));
            }
        });

        // Перевірка і вставка даних в таблицю epic_work_types
        if (await isTableEmpty('epic_work_types', query)) {
            for (const type of uniqueTypes) {
                console.log(`Вставка типу:`, type); // Логування перед вставкою
                await query(`
                    INSERT INTO epic_work_types (type_name) VALUES (?)`,
                    [type]
                );
            }
        }

        // Перевірка і вставка даних в таблицю tags
        if (await isTableEmpty('tags', query)) {
            for (const tag of uniqueTags) {
                console.log(`Вставка тега:`, tag); // Логування перед вставкою
                await query(`
                    INSERT INTO tags (name) VALUES (?)`,
                    [tag]
                );
            }
        }

        console.log('Таблиці epic_work_types та tags заповнені успішно.');
    } catch (error) {
        console.error('Помилка при заповненні таблиць epic_work_types та tags:', error);
    }
}

async function populateEpicWorkTypeAndTagRelations(query) {
    try {
        const epicWorksPath = path.join(__dirname, 'data', 'epic_works.json');
        const charactersPath = path.join(__dirname, 'data', 'characters.json');
        const epicKeywordsPath = path.join(__dirname, 'data', 'epicKeywords.json');

        const epicWorks = JSON.parse(fs.readFileSync(epicWorksPath, 'utf8'));
        const characters = JSON.parse(fs.readFileSync(charactersPath, 'utf8'));
        const epicKeywords = JSON.parse(fs.readFileSync(epicKeywordsPath, 'utf8'));

        const works = await query(`SELECT id, title FROM epic_works`);
        const charactersInDb = await query(`SELECT id, name_english FROM characters`);
        const keywordsInDb = await query(`SELECT id, name FROM epic_keywords`);

        const workIdMap = {};
        works.forEach(work => {
            workIdMap[work.title] = work.id;
        });

        const characterIdMap = {};
        charactersInDb.forEach(character => {
            characterIdMap[character.name_english] = character.id;
        });

        const keywordIdMap = {};
        keywordsInDb.forEach(keyword => {
            keywordIdMap[keyword.name] = keyword.id;
        });

        const typeIdMap = {};
        const types = await query(`SELECT id, type_name FROM epic_work_types`);
        types.forEach(type => {
            typeIdMap[type.type_name] = type.id;
        });

        const tagIdMap = {};
        const tags = await query(`SELECT id, name FROM tags`);
        tags.forEach(tag => {
            tagIdMap[tag.name] = tag.id;
        });

        // Заповнення таблиці epic_work_type_relations
        if (await isTableEmpty('epic_work_type_relations', query)) {
            for (const work of epicWorks) {
                const workId = workIdMap[work.title];
                for (const type of work.epic_work_types) {
                    const typeId = typeIdMap[type];
                    await query(`
                        INSERT INTO epic_work_type_relations (epic_work_id, epic_work_type_id) VALUES (?, ?)`,
                        [workId, typeId]
                    );
                }
            }
        }

        // Заповнення таблиці epic_work_tag_relations
        if (await isTableEmpty('epic_work_tag_relations', query)) {
            for (const work of epicWorks) {
                const workId = workIdMap[work.title];
                for (const tag of work.tags) {
                    const tagId = tagIdMap[tag];
                    await query(`
                        INSERT INTO epic_work_tag_relations (epic_work_id, tag_id) VALUES (?, ?)`,
                        [workId, tagId]
                    );
                }
            }
        }

        // Заповнення таблиці character_tags
        if (await isTableEmpty('character_tags', query)) {
            for (const character of characters) {
                const characterId = characterIdMap[character.name_english];
                for (const tag of character.tags) {
                    const tagId = tagIdMap[tag];
                    await query(`
                        INSERT INTO character_tags (character_id, tag_id) VALUES (?, ?)`,
                        [characterId, tagId]
                    );
                }
            }
        }

        // Заповнення таблиці epic_keywords
        if (await isTableEmpty('epic_keywords', query)) {
            for (const keyword of epicKeywords) {
                await query(`
                    INSERT INTO epic_keywords (name, description, images, tags) VALUES (?, ?, ?, ?)`,
                    [keyword.name, keyword.description, JSON.stringify(keyword.images), JSON.stringify(keyword.tags)]
                );
            }
        }

        // Заповнення таблиці character_epic_work
        if (await isTableEmpty('character_epic_work', query)) {
            for (const work of epicWorks) {
                const workId = workIdMap[work.title];
                for (const character of work.characters) {
                    const characterId = characterIdMap[character];
                    if (characterId) {
                        await query(`
                            INSERT INTO character_epic_work (character_id, epic_work_id) VALUES (?, ?)`,
                            [characterId, workId]
                        );
                    }
                }
            }
        }

        console.log('Таблиці заповнені успішно.');
    } catch (error) {
        console.error('Помилка при заповненні таблиць epic_work_type_relations, epic_work_tag_relations та character_epic_work:', error);
    }
}

async function populateTables(query) {
    try {
        // Перевірка і вставка даних в таблицю users
        if (await isTableEmpty('users', query)) {
            await populateTableFromFile('users.json', `
                        INSERT INTO users (username, password, email, role, language, timezone) VALUES (?, ?, ?, ?, ?, ?)`,
                user => [user.username, user.password, user.email, user.role, user.language, user.timezone], query
            );
        }

        // Перевірка і вставка даних в таблицю characters
        if (await isTableEmpty('characters', query)) {
            await populateTableFromFile('characters.json', `
        INSERT INTO characters (name, name_original, name_english, description, aliases, images, tags) VALUES (?, ?, ?, ?, ?, ?, ?)`,
                character => [
                    character.name,
                    character.name_original,
                    character.name_english,
                    character.description,
                    JSON.stringify(character.aliases),
                    JSON.stringify(character.images),
                    JSON.stringify(character.tags)
                ],
                query
            );
        }


        // Перевірка і вставка даних в таблицю epic_works
        if (await isTableEmpty('epic_works', query)) {
            await populateTableFromFile('epic_works.json', `
                        INSERT INTO epic_works (title, title_original, title_english, summary, images, full_text_link_english, full_text_link_ukrainian, full_text_link_original, epic_work_types, tags, characters) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                epicWork => [epicWork.title, epicWork.title_original, epicWork.title_english, epicWork.summary, JSON.stringify(epicWork.images), epicWork.full_text_link_english, epicWork.full_text_link_ukrainian, epicWork.full_text_link_original, JSON.stringify(epicWork.epic_work_types), JSON.stringify(epicWork.tags), JSON.stringify(epicWork.characters)], query
            );
        }

        // Виклик функції для заповнення epic_work_types та tags
        await populateEpicWorkTypesAndTags(query);

        // Виклик функції для заповнення зв'язків epic_work_type_relations, epic_work_tag_relations та character_epic_work
        await populateEpicWorkTypeAndTagRelations(query);

        console.log('Таблиці заповнені успішно.');
    } catch (error) {
        console.error('Помилка при заповненні таблиць:', error);
    }
}

module.exports = { populateTables };
