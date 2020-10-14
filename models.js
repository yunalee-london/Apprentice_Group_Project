const { Sequelize, Model, DataTypes } = require('sequelize')
const path = require('path')
const sequelize = process.env.NODE_ENV === 'test' 
    ? new Sequelize('sqlite::memory:', null, null, {dialect: 'sqlite'}) 
    : new Sequelize({dialect: 'sqlite', storage: path.join(__dirname, 'data.db')})

class User extends Model {}
class ProjectBoard extends Model {}
class List extends Model {}



User.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING,
}, {sequelize})

ProjectBoard.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING,
}, {sequelize})

List.init({
    description: DataTypes.STRING,
}, {sequelize})


ProjectBoard.hasMany(List, {as:"lists"})
List.belongsTo(ProjectBoard)
List.hasMany(User, {as:"users"})
User.belongsTo(List)



module.exports = {
    ProjectBoard,
    sequelize,
    List,
    User
}