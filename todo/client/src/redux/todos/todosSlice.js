import { createSlice } from "@reduxjs/toolkit";
import { getTodosAsync, addTodoAsync, toggleTodoAsync, removeItemAsync } from './services'

export const todosSlice = createSlice({
    name: "todos",
    initialState: {
        items:[],
        isLoading: false,
        error: null,
        activeFilter: localStorage.getItem("activeFilter"),
        // addNewTodoIsLoading: false,
        // addNewTodoError: null,
        addNewTodo: {
            isLoading: false,
            error: null
        }
    },
    reducers:{
        // addTodo: (state, action) => {
        //     state.items.push(action.payload)
        // },
        
        // toggle: (state, action) => {
        //     const {id} = action.payload
        //     const item = state.items.find(item => item.id === id)
        //     item.completed = !item.completed
        // },
        // destroy: (state, action) => {
        //     const id  = action.payload
        //     const filtered = state.items.filter(item => item.id !== id)
        //     state.items = filtered
        // },
        changeActiveFilter: (state, action) => {
            state.activeFilter = action.payload
        },
        clearCompleted: (state) => {
            const filtered = state.items.filter(item => item.completed === false)
            state.items = filtered
        }
    },
    extraReducers(builder){
        //get todo
        builder.addCase(getTodosAsync.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getTodosAsync.fulfilled, (state, action) => {
            state.items = action.payload
            state.isLoading = false
        })
        builder.addCase(getTodosAsync.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message
        })
        //add todo
        builder.addCase(addTodoAsync.fulfilled, (state, action) => {
            state.items.push(action.payload)
            state.addNewTodo.isLoading = false
        })
        builder.addCase(addTodoAsync.pending, (state, action) => {
            state.addNewTodo.isLoading= true
        })
        builder.addCase(addTodoAsync.rejected, (state, action) => {
            state.addNewTodo.error = action.error.message
            state.addNewTodo.isLoading = false
        })
        //toggle todo
        builder.addCase(toggleTodoAsync.fulfilled, (state, action) => {
            // console.log(action.payload);
            const { id, completed } = action.payload
            const index = state.items.findIndex(item => item.id === id)
            state.items[index].completed = completed
        })
        //remove todo
        builder.addCase(removeItemAsync.fulfilled, (state, action) => {
            const id = action.payload
            const filtered = state.items.filter((item) => item.id !== id)
            state.items = filtered
        })
    }
})

export const selectTodos = (state) => state.todos.items
export const selectFilteredTodos = (state) => {
    if (state.todos.activeFilter === "all") {
        return state.todos.items
    }
    return state.todos.items.filter((todo) => 
        state.todos.activeFilter === "active" ? todo.completed === false : todo.completed === true
    )
}
export const selectActiveFilter = (state) => state.todos.activeFilter
export const { changeActiveFilter, clearCompleted } = todosSlice.actions
export default todosSlice.reducer;