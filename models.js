const { Sequelize, Model, DataTypes } = require('sequelize')
const path = require('path')
const sequelize = new Sequelize({dialect: 'sqlite', storage: path.join(__dirname, 'data.db')})

class User extends Model {}
class ProjectBoard extends Model {}
class Task extends Model {}



User.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING,
}, {sequelize})

ProjectBoard.init({
    name: DataTypes.STRING,
}, {sequelize})

Task.init({
    name: DataTypes.STRING,
    status: DataTypes.STRING
}, {sequelize})


ProjectBoard.hasMany(Task, {as:"tasks"})
Task.belongsTo(ProjectBoard)
Task.belongsTo(User)
User.hasMany(Task, {as:'tasks'})
// User.belongsTo(Task)
// Task.hasMany(User, {as:'users'})




module.exports = {
    ProjectBoard,
    sequelize,
    Task,
    User
}