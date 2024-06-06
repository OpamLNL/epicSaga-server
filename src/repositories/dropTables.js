#!/usr/bin/node

const mysql = require('mysql2/promise');


const { poolConfig } = require('./.poolConfig');

// Створення пулу з'єднань
const pool = mysql.createPool(poolConfig);

// Функція для виконання запитів
async function query(sql, params) {
    const [results] = await pool.query(sql, params);
    return results;
}

// Функція для видалення всіх таблиць
async function dropAllTables() {
    try {
        // Відключення перевірки зовнішніх ключів для уникнення помилок
        await query('SET FOREIGN_KEY_CHECKS = 0;');

        // Отримання імен всіх таблиць
        const tables = await query(`SELECT table_name FROM information_schema.tables WHERE table_schema = 'defaultdb';`);

        // Видалення кожної таблиці
        for (let table of tables) {
            await query(`DROP TABLE IF EXISTS \`${table.table_name}\`;`);
            console.log(`Table ${table.table_name} dropped.`);
        }

        // Включення перевірки зовнішніх ключів знову
        await query('SET FOREIGN_KEY_CHECKS = 1;');
        console.log('All tables dropped successfully.');
    } catch (error) {
        console.error('Error dropping tables:', error);
    }
}

// Функція для закриття пулу з'єднань
async function closePool() {
    await pool.end();
}

async function setupDatabase() {
    await dropAllTables();
    await closePool();
}

setupDatabase()
    .then(() => console.log('Database cleanup complete.'))
    .catch((error) => console.error('Error cleaning up database:', error));
