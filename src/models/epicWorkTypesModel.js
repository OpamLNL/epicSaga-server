const epicWorkTypesRepository = require('../repositories/epicWorkTypesRepository');

const getAllEpicWorkTypes = async () => {
    try {
        const epicWorkTypes = await epicWorkTypesRepository.getAllEpicWorkTypes();
        return epicWorkTypes;
    } catch (error) {
        throw new Error('Помилка отримання списку типів Epic Works: ' + error.message);
    }
};

const getEpicWorkTypeById = async (id) => {
    try {
        const epicWorkType = await epicWorkTypesRepository.getEpicWorkTypeById(id);
        if (!epicWorkType) {
            throw new Error('Тип Epic Work не знайдено.');
        }
        return epicWorkType;
    } catch (error) {
        throw new Error('Помилка отримання типу Epic Work: ' + error.message);
    }
};

const createEpicWorksType = async (epicWorkTypeData) => {
    try {
        const newEpicWorkType = await epicWorkTypesRepository.createEpicWorkType(epicWorkTypeData);
        return newEpicWorkType;
    } catch (error) {
        throw new Error('Помилка створення типу Epic Work: ' + error.message);
    }
};

const updateEpicWorkType = async (id, epicWorkTypeData) => {
    try {
        const updatedEpicWorkType = await epicWorkTypesRepository.updateEpicWorkType(id, epicWorkTypeData);
        if (!updatedEpicWorkType) {
            throw new Error('Тип Epic Work не знайдено.');
        }
        return updatedEpicWorkType;
    } catch (error) {
        throw new Error('Помилка оновлення типу Epic Work: ' + error.message);
    }
};

const deleteEpicWorkType = async (id) => {
    try {
        const deletedEpicWorkType = await epicWorkTypesRepository.deleteEpicWorkType(id);
        if (!deletedEpicWorkType) {
            throw new Error('Тип Epic Work не знайдено.');
        }
        return { id };
    } catch (error) {
        throw new Error('Помилка видалення типу Epic Work: ' + error.message);
    }
};

module.exports = {
    getAllEpicWorkTypes,
    getEpicWorkTypeById,
    createEpicWorksType,
    updateEpicWorkType,
    deleteEpicWorkType
};
