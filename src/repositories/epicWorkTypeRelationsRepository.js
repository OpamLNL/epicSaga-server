const initializeDatabaseConnection = require('../config/database');

const getAllRelations = async () => {
    const sqlQuery = 'SELECT * FROM epic_work_type_relations';
    return await initializeDatabaseConnection.query(sqlQuery);
};

const getRelationsByTypeId = async (typeId) => {
    const sqlQuery = 'SELECT * FROM epic_work_type_relations WHERE epic_work_type_id = ?';
    const [relations, fields] = await initializeDatabaseConnection.query(sqlQuery, [typeId]);
    return relations;
};

const getRelationsByWorkId = async (workId) => {
    const sqlQuery = 'SELECT * FROM epic_work_type_relations WHERE epic_work_id = ?';
    const [relations, fields] = await initializeDatabaseConnection.query(sqlQuery, [workId]);
    return relations;
};

module.exports = {
    getAllRelations,
    getRelationsByTypeId,
    getRelationsByWorkId
};
