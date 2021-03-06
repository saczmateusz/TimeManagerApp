export const setUser = (user) => {
    return {
        type: "SET_USER",
        payload: user
    }
}

export const setUserTasks = (tasks) => {
    return {
        type: "SET_USER_TASKS",
        payload: tasks
    }
}

export const unsetUser = () => {
    return {
        type: "UNSET_USER",
        payload: null
    }
}