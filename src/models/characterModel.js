const charactersRepository = require('../repositories/characterRepository');

const getAllCharacters = async () => {
    console.log('characters in model');
    try {
        const characters = await charactersRepository.getAllCharacters();
        return characters;
    } catch (error) {
        throw new Error('Помилка отримання списку персонажів: ' + error.message);
    }
};

const getCharacterById = async (id) => {
    console.log('in model ' + id);
    try {
        const character = await charactersRepository.getCharacterById(id);
        if (!character) {
            throw new Error('Персонаж не знайдено.');
        }
        return character;
    } catch (error) {
        throw new Error('Помилка отримання персонажа: ' + error.message);
    }
};

const createCharacter = async (characterData) => {
    try {
        const newCharacter = await charactersRepository.createCharacter(characterData);
        return newCharacter;
    } catch (error) {
        throw new Error('Помилка створення персонажа: ' + error.message);
    }
};

const updateCharacter = async (id, characterData) => {
    try {
        const updatedCharacter = await charactersRepository.updateCharacter(id, characterData);
        if (!updatedCharacter) {
            throw new Error('Персонаж не знайдено.');
        }
        return updatedCharacter;
    } catch (error) {
        throw new Error('Помилка оновлення персонажа: ' + error.message);
    }
};

const deleteCharacter = async (id) => {
    try {
        const deletedCharacter = await charactersRepository.deleteCharacter(id);
        if (!deletedCharacter) {
            throw new Error('Персонаж не знайдено.');
        }
        return { id };
    } catch (error) {
        throw new Error('Помилка видалення персонажа: ' + error.message);
    }
};

module.exports = {
    getAllCharacters,
    getCharacterById,
    createCharacter,
    updateCharacter,
    deleteCharacter
};
