const pool = require('../config/database');


const getAllEpicWorkTypes = async () => {
    const sqlQuery = 'SELECT * FROM epic_work_types';
    return await pool.query(sqlQuery);
};


const getEpicWorkTypeById = async (id) => {
    const sqlQuery = 'SELECT * FROM epic_work_types WHERE id = ?';
    const [epicWorkTypes, fields] = await pool.query(sqlQuery, [id]);
    return epicWorkTypes[0] || null;
};

const createEpicWorkType = async (epicWorkTypeData) => {
    const sqlQuery = 'INSERT INTO epic_work_types SET ?';
    return pool.query(sqlQuery, epicWorkTypeData);
};

const updateEpicWorkType = async (id, epicWorkTypeData) => {
    let sqlQuery = `UPDATE epic_work_types SET`;
    let values = [];
    let isFirstField = true;

    if (epicWorkTypeData.name) {
        sqlQuery += ` name = ?`;
        values.push(epicWorkTypeData.name);
        isFirstField = false;
    }

    if (epicWorkTypeData.description) {
        if (!isFirstField) sqlQuery += `,`;
        sqlQuery += ` description = ?`;
        values.push(epicWorkTypeData.description);
        isFirstField = false;
    }

    sqlQuery += ` WHERE id = ?`;
    values.push(id);

    try {
        const [result] = await pool.query(sqlQuery, values);
        return result;
    } catch (error) {
        console.error('Помилка оновлення типу Epic Work:', error);
        throw error;
    }
};

const deleteEpicWorkType = async (id) => {
    const sqlQuery = 'DELETE FROM epic_work_types WHERE id = ?';
    return pool.query(sqlQuery, [id]);
};

module.exports = {
    getAllEpicWorkTypes,
    getEpicWorkTypeById,
    createEpicWorkType,
    updateEpicWorkType,
    deleteEpicWorkType
};