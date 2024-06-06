const epicWorkTypeRelationsModel = require('../models/epicWorkTypeRelationsModel');

const getAllRelations = async (req, res) => {
    try {
        const relations = await epicWorkTypeRelationsModel.getAllRelations();
        res.json(relations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getRelationsByTypeId = async (req, res) => {
    try {
        const relations = await epicWorkTypeRelationsModel.getRelationsByTypeId(req.params.epic_work_type_id);
        res.json(relations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getRelationsByWorkId = async (req, res) => {
    try {
        const relations = await epicWorkTypeRelationsModel.getRelationsByWorkId(req.params.epic_work_id);
        res.json(relations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllRelations,
    getRelationsByTypeId,
    getRelationsByWorkId
};
