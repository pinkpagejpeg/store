const uuid = require('uuid')
const path = require('path')
const { Detail, DetailInfo } = require('../models/models')
const ApiError = require('../error/ApiError')

class DetailController {
    async create(req, res, next) {
        try {
            let { name, price, brandId, typeId, info } = req.body
            const { image } = req.files
            let fileName = uuid.v4() + '.jpg'
            image.mv(path.resolve(__dirname, '..', 'static', fileName))
            const detail = await Detail.create({ name, price, brandId, typeId, image: fileName })

            if (info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    DetailInfo.create({
                        title: i.title,
                        description: i.description,
                        detailId: detail.id
                    })
                )
            }

            return res.json(detail)
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        let { brandId, typeId, limit, page } = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let details

        if (!brandId && !typeId) {
            details = await Detail.findAndCountAll({ limit, offset })
        }

        if (brandId && !typeId) {
            details = await Detail.findAndCountAll({ where: { brandId }, limit, offset })
        }

        if (!brandId && typeId) {
            details = await Detail.findAndCountAll({ where: { typeId }, limit, offset })
        }

        if (brandId && typeId) {
            details = await Detail.findAndCountAll({ where: { brandId, typeId }, limit, offset })
        }

        return res.json(details)
    }

    async getOne(req, res) {
        const { id } = req.params
        const detail = await Detail.findOne({
            where: { id },
            include: [{ model: DetailInfo, as: 'info' }]
        })
        return res.json(detail)
    }
}

module.exports = new DetailController()