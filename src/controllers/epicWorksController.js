const epicWorksModel = require('../models/epicWorksModel');

const getAllEpicWorks = async (req, res) => {

    try {
        const epicWorks = await epicWorksModel.getAllEpicWorks();
        res.json(epicWorks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }



};

const getEpicWorkById = async (req, res) => {

    try {
        const epicWork = await epicWorksModel.getEpicWorkById(req.params.id);
        if (!epicWork) return res.status(404).json({ message: 'Epic Work не знайдено.' });
        res.json(epicWork);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createEpicWork = async (req, res) => {
    try {
        const newEpicWork = await epicWorksModel.createEpicWork(req.body);
        res.status(201).json(newEpicWork);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateEpicWork = async (req, res) => {
    try {
        const updatedEpicWork = await epicWorksModel.updateEpicWork(req.params.id, req.body);
        if (!updatedEpicWork) return res.status(404).json({ message: 'Epic Work не знайдено.' });
        res.json(updatedEpicWork);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteEpicWork = async (req, res) => {
    try {
        const deletedEpicWork = await epicWorksModel.deleteEpicWork(req.params.id);
        if (!deletedEpicWork) return res.status(404).json({ message: 'Epic Work не знайдено.' });
        res.json({ message: 'Epic Work видалено.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllEpicWorks,
    getEpicWorkById,
    createEpicWork,
    updateEpicWork,
    deleteEpicWork
};
