const { Brand } = require('../models/models')
const ApiError = require('../error/ApiError')

class BrandController {
    async create(req, res) {
        const { name } = req.body
        const brand = await Brand.create({ name })
        return res.json(brand)
    }

    async update(req, res, next) {
        const { name, id } = req.body
        if (!id) {
            return next(ApiError.badRequest('Не указан id'))
        }
        const brand = await Brand.update({ name }, { where: { id } })
        return res.json('Запись успешно обновлена')
    }

    async delete(req, res, next) {
        const { id } = req.params
        if (!id) {
            return next(ApiError.badRequest('Не указан id'))
        }
        const brand = await Brand.destroy({ where: { id } })
        return res.json({ message: 'Запись успешно удалена' })
    }

    async getAll(req, res) {
        const brands = await Brand.findAll()
        return res.json(brands)
    }
}

module.exports = new BrandController()