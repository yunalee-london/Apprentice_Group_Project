
const available = state.tasks.filter(task => task.status == 'available')
const inProgress = state.tasks.filter(task => task.status == 'inProgress')
const complete = state.tasks.filter(task => task.status == 'complete')

const view = (state) => `
        <div class="body-contents">
        <div class="topNav">
            <a class ="navButton" href="/projectboards">Manage Projects</a>
        </div>
        <div class="projectBoard">
            <div class="header">${state.projectBoard.name}</div>
            <div class= "projectContents">
                    <div class ="listCard">
                        <div class="listHeader">To Do</div>
                        <div class="taskContainer" id="container">
                            ${available.map(task => `
                            <div class="taskCard" draggable="true">
                            <div class="taskHeader">${task.name}</div>
                            </div>
                            `).join("")}
                            <div class="taskCard">
                                <form onsubmit="app.run('add', this);return false;">
                                    <label> Name : </label>
                                    <input name="name" type="text" placeholder="Task Description" required> <br>
                                    <input name="status" value="available" type="hidden">
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class ="listCard">
                        <div class="listHeader">In Progress</div>
                        <div class="taskContainer" id="container">
                        ${inProgress.map(task => `
                            <div class="taskCard" draggable="true">
                            <div class="taskHeader">${task.name}</div>
                            </div>
                            `).join("")}    
                        </div>
                    </div>
                    <div class ="listCard">
                        <div class="listHeader">Done</div>
                        <div class="taskContainer" id="container">
                        ${complete.map(task => `
                            <div class="taskCard" draggable="true">
                            <div class="taskHeader">${task.name}</div>
                            </div>
                            `).join("")}
                        </div>
                    </div>
            </div>
        </div>
        </div>
`

const update = {
    add: async (state, form) => {
        const data = new FromData(form)
        console.log("adanajnoauwdnikauwbdajwikuw")
        fetch('/addTask', data).then(() => app.run('getTasks'))
        return state
    },

    getTasks: async (state) => {
        const result = await fetch(`/fetchTaskList/${state.projectBoard.id}`).then(res => res.json())
        state.projectBoard = result[0]
        state.lists = result[1]
        return state
    }
}
app.start('project',state,view,update)
app.run('getTasks')