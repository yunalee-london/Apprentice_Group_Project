// const state = {
//     tasks:[],
//     completedTasks: [],
//     status: ["Available", "InProgress", "Urgent"]
// }

// const view = (state) => `
//     <section>
//         <div class="listContainer">
//             <div class="taskListContainer">
//                 <h2>Task In Progress</h2>
//                 ${state.tasks.map(task => `
//                 <div id=${task.id} ondragover="event.preventDefault()"  ondrop="app.run('onDropStatusTag', event, this)" class="individualTaskContainer" draggable="true" ondragstart="app.run('onDrag', event)"><div class="individualTask">${task.text}</div><div class="status${task.status}">${task.status}</div></div>`).join("")}
//                 <section>
//                 <div class="addTaskContainer">
//                     <form  onsubmit="app.run('add', this);return false;">
//                         <input class='input1' name='task' placeholder='add a task' />
//                         <button class='submit1'>Add</button>
//                     </form>
//                 </div>
//             </section>
//             </div>
//             <div class="statusContainer">
//                 <div class="statusAvailable" id="Available" draggable="true" ondragstart="app.run('onDrag', event)">Available</div>
//                 <div class="statusInProgress" id="InProgress"  draggable="true" ondragstart="app.run('onDrag', event)">In Progress</div>
//                 <div class="statusUrgent" id="Urgent"  draggable="true" ondragstart="app.run('onDrag', event)">Urgent</div>
//             </div>
//             <div class="taskListContainer" ondragover="event.preventDefault()" ondrop="app.run('onDrop', event)">
//                 <h2>Task Complete</h2>
//                 ${state.completedTasks.map(task => `
//                 <div id=${task.id} class="individualTaskContainer">
//                     <div class="individualTask">${task.text}</div>
//                     <form id='${window.crypto.getRandomValues(new Uint8Array(3)).join("")}' onsubmit="app.run('delete', this);return false;">
//                     <input  class="individualTask" name ='id' type='hidden' value = ${task.id}>
//                     <button class='submit2'>delete</button>
//                     </form>
//                 </div>`).join("")}
//             </div>
//         </div>
//     </section>
// `

// const update = {
//     add: (state,form) =>{
//         const data = new FormData(form)
//         const postRequest = {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//         }
//         fetch('/createTasks', postRequest).then(() => app.run('getTasks'))
//         return state
//     },

//     delete: (state,form)=>{
//         const data = new FormData(form)
//         const id = data.get('id')
//         const index = state.completedTasks.findIndex(element => element.id ===id)
//         const postRequest = {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(state.completedTasks[index])
//         }
//         console.log("adwnawawndoinaoiwnoawidnoaidnoawindoaindoaiwno")
//         fetch('/taskDelete', postRequest).then(() => app.run('getTasks'))
//         return state
//     },

//     onDrag: (state, event) => {
//         event.dataTransfer.setData('text', event.target.id)
//         return state
//     },

//     taskComplete: (state , task) => {
//         console.log("------------------------")
//         const postRequest = {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(task)
//         }
//         fetch('/taskComplete', postRequest).then(() => app.run('getTasks'))
//         return state
//     },

//     onDrop: (state, event) => {
//         event.preventDefault()
//         const id = event.dataTransfer.getData('text')
//         const index = state.tasks.findIndex(task => task.id == id)
//         const task = state.tasks[index]
//         state.tasks.splice(index, 1)
//         state.completedTasks.push(task)
//         app.run('taskComplete', task)
//         return state
//     },
//     onDropStatusTag: (state, event, data) => {
//         event.preventDefault()
//         const taskId = data.id
//         const id = event.dataTransfer.getData('text')
//         console.log(state.tasks)
//         const taskIndex = state.tasks.findIndex(element => element.id === taskId)
//         state.tasks[taskIndex].status = id
//         console.log("ajbdlCIUAHlfiuE ")
//         const postRequest = {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(state.tasks[taskIndex])
//         }
//         fetch('/taskUpdate', postRequest).then(() => app.run('getTasks'))
//         console.log(state.tasks)
//         return state
//     },

//     getTasks: async (state) => {
//         const result = await fetch('/fetchTaskList').then(res => res.json())
//         state.projectBoard = result[0]
//         state.lists = result[1]
//         return state
//     }
// }
// app.start('app',state,view,update)
// app.run('getTasks')