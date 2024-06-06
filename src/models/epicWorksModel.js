const epicWorksRepository = require('../repositories/epicWorksRepository');

const getAllEpicWorks = async () => {
    try {
        const epicWorks = await epicWorksRepository.getAllEpicWorks();
        return epicWorks;
    } catch (error) {
        throw new Error('Помилка отримання списку Epic Works: ' + error.message);
    }
};

const getEpicWorkById = async (id) => {
    try {
        const epicWork = await epicWorksRepository.getEpicWorkById(id);
        if (!epicWork) {
            throw new Error('Epic Work не знайдено.');
        }
        return epicWork;
    } catch (error) {
        throw new Error('Помилка отримання Epic Work: ' + error.message);
    }
};

const createEpicWork = async (epicWorkData) => {
    try {
        const newEpicWork = await epicWorksRepository.createEpicWork(epicWorkData);
        return newEpicWork;
    } catch (error) {
        throw new Error('Помилка створення Epic Work: ' + error.message);
    }
};

const updateEpicWork = async (id, epicWorkData) => {
    try {
        const updatedEpicWork = await epicWorksRepository.updateEpicWork(id, epicWorkData);
        if (!updatedEpicWork) {
            throw new Error('Epic Work не знайдено.');
        }
        return updatedEpicWork;
    } catch (error) {
        throw new Error('Помилка оновлення Epic Work: ' + error.message);
    }
};

const deleteEpicWork = async (id) => {
    try {
        const deletedEpicWork = await epicWorksRepository.deleteEpicWork(id);
        if (!deletedEpicWork) {
            throw new Error('Epic Work не знайдено.');
        }
        return { id };
    } catch (error) {
        throw new Error('Помилка видалення Epic Work: ' + error.message);
    }
};

module.exports = {
    getAllEpicWorks,
    getEpicWorkById,
    createEpicWork,
    updateEpicWork,
    deleteEpicWork
};
