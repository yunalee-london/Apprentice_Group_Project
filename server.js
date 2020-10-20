const express = require('express')
const Handlebars = require('handlebars')
const expressHandlebars = require('express-handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const app = express()
const {ProjectBoard, User, Task, sequelize} = require('./models')


const handlebars = expressHandlebars({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
})
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))
app.engine('handlebars', handlebars)
app.set('view engine', 'handlebars')

app.get('/taskHistory'), async(req, res) => {
    const tasks = await Task.findAll({where: {status: "completed"}})
    res.render('taskHistory', {tasks})
}
app.get('/projectboards', async(req, res) => {
    const projectboards = await ProjectBoard.findAll({
        include : [
            {model: Task , as: 'tasks'}
        ]
    })
    res.render('projectboards', {projectboards})
})

app.get('/projectboards/:id', async(req, res) => {
    const projectboard = await ProjectBoard.findByPk(req.params.id)
    const tasks = await projectboard.getTasks({
        include : ['tasks']
    })
    res.render('tasks', {projectboard, tasks})
})

//add
app.post('/projectboards', async(req, res) => {
    await ProjectBoard.create(req.body)
    
    res.redirect('/projectboards')
})
// app.post('/projectboards/:id', async(req, res) => {
//     const projectboard = await ProjectBoard.findByPk(req.params.id)
//     await projectboard.create(req.body)
//     res.redirect(`/projectboards/${projectboard.id}`)
// })
//addUser
app.get('/', (req, res) => {
    res.render('addUser')
})
app.post('/addUser', async(req, res) => {
    console.log(req.body + "------------------------------------------")
    const user = await User.create(req.body)
    res.render('addUser')
})

app.post('/addManageUser', async(req, res) => {
    const user = await User.create(req.body)
    console.log(user);
    res.redirect('/manageUsers')
})
//User
app.get('/manageUsers', async(req, res) => {
    const users = await User.findAll()
    res.render('manageUsers', {users})
})
app.get('/manageUsers/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id)
    // const tasks = await user.getTasks({
    //     include: [{model: Task, as: 'tasks'}],
    //     nest: true
    // })
    res.render('userPage', {user})
})

app.post('/taskUpdate', async (req, res) => {
    console.log(req.status)
    const task = await Task.findByPk(req.body.id)
    await task.update({status: req.body.status})
    res.send()
})


app.get('/projectBoard/:id', async (req, res) => {
    const users = await User.findAll()
    const projectBoard = await ProjectBoard.findByPk(req.params.id)
    const tasks = await Task.findAll({where: {ProjectBoardId: projectBoard.id}})
    // const tasks = await Task.findAll({where: {ListId: lists.id}})
    res.render('project', {projectBoard: JSON.stringify(projectBoard), tasks: JSON.stringify(tasks), users: JSON.stringify(users)})
})

app.get('/fetchTaskList/:id', async (req, res) => {
    const projectBoard = await ProjectBoard.findByPk(req.params.id)
    const tasks = await Task.findAll({where: {ProjectBoardId: projectBoard.id}})
    const array = [projectBoard, tasks]
    res.send(array)
})

app.get('/projectBoard/:id', async (req, res) => {
    const projectBoard = await ProjectBoard.findByPk(req.params.id)
    const tasks = await Task.findAll({where: {ProjectBoardId: projectBoard.id}})
    // const tasks = await Task.findAll({where: {ListId: tasks.id}})
    res.render('project', {projectBoard, tasks})
})

app.post('/assignUserTask', async (req, res) => {
    console.log(req)
    const user = await User.findByPk(req.body.id)
    const task = await Task.findByPk(req.body.TaskId)
    await task.update({UserId: user.id})
    res.send()
})

app.get('/fetchTaskList', async (req, res) => {
    // // const projectBoard = await ProjectBoard.findByPk(req.params.id)
    // // const tasks = await Task.findAll({where: {ProjectBoardId: projectBoard.id}})
    // const array = [projectBoard, tasks]
    // res.send(array)
})

// app.post('/manageUsers', async(req, res) => {
//     await User.create(req.body)
//     res.redirect('/manageUsers')
// })

// app.get('/manageUsers/:id', async(req, res) => {
//     const user = await User.findByPk(req.params.id)
//     const tasks = await user.getTasks({
//         include : ['tasks']
//     })
//     res.render('tasks', {user, tasks})
// })

// app.post('/addTask/:id', async (req, res) => {
//     const projectBoard = await ProjectBoard.findByPk(req.params.id)
//     const task = await Task.create(req.body)
//     await projectBoard.addTask(task)
//     const tasks = await Task.findAll({where: {ProjectBoardId: projectBoard.id}})
//     res.render('project', {projectBoard, tasks})
// })

app.post('/addTask/:id', async (req, res) => {
    const projectBoard = await ProjectBoard.findByPk(req.params.id)
    const task = await Task.create(req.body)
    await projectBoard.addTask(task)
    // res.redirect(`/projectBoard/${req.body.id}`)
    res.send()
})

app.listen(3000, async() => {
    await sequelize.sync()
    console.log("Web server is running on 3000")
})