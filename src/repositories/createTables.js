const mysql = require('mysql2/promise');
const { populateTables } = require('./populateTables');
const { poolConfig } = require('./.poolConfig');
const pool = mysql.createPool(poolConfig);

// Функція для виконання запитів
async function query(sql, params) {
    const [results] = await pool.query(sql, params);
    return results;
}

// Функція для закриття пулу з'єднань
async function closePool() {
    await pool.end();
}

async function createTables() {
    try {
        await query(`
            CREATE TABLE IF NOT EXISTS users (
                                                 id INT AUTO_INCREMENT PRIMARY KEY,
                                                 username VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL,
                avatar VARCHAR(255),
                birth_date DATE,
                status VARCHAR(50),
                bio TEXT,
                role VARCHAR(50),
                visit_statistics INT DEFAULT 0,
                email VARCHAR(255) NOT NULL,
                phone_number VARCHAR(20),
                language VARCHAR(10),
                timezone VARCHAR(50),
                last_visit TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
        `);

        await query(`
            CREATE TABLE IF NOT EXISTS characters (
                                                      id INT AUTO_INCREMENT PRIMARY KEY,
                                                      name VARCHAR(255) NOT NULL,
                name_original VARCHAR(255),
                name_english VARCHAR(255),
                description TEXT,
                aliases JSON,
                images JSON,
                tags JSON
                )
        `);

        await query(`
            CREATE TABLE IF NOT EXISTS epic_works (
                                                      id INT AUTO_INCREMENT PRIMARY KEY,
                                                      title VARCHAR(255) NOT NULL,
                title_original VARCHAR(255),
                title_english VARCHAR(255),
                summary TEXT,
                images JSON,
                full_text_link_english TEXT,
                full_text_link_ukrainian TEXT,
                full_text_link_original TEXT,
                epic_work_types JSON,
                tags JSON,
                characters JSON
                )
        `);

        await query(`
            CREATE TABLE IF NOT EXISTS character_epic_work (
                                                               id INT AUTO_INCREMENT PRIMARY KEY,
                                                               character_id INT NOT NULL,
                                                               epic_work_id INT NOT NULL,
                                                               FOREIGN KEY (character_id) REFERENCES characters(id) ON DELETE CASCADE,
                FOREIGN KEY (epic_work_id) REFERENCES epic_works(id) ON DELETE CASCADE
                )
        `);

        await query(`
            CREATE TABLE IF NOT EXISTS epic_work_types (
                                                           id INT AUTO_INCREMENT PRIMARY KEY,
                                                           type_name VARCHAR(255) NOT NULL
                )
        `);

        await query(`
            CREATE TABLE IF NOT EXISTS epic_work_type_relations (
                                                                    id INT AUTO_INCREMENT PRIMARY KEY,
                                                                    epic_work_id INT NOT NULL,
                                                                    epic_work_type_id INT NOT NULL,
                                                                    FOREIGN KEY (epic_work_id) REFERENCES epic_works(id) ON DELETE CASCADE,
                FOREIGN KEY (epic_work_type_id) REFERENCES epic_work_types(id) ON DELETE CASCADE
                )
        `);

        await query(`
            CREATE TABLE IF NOT EXISTS favorites (
                                                     id INT AUTO_INCREMENT PRIMARY KEY,
                                                     user_id INT NOT NULL,
                                                     favorite_id INT NOT NULL,
                                                     favorite_type ENUM('epic_work', 'character') NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
                )
        `);

        await query(`
            CREATE TABLE IF NOT EXISTS tokens (
                                                  id INT AUTO_INCREMENT PRIMARY KEY,
                                                  user_id INT NOT NULL,
                                                  token VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
                )
        `);

        await query(`
            CREATE TABLE IF NOT EXISTS tags (
                                                id INT AUTO_INCREMENT PRIMARY KEY,
                                                name VARCHAR(255) NOT NULL
                )
        `);

        await query(`
            CREATE TABLE IF NOT EXISTS character_tags (
                                                          id INT AUTO_INCREMENT PRIMARY KEY,
                                                          character_id INT NOT NULL,
                                                          tag_id INT NOT NULL,
                                                          FOREIGN KEY (character_id) REFERENCES characters(id) ON DELETE CASCADE,
                FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
                )
        `);


        await query(`
            CREATE TABLE IF NOT EXISTS epic_work_tag_relations (
                                                                   id INT AUTO_INCREMENT PRIMARY KEY,
                                                                   epic_work_id INT NOT NULL,
                                                                   tag_id INT NOT NULL,
                                                                   FOREIGN KEY (epic_work_id) REFERENCES epic_works(id) ON DELETE CASCADE,
                FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
                )
        `);

        await query(`
            CREATE TABLE IF NOT EXISTS epic_keywords (
                                                         id INT AUTO_INCREMENT PRIMARY KEY,
                                                         name VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                images JSON,
                tags JSON
                )
        `);

        console.log('Tables created successfully.');
    } catch (error) {
        console.error('Error creating tables:', error);
    }
}

async function setupDatabase() {
    await createTables();
    await populateTables(query);
    await closePool();
}

setupDatabase()
    .then(() => console.log('Database setup complete.'))
    .catch((error) => console.error('Error setting up database:', error));
