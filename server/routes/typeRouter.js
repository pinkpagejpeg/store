const Router = require('express')
const router = new Router()
const typeController = require('../controllers/typeController')
const CheckRole = require('../middleware/CheckRoleMiddleware')

router.post('/', CheckRole('ADMIN'), typeController.create)
router.put('/', CheckRole('ADMIN'), typeController.update)
router.delete('/:id', CheckRole('ADMIN'), typeController.delete)
router.get('/', typeController.getAll)

module.exports = router