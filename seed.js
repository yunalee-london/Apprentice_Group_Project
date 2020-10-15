const {ProjectBoard, List, User, sequelize, Task} = require('./models')
const data = [
    {
        "name": "Spring Cleaning",
        "lists": [
            {
                "name": "To Do",
                "tasks": [
                    {
                        "description": "Hoover the floor"
                    }
                ]
            },
            {
                "name": "Doing",
                "tasks" : [
                    {
                        "description": "Clean the window"
                    }
                ]
            },
            {
                "name": "Done",
                "tasks": [
                    {
                        "description": "Take unused stuff to a charity shop"
                    }
                ]
            }
        ]
    }
]
sequelize.sync().then(async () => {
    const taskQueue = data.map(async (_projectboard) => {
            const projectboard = await ProjectBoard.create({name: _projectboard.name})
            const lists = await Promise.all(_projectboard.lists.map(async (_list) => {
                const tasks = await Promise.all(_list.tasks.map(({description}) => Task.create({description})))
                const list = await List.create({name: _list.name})
                return list.setTasks(tasks)
            }))
            return await projectboard.setLists(lists)
        })
    await Promise.all(taskQueue).then(projectboards => {
        console.log(JSON.stringify(projectboards, null, 2))
    }).catch(console.error)
})
