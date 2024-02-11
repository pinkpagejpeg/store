const Router = require('express')
const router = new Router()
const detailController = require('../controllers/detailController')
const CheckRole = require('../middleware/CheckRoleMiddleware')

router.post('/', CheckRole('ADMIN'), detailController.create) // Создание товара
router.get('/', detailController.getAll) // Получение всех товаров  
router.get('/:id', detailController.getOne) // Получение конкретного товара

module.exports = router