const { Sequelize, Model, DataTypes } = require('sequelize')
const path = require('path')
const sequelize = new Sequelize({dialect: 'sqlite', storage: path.join(__dirname, 'data.db')})

class User extends Model {}
class ProjectBoard extends Model {}
class List extends Model {}
class Task extends Model {}



User.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    // tasks: DataTypes.ARRAY(DataTypes.STRING),
}, {sequelize})

ProjectBoard.init({
    name: DataTypes.STRING,
}, {sequelize})

List.init({
    name: DataTypes.STRING,
}, {sequelize})

Task.init({
    description: DataTypes.STRING
}, {sequelize})


ProjectBoard.hasMany(List, {as:"lists"})
List.belongsTo(ProjectBoard)
List.hasMany(Task, {as: 'tasks'})
Task.belongsTo(List)




module.exports = {
    ProjectBoard,
    sequelize,
    List,
    Task,
    User
}