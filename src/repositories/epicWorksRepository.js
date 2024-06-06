const pool = require('../config/database');

const getAllEpicWorks = async () => {
    const sqlQuery = 'SELECT * FROM epic_works';
    return await pool.query(sqlQuery);
};

const getEpicWorkById = async (id) => {

    const sqlQuery = 'SELECT * FROM epic_works WHERE id = ?';
    const [epicWorks, fields] = await pool.query(sqlQuery, [id]);

    return epicWorks || null;
};

const createEpicWork = async (epicWorkData) => {
    const sqlQuery = 'INSERT INTO epic_works SET ?';
    return pool.query(sqlQuery, epicWorkData);
};

const updateEpicWork = async (id, epicWorkData) => {
    let sqlQuery = `UPDATE epic_works SET`;
    let values = [];
    let isFirstField = true;

    if (epicWorkData.title) {
        sqlQuery += ` title = ?`;
        values.push(epicWorkData.title);
        isFirstField = false;
    }

    if (epicWorkData.title_original) {
        if (!isFirstField) sqlQuery += `,`;
        sqlQuery += ` title_original = ?`;
        values.push(epicWorkData.title_original);
        isFirstField = false;
    }

    if (epicWorkData.title_english) {
        if (!isFirstField) sqlQuery += `,`;
        sqlQuery += ` title_english = ?`;
        values.push(epicWorkData.title_english);
        isFirstField = false;
    }

    if (epicWorkData.summary) {
        if (!isFirstField) sqlQuery += `,`;
        sqlQuery += ` summary = ?`;
        values.push(epicWorkData.summary);
        isFirstField = false;
    }

    if (epicWorkData.images) {
        if (!isFirstField) sqlQuery += `,`;
        sqlQuery += ` images = ?`;
        values.push(epicWorkData.images);
        isFirstField = false;
    }

    if (epicWorkData.full_text_link_english) {
        if (!isFirstField) sqlQuery += `,`;
        sqlQuery += ` full_text_link_english = ?`;
        values.push(epicWorkData.full_text_link_english);
        isFirstField = false;
    }

    if (epicWorkData.full_text_link_ukrainian) {
        if (!isFirstField) sqlQuery += `,`;
        sqlQuery += ` full_text_link_ukrainian = ?`;
        values.push(epicWorkData.full_text_link_ukrainian);
        isFirstField = false;
    }

    if (epicWorkData.full_text_link_original) {
        if (!isFirstField) sqlQuery += `,`;
        sqlQuery += ` full_text_link_original = ?`;
        values.push(epicWorkData.full_text_link_original);
        isFirstField = false;
    }

    sqlQuery += ` WHERE id = ?`;
    values.push(id);

    try {
        const [result] = await pool.query(sqlQuery, values);
        return result;
    } catch (error) {
        console.error('Помилка оновлення Epic Work:', error);
        throw error;
    }
};

const deleteEpicWork = async (id) => {
    const sqlQuery = 'DELETE FROM epic_works WHERE id = ?';
    return pool.query(sqlQuery, [id]);
};

module.exports = {
    getAllEpicWorks,
    getEpicWorkById,
    createEpicWork,
    updateEpicWork,
    deleteEpicWork
};
