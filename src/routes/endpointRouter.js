const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');
const newsController = require('../controllers/newsController');
const likesByNewsController = require('../controllers/likesByNewsController');
const tagsController = require('../controllers/tagsController');
const commentsController = require('../controllers/commentsController');
const authController = require("../controllers/authController");
const epicWorksController = require('../controllers/epicWorksController');
const epicWorkTypesController = require('../controllers/epicWorkTypesController');
const epicWorkTypeRelationsController = require('../controllers/epicWorkTypeRelationsController');
const charactersController = require("../controllers/characterController");
const {authenticateToken} = require("../services/authService");

// Роут для локального сервера
router.get('/', (req, res) => {
    res.send('Ласкаво просимо на сайт про Скандинавський епос!');
});

// Авторизація
router.post('/api/auth/signin', authController.signIn);

// Роути для користувачів
router.get('/api/users/getAll', usersController.getAllUsers);
router.get('/api/users/getUserById/:id', usersController.getUserById);
router.get('/api/users/getUserByUsername/:username', usersController.getUserByUsername);
router.get('/users/getUserByEmail/:email', usersController.getUserByEmail);
router.post('/api/users/create', usersController.createUserAndAuthenticate);
router.put('/api/users/update/:id', authenticateToken, usersController.updateUser);
router.delete('/api/users/delete/:id', authenticateToken, usersController.deleteUser);

// Роути для адміністраторів користувачів
router.get('/admin/users', usersController.getAllUsers);
router.post('/admin/users/create', usersController.createUserByAdmin);
router.put('/admin/users/update/:id', usersController.updateUser);
router.delete('/admin/users/delete/:id', usersController.deleteUser);

// Роути для адміністраторів новин
router.get('/admin/news', newsController.getAllNews);
router.post('/admin/news/create', newsController.createNews);
router.put('/admin/news/update/:id', newsController.updateNews);
router.delete('/admin/news/delete/:id', newsController.deleteNews);

// Роути для адміністраторів тегів
router.get('/admin/tags', tagsController.getAllTags);
router.post('/admin/tags/create', tagsController.createTag);
router.put('/admin/tags/update/:id', tagsController.updateTag);
router.delete('/admin/tags/delete/:id', tagsController.deleteTag);

// Роути для адміністраторів коментарів
router.post('/admin/comments/create', commentsController.createComment);
router.put('/admin/comments/update/:id', commentsController.updateComment);
router.delete('/admin/comments/delete/:id', commentsController.deleteComment);

// Роути для адміністраторів лайків
router.get('/admin/likes', likesByNewsController.getLikesByNewsId);
router.post('/admin/likes/add', likesByNewsController.addLikeToNews);
router.delete('/admin/likes/remove/:id', likesByNewsController.removeLikeFromNews);

// Роути для новин
router.get('/api/news/getAll', newsController.getAllNews);
router.get('/api/news/getNewsById/:id', newsController.getNewsById);
router.post('/api/news/create', newsController.createNews);
router.put('/api/news/update/:id', newsController.updateNews);
router.delete('/api/news/delete/:id', newsController.deleteNews);

// Роути для лайків новин
router.get('/api/newsLikes/getLikesByNewsId/:newsId', likesByNewsController.getLikesByNewsId);
router.post('/api/newsLikes/addLike', likesByNewsController.addLikeToNews);
router.delete('/api/newsLikes/removeLike/:id', likesByNewsController.removeLikeFromNews);

// Роути для тегів
router.get('/api/tags/getAll', tagsController.getAllTags);
router.post('/api/tags/create', tagsController.createTag);
router.put('/api/tags/update/:id', tagsController.updateTag);
router.delete('/api/tags/delete/:id', tagsController.deleteTag);

// Роути для типів історій
router.get('/api/epicWorkTypes/getAll', epicWorkTypesController.getAllEpicWorkTypes);
router.get('/api/epicWorkTypes/getEpicWorkTypeById/:id', epicWorkTypesController.getEpicWorkTypeById);
router.post('/api/epicWorkTypes/create', epicWorkTypesController.createEpicWorkType);
router.put('/api/epicWorkTypes/update/:id', epicWorkTypesController.updateEpicWorkType);
router.delete('/api/epicWorkTypes/delete/:id', epicWorkTypesController.deleteEpicWorkType);

// Роути для epic works
router.get('/api/epicWorks/getAll', epicWorksController.getAllEpicWorks);
router.get('/api/epicWorks/getEpicWorkById/:id', epicWorksController.getEpicWorkById);
router.post('/api/epicWorks/create', epicWorksController.createEpicWork);
router.put('/api/epicWorks/update/:id', epicWorksController.updateEpicWork);
router.delete('/api/epicWorks/delete/:id', epicWorksController.deleteEpicWork);

// Роути для epic works relations
router.get('/api/epicWorkTypeRelations/getAll', epicWorkTypeRelationsController.getAllRelations);
router.get('/api/epicWorkTypeRelations/getByTypeId/:typeId', epicWorkTypeRelationsController.getRelationsByTypeId);
router.get('/api/epicWorkTypeRelations/getByWorkId/:workId', epicWorkTypeRelationsController.getRelationsByWorkId);

// Роути для персонажів
router.get('/api/characters/getAll', charactersController.getAllCharacters);
router.get('/api/characters/getCharacterById/:id', charactersController.getCharacterById);
router.post('/api/characters/create', charactersController.createCharacter);
router.put('/api/characters/update/:id', charactersController.updateCharacter);
router.delete('/api/characters/delete/:id', charactersController.deleteCharacter);

module.exports = router;
