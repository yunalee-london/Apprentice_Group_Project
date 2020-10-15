const express = require('express')
const Handlebars = require('handlebars')
const expressHandlebars = require('express-handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const app = express()
const {ProjectBoard, List, User, sequelize} = require('./models')

const handlebars = expressHandlebars({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
})

app.use(express.static('public'))
app.engine('handlebars', handlebars)
app.set('view engine', 'handlebars')

app.get('/projectboards', async(req, res) => {
    const projectboards = await ProjectBoard.findAll({
        include : [
            {model: List , as: 'lists'}
        ]
    })
    res.render('projectboards', {projectboards})
})

app.get('/projectboards/:id', async(req, res) => {
    const projectboard = await ProjectBoard.findByPk(req.params.id)
    const lists = await projectboard.getLists({
        include : ['lists']
    })
    res.render('lists', {projectboard, lists})
})

//add
app.post('/projectboards', async(req, res) => {
    await ProjectBoard.create(req.body)
    res.redirect('/projectboards')
})
app.post('/projectboards/:id', async(req, res) => {
    const projectboard = await ProjectBoard.findByPk(req.params.id)
    await projectboard.createList(req.body)
    res.redirect(`/projectboards/${projectboard.id}`)
})



app.listen(3001, () => console.log('web server running on port 3001'))