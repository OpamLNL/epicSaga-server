const initializeDatabaseConnection = require('../config/database');

const getCommentById = async (commentId) => {
    const sqlQuery = 'SELECT * FROM comments WHERE id = ?';
    return initializeDatabaseConnection.query(sqlQuery, [commentId]);
};

const getAllComments = async () => {
    const sqlQuery = 'SELECT id, user_id, content, created_at FROM comments';
    return initializeDatabaseConnection.query(sqlQuery);
};

const createComment = async (commentData) => {
    const sqlQuery = 'INSERT INTO comments SET ?';
    return initializeDatabaseConnection.query(sqlQuery, commentData);
};

const updateComment = async (commentId, commentData) => {
    const sqlQuery = 'UPDATE comments SET ? WHERE id = ?';
    return initializeDatabaseConnection.query(sqlQuery, [commentData, commentId]);
};

const deleteComment = async (commentId) => {
    const sqlQuery = 'DELETE FROM comments WHERE id = ?';
    return initializeDatabaseConnection.query(sqlQuery, [commentId]);
};

module.exports = {
    getCommentById,
    getAllComments,
    createComment,
    updateComment,
    deleteComment
}