const { Type } = require('../models/models')
const ApiError = require('../error/ApiError')

class TypeController {
    async create(req, res) {
        const { name } = req.body
        const type = await Type.create({ name })
        return res.json(type)
    }

    async update(req, res, next) {
        const { name, id } = req.body
        if (!id) {
            return next(ApiError.badRequest('Не указан id'))
        }
        const type = await Type.update({ name }, { where: { id } })
        return res.json({ message: 'Запись успешно обновлена' })
    }

    async delete(req, res, next) {
        const { id } = req.params
        if (!id) {
            return next(ApiError.badRequest('Не указан id'))
        }
        const type = await Type.destroy({ where: { id } })
        return res.json({ message: 'Запись успешно удалена' })
    }

    async getAll(req, res) {
        const types = await Type.findAll()
        return res.json(types)
    }
}

module.exports = new TypeController()
