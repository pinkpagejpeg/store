const Router = require('express')
const router = new Router()
const detailController = require('../controllers/detailController')

router.post('/', detailController.create) // Создание товара
router.get('/', detailController.getAll) // Получение всех товаров  
router.get('/:id', detailController.getOne) // Получение конкретного товара

module.exports = router