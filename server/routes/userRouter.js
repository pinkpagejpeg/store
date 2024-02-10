const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')

router.post('/registration', userController.registration) // Регистрация
router.post('/login', userController.login) // Авторизация
router.get('/auth', userController.check) // Проверка на то, авторизован ли пользователь

module.exports = router