const Router = require('express')
const router = new Router()
const brandController = require('../controllers/brandController')
const CheckRole = require('../middleware/CheckRoleMiddleware')

router.post('/', CheckRole('ADMIN'), brandController.create)
router.put('/', CheckRole('ADMIN'), brandController.update)
router.delete('/:id', CheckRole('ADMIN'), brandController.delete)
router.get('/', brandController.getAll)

module.exports = router