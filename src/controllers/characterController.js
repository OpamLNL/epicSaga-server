const charactersModel = require('../models/characterModel');

const getAllCharacters = async (req, res) => {
    console.log('getAllCharacters!!!!');
    try {
        const characters = await charactersModel.getAllCharacters();
        res.json(characters);

    } catch (error) {
        res.status(500).json({ message: 'Помилка отримання списку персонажів: ' + error.message });
    }
    console.log('res.json(characters)');
};

const getCharacterById = async (req, res) => {
    console.log('req.params.id');
    console.log(req.params.id);
    try {
        const character = await charactersModel.getCharacterById(req.params.id);
        if (!character) return res.status(404).json({ message: 'Персонаж не знайдено.' });
        res.json(character);
    } catch (error) {
        res.status(500).json({ message: 'Помилка отримання персонажа: ' + error.message });
    }
};

const createCharacter = async (req, res) => {
    try {
        const newCharacter = await charactersModel.createCharacter(req.body);
        res.status(201).json(newCharacter);
    } catch (error) {
        res.status(400).json({ message: 'Помилка створення персонажа: ' + error.message });
    }
};

const updateCharacter = async (req, res) => {
    try {
        const updatedCharacter = await charactersModel.updateCharacter(req.params.id, req.body);
        if (!updatedCharacter) return res.status(404).json({ message: 'Персонаж не знайдено.' });
        res.json(updatedCharacter);
    } catch (error) {
        res.status(400).json({ message: 'Помилка оновлення персонажа: ' + error.message });
    }
};

const deleteCharacter = async (req, res) => {
    try {
        const deletedCharacter = await charactersModel.deleteCharacter(req.params.id);
        if (!deletedCharacter) return res.status(404).json({ message: 'Персонаж не знайдено.' });
        res.json({ message: 'Персонаж видалено.' });
    } catch (error) {
        res.status(500).json({ message: 'Помилка видалення персонажа: ' + error.message });
    }
};

module.exports = {
    getAllCharacters,
    getCharacterById,
    createCharacter,
    updateCharacter,
    deleteCharacter
};
