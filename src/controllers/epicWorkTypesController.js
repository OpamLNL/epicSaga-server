const epicWorkTypesModel = require('../models/epicWorkTypesModel');

const getAllEpicWorkTypes = async (req, res) => {

    try {

        const epicWorkTypes = await epicWorkTypesModel.getAllEpicWorkTypes();

        res.json(epicWorkTypes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getEpicWorkTypeById = async (req, res) => {
    try {
        const epicWorkType = await epicWorkTypesModel.getEpicWorkTypeById(req.params.id);
        if (!epicWorkType) return res.status(404).json({ message: 'Тип Epic Work не знайдено.' });
        res.json(epicWorkType);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createEpicWorkType = async (req, res) => {
    try {
        const newEpicWorkType = await epicWorkTypesModel.createEpicWorksType(req.body);
        res.status(201).json(newEpicWorkType);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateEpicWorkType = async (req, res) => {
    try {
        const updatedEpicWorkType = await epicWorkTypesModel.updateEpicWorkType(req.params.id, req.body);
        if (!updatedEpicWorkType) return res.status(404).json({ message: 'Тип Epic Work не знайдено.' });
        res.json(updatedEpicWorkType);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteEpicWorkType = async (req, res) => {
    try {
        const deletedEpicWorkType = await epicWorkTypesModel.deleteEpicWorkType(req.params.id);
        if (!deletedEpicWorkType) return res.status(404).json({ message: 'Тип Epic Work не знайдено.' });
        res.json({ message: 'Тип Epic Work видалено.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllEpicWorkTypes,
    getEpicWorkTypeById,
    createEpicWorkType,
    updateEpicWorkType,
    deleteEpicWorkType
};
