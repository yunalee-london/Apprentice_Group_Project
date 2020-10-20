const {ProjectBoard, List, User, sequelize, Task} = require('./models')
const data = [
    {
        "name": "Spring Cleaning",
        "tasks": [
            { "name": "Hoover the floor", "status": "available"},
            { "name": "clean the window", "status": "available"},
            { "name": "take rubbish out", "status": "available"},           
            { "name": "take rubbish out", "status": "available"},           
            { "name": "take rubbish out", "status": "available"},           
            { "name": "take rubbish out", "status": "available"},           
            { "name": "take out", "status": "complete"}           
        ]
    }
]
// sequelize.sync().then(async () => {
//     const taskQueue = data.map(async (_projectboard) => {
//             const projectboard = await ProjectBoard.create({name: _projectboard.name})
//             const tasks = await Promise.all(_projectboard.tasks.map(async (_task) => {
//                 const task = await Task.create({name: _task.name})
//                 return list.setTasks(tasks)
//             }))
//             return await projectboard.sets(tasks)
//         })
//     await Promise.all(taskQueue).then(projectboards => {
//         console.log(JSON.stringify(projectboards, null, 2))
//     }).catch(console.error)
// })

sequelize.sync().then(async () => {
    const taskQueue = data.map(async (_projectboard) => {
            const projectboard = await ProjectBoard.create({name: _projectboard.name})
            const tasks = await Promise.all(_projectboard.tasks.map(({name, status}) => Task.create({name, status})))
            return await projectboard.setTasks(tasks)
        })
    await Promise.all(taskQueue).then(projectboards => {
        console.log(JSON.stringify(projectboards, null, 2))
    }).catch(console.error)
})