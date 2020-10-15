
const state = {
    users: []
}
const view = (state) =>
`
<body>
    <main>
        <div class = "addUserForm">
            <p>Add a User
                <form onsubmit="app.run('add',this); return false;">
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
    getUserFunction: (state) => {
        const result = fetch("/User")
    },
    add: (state, form) => {
        const data = new FormData(form)
        // const user = new User({name: data.get('userName'), image:'url'})
        // console.log(user);
        const postRequest = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }
        fetch('/users', postRequest).then(() => app.run('getUsers'))
        return state
    },
    getUsers: async (state) => {
        state.users = await fetch('/users').then(res => res.json())
        return state
    }
}
app.start('app', state, view, update)
app.run('getUsers')