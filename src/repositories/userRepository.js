const initializeDatabaseConnection = require('../config/database');

const getUserById = async (userId) => {
    const sqlQuery = 'SELECT * FROM users WHERE id = ?';
    return initializeDatabaseConnection.query(sqlQuery, [userId]);
};

const getUserByUsername = async (userName) => {
    const sqlQuery = 'SELECT * FROM users WHERE username = ? LIMIT 1';

    const [users, fields] = await initializeDatabaseConnection.query(sqlQuery, [userName]);
    return users || null;
};


const getUserByEmail = async (email) => {
    const sqlQuery = 'SELECT * FROM users WHERE email = ?';
    const [users, fields] = await initializeDatabaseConnection.query(sqlQuery, [email]);
    return users || null;
};

const getAllUsers = async () => {
    const sqlQuery = 'SELECT id, username, email, role FROM users';
    return await initializeDatabaseConnection.query(sqlQuery);
};

const createUser = async (userData) => {
    const sqlQuery = 'INSERT INTO users SET ?';
    return initializeDatabaseConnection.query(sqlQuery, userData);
};

const updateUser = async (userId, userData) => {
    let sqlQuery = `UPDATE users SET`;
    let values = [];
    let isFirstField = true;

    // Перевірка, чи було змінено ім'я користувача
    if (userData.username) {
        sqlQuery += ` username = ?`;
        values.push(userData.username);
        isFirstField = false;
    }

    // Перевірка, чи було змінено email
    if (userData.email) {
        if (!isFirstField) sqlQuery += `,`;
        sqlQuery += ` email = ?`;
        values.push(userData.email);
        isFirstField = false;
    }

    // Перевірка, чи було змінено пароль
    if (userData.password) {
        if (!isFirstField) sqlQuery += `,`;
        sqlQuery += ` password = ?`;
        values.push(userData.password);
        isFirstField = false;
    }

    // Перевірка, чи було змінено аватар
    if (userData.avatar) {
        if (!isFirstField) sqlQuery += `,`;
        sqlQuery += ` avatar = ?`;
        values.push(userData.avatar);
        isFirstField = false;
    }

    // Перевірка, чи було змінено біо
    if (userData.bio) {
        if (!isFirstField) sqlQuery += `,`;
        sqlQuery += ` bio = ?`;
        values.push(userData.bio);
        isFirstField = false;
    }

    // Перевірка, чи було змінено номер телефону
    if (userData.phone_number) {
        if (!isFirstField) sqlQuery += `,`;
        sqlQuery += ` phone_number = ?`;
        values.push(userData.phone_number);
        isFirstField = false;
    }

    // Перевірка, чи було змінено статус
    if (userData.status) {
        if (!isFirstField) sqlQuery += `,`;
        sqlQuery += ` status = ?`;
        values.push(userData.status);
        isFirstField = false;
    }

    sqlQuery += ` WHERE id = ?`;
    values.push(userId);

    try {
        const [result] = await initializeDatabaseConnection.query(sqlQuery, values);
        return result;
    } catch (error) {
        console.error('Помилка оновлення користувача:', error);
        throw error;
    }
};


const deleteUser = async (userId) => {
    const cleanedUserId = userId.substring(1); // Прибираємо перший символ (двокрапку) не знаю чи та нормально
    const sqlQuery = 'DELETE FROM users WHERE id = ?';
    return initializeDatabaseConnection.query(sqlQuery, [cleanedUserId]);
};

const getActiveUsers = async () => {
    const currentTimeMs = Date.now();
    const activeTimePeriodMs = currentTimeMs - (15 * 60 * 1000);
    const activeTimePeriod = new Date(activeTimePeriodMs);
    const sqlQuery = 'SELECT * FROM users WHERE last_visit >= ?';
    return initializeDatabaseConnection.query(sqlQuery, [activeTimePeriod]);
};


module.exports = {
    getUserById,
    getUserByUsername,
    getUserByEmail,
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    getActiveUsers
};
