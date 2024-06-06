const initializeDatabaseConnection = require('../config/database');

const getNewsById = async (newsId) => {
    const sqlQuery = 'SELECT * FROM news WHERE id = ?';
    return initializeDatabaseConnection.query(sqlQuery, [newsId]);
};

const getAllNews = async () => {
    const sqlQuery = 'SELECT id, title, content, published_date, image_url FROM news';
    return initializeDatabaseConnection.query(sqlQuery);
};

const createNews = async (newsData) => {
    const sqlQuery = 'INSERT INTO news SET ?';
    return initializeDatabaseConnection.query(sqlQuery, newsData);
};

const updateNews = async (newsId, newsData) => {
    const sqlQuery = 'UPDATE news SET ? WHERE id = ?';
    return initializeDatabaseConnection.query(sqlQuery, [newsData, newsId]);
};

const deleteNews = async (newsId) => {
    const cleanedNewsId = newsId.substring(1);
    const sqlQuery = 'DELETE FROM news WHERE id = ?';
    return initializeDatabaseConnection.query(sqlQuery, [cleanedNewsId]);
};

module.exports = {
    getNewsById,
    getAllNews,
    createNews,
    updateNews,
    deleteNews
};