var idNum = 0

const state = {
    tasks: []
}
const view = (state) =>
`
<body>
    <main>
        <div class = "addUserForm">
            <p>Add a User
                <form onsubmit="app.run('add,this); return false;">
                    <div class="TextandButton">
                        <input class="userTextBox" type="text" name="userName" placeholder="Type here">
                        <button type="submit" class="addUserButton">Add User</button>
                    </div>
                </form>
            </p>
        </div>

        <button class = "manageUser">Manage User</button>
        
        <button class = "goToTasks">Go to tasks</button>
        
    </main> 
</body>
`
const update = {
    add: (state, form) => {
        const data = new FormData(form)
        const task = {
            id: (idNum + 1),
            text: data.get('userName'),
            status: 0
        }
        console.log(task);
        const postRequest = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        }
        fetch('/tasks', postRequest).then(() => app.run('getTasks'))
        idNum = (idNum + 1)
        console.log(idNum);
        console.log(task);
        return state
    },
    getTasks: async (state) => {
        state.tasks = await fetch('/tasks').then(res => res.json())
        return state
    }
}
app.start('app', state, view, update)
app.run('getTasks')