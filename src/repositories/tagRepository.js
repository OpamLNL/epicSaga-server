const initializeDatabaseConnection = require('../config/database');

const getTagById = async (tagId) => {
    const sqlQuery = 'SELECT * FROM tags WHERE id = ?';
    return await initializeDatabaseConnection.query(sqlQuery, [tagId]);
};

const getAllTags = async () => {
    const sqlQuery = 'SELECT id, name, description FROM tags';
    return await initializeDatabaseConnection.query(sqlQuery);
};

const createTag = async (tagData) => {
    const sqlQuery = 'INSERT INTO tags SET ?';
    return await initializeDatabaseConnection.query(sqlQuery, tagData);
};

const updateTag = async (tagId, tagData) => {
    const sqlQuery = 'UPDATE tags SET ? WHERE id = ?';
    return await initializeDatabaseConnection.query(sqlQuery, [tagData, tagId]);
};

const deleteTag = async (tagId) => {
    const sqlQuery = 'DELETE FROM tags WHERE id = ?';
    return await initializeDatabaseConnection.query(sqlQuery, [tagId]);
};

module.exports = {
    getTagById,
    getAllTags,
    createTag,
    updateTag,
    deleteTag
};