const tagsModel = require('../models/tagModel');

// Отримати всі теги
const getAllTags = async (req, res) => {
    try {
        const tags = await tagsModel.getAllTags();
        res.status(200).json(tags);
    } catch (error) {
        console.error('Error getting all tags:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Створити новий тег
const createTag = async (req, res) => {
    try {
        const newTag = await tagsModel.createTag(req.body);
        res.status(201).json(newTag);
    } catch (error) {
        console.error('Error creating tag:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Оновити тег
const updateTag = async (req, res) => {
    try {
        const updatedTag = await tagsModel.updateTag(req.params.id, req.body);
        res.status(200).json(updatedTag);
    } catch (error) {
        console.error('Error updating tag:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Видалити тег
const deleteTag = async (req, res) => {
    try {
        await tagsModel.deleteTag(req.params.id);
        res.status(204).end();
    } catch (error) {
        console.error('Error deleting tag:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getAllTags,
    createTag,
    updateTag,
    deleteTag
};
