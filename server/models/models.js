const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, },
    email: { type: DataTypes.STRING, unique: true, },
    password: { type: DataTypes.STRING, },
    role: { type: DataTypes.STRING, defaultValue: "USER" },
})

const Basket = sequelize.define('basket', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, },
})

const BasketDetail = sequelize.define('basket_detail', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, },
})

const Detail = sequelize.define('detail', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, },
    name: { type: DataTypes.STRING, unique: true, allowNull: false, },
    price: { type: DataTypes.FLOAT, allowNull: false, },
    image: { type: DataTypes.STRING, allowNull: false, },
})

const Type = sequelize.define('type', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, },
    name: { type: DataTypes.STRING, unique: true, allowNull: false, },
})

const Brand = sequelize.define('brand', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, },
    name: { type: DataTypes.STRING, unique: true, allowNull: false, },
})

const DetailInfo = sequelize.define('detail_info', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, },
    title: { type: DataTypes.STRING, allowNull: false, },
    description: { type: DataTypes.STRING, allowNull: false, },
})

const TypeBrand = sequelize.define('type_brand', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, },
})

User.hasOne(Basket)
Basket.belongsTo(User)

Basket.hasMany(BasketDetail)
BasketDetail.belongsTo(Basket)

Type.hasMany(Detail)
Detail.belongsTo(Type)

Brand.hasMany(Detail)
Detail.belongsTo(Brand)

Detail.hasMany(BasketDetail)
BasketDetail.belongsTo(Detail)

Detail.hasMany(DetailInfo)
DetailInfo.belongsTo(Detail)

Type.belongsToMany(Brand, { through: TypeBrand })
Brand.belongsToMany(Type, { through: TypeBrand })

module.exports = {
    User, 
    Basket, 
    BasketDetail, 
    Detail, 
    Type, 
    Brand, 
    TypeBrand, 
    DetailInfo
}