const pool = require('../config/database');

const getAllCharacters = async () => {
    const sqlQuery = 'SELECT * FROM characters';
    return await pool.query(sqlQuery);
};

const getCharacterById = async (id) => {
    const sqlQuery = 'SELECT * FROM characters WHERE id = ?';
    const [characters, fields] = await pool.query(sqlQuery, [id]);
    return characters || null;
};

const createCharacter = async (characterData) => {
    const sqlQuery = 'INSERT INTO characters SET ?';
    return pool.query(sqlQuery, characterData);
};

const updateCharacter = async (id, characterData) => {
    let sqlQuery = `UPDATE characters SET`;
    let values = [];
    let isFirstField = true;

    if (characterData.name) {
        sqlQuery += ` name = ?`;
        values.push(characterData.name);
        isFirstField = false;
    }

    if (characterData.name_original) {
        if (!isFirstField) sqlQuery += `,`;
        sqlQuery += ` name_original = ?`;
        values.push(characterData.name_original);
        isFirstField = false;
    }

    if (characterData.name_english) {
        if (!isFirstField) sqlQuery += `,`;
        sqlQuery += ` name_english = ?`;
        values.push(characterData.name_english);
        isFirstField = false;
    }

    if (characterData.description) {
        if (!isFirstField) sqlQuery += `,`;
        sqlQuery += ` description = ?`;
        values.push(characterData.description);
        isFirstField = false;
    }

    if (characterData.aliases) {
        if (!isFirstField) sqlQuery += `,`;
        sqlQuery += ` aliases = ?`;
        values.push(JSON.stringify(characterData.aliases));
        isFirstField = false;
    }

    if (characterData.images) {
        if (!isFirstField) sqlQuery += `,`;
        sqlQuery += ` images = ?`;
        values.push(JSON.stringify(characterData.images));
        isFirstField = false;
    }

    if (characterData.tags) {
        if (!isFirstField) sqlQuery += `,`;
        sqlQuery += ` tags = ?`;
        values.push(JSON.stringify(characterData.tags));
        isFirstField = false;
    }

    sqlQuery += ` WHERE id = ?`;
    values.push(id);

    try {
        const [result] = await pool.query(sqlQuery, values);
        return result;
    } catch (error) {
        console.error('Помилка оновлення персонажа:', error);
        throw error;
    }
};

const deleteCharacter = async (id) => {
    const sqlQuery = 'DELETE FROM characters WHERE id = ?';
    return pool.query(sqlQuery, [id]);
};

module.exports = {
    getAllCharacters,
    getCharacterById,
    createCharacter,
    updateCharacter,
    deleteCharacter
};
