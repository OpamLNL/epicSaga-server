const epicWorkTypeRelationsRepository = require('../repositories/epicWorkTypeRelationsRepository');

const getAllRelations = async () => {
    try {
        const relations = await epicWorkTypeRelationsRepository.getAllRelations();
        return relations;
    } catch (error) {
        throw new Error('Помилка отримання відношень: ' + error.message);
    }
};

const getRelationsByTypeId = async (typeId) => {
    try {
        const relations = await epicWorkTypeRelationsRepository.getRelationsByTypeId(typeId);
        return relations;
    } catch (error) {
        throw new Error('Помилка отримання відношень за типом: ' + error.message);
    }
};

const getRelationsByWorkId = async (workId) => {
    try {
        const relations = await epicWorkTypeRelationsRepository.getRelationsByWorkId(workId);
        return relations;
    } catch (error) {
        throw new Error('Помилка отримання відношень за роботою: ' + error.message);
    }
};

module.exports = {
    getAllRelations,
    getRelationsByTypeId,
    getRelationsByWorkId
};
