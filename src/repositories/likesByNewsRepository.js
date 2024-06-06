const initializeDatabaseConnection = require('../config/database');

const getLikesByNewsId = async (newsId) => {
    const sqlQuery = 'SELECT * FROM likes WHERE news_id = ?';
    return await initializeDatabaseConnection.query(sqlQuery, [newsId]);
};

const addLikeToNews = async (likeData) => {
    const sqlQuery = 'INSERT INTO likes SET ?';
    return await initializeDatabaseConnection.query(sqlQuery, likeData);
};

const removeLikeFromNews = async (likeId) => {
    const sqlQuery = 'DELETE FROM likes WHERE id = ?';
    return await initializeDatabaseConnection.query(sqlQuery, [likeId]);
};

module.exports = {
    getLikesByNewsId,
    addLikeToNews,
    removeLikeFromNews
};
