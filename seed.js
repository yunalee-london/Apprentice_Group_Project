const {ProjectBoard, List, User, sequelize} = require('./models')
const data = [
    {
        "name": "Spring Cleaning",
        "image": "https://image.shutterstock.com/image-vector/cleaning-service-staff-smiling-cartoon-260nw-1069898849.jpg",
        "lists": [
            {
                "description": "Hoover the floor",
                "assignedUsers" : []
            },
            {
                "description": "Clean windows",
                "assignedUsers" : []
            }
        ]
    }
]
sequelize.sync().then(async () => {
    const listQueue = data.map(async (_projectboard) => {
            const projectboard = await ProjectBoard.create({name: _projectboard.name, image: _projectboard.image})
            const lists = await Promise.all(_projectboard.lists.map(async (_list) => {
                const users = await Promise.all(_list.users.map(({name, image}) => User.create({name, image})))
                const list = await List.create({description: _list.description})
                return list.setUsers(users)
            }))
            return await projectboard.setLists(lists)
        })
    await Promise.all(listQueue).then(projectboards => {
        console.log(JSON.stringify(projectboards, null, 2))
    }).catch(console.error)
})            