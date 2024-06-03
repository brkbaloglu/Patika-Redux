import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"

export const getTodosAsync = createAsyncThunk("todos/getTodosAsync/", async() => {
    const response = await axios(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos`)
    return response.data
})

export const addTodoAsync = createAsyncThunk("todos/addTodoAsync", async(data) => {
    const response = await axios.post(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos`, data)
    return response.data
})

export const todosSlice = createSlice({
    name: "todos",
    initialState: {
        items:[],
        isLoading: false,
        error: null,
        activeFilter: "all",
        addNewTodoIsLoading: false,
        addNewTodoError: null
    },
    reducers:{
        // addTodo: (state, action) => {
        //     state.items.push(action.payload)
        // },
        
        toggle: (state, action) => {
            const {id} = action.payload
            const item = state.items.find(item => item.id === id)
            item.completed = !item.completed
        },
        destroy: (state, action) => {
            const id  = action.payload
            const filtered = state.items.filter(item => item.id !== id)
            state.items = filtered
        },
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
            state.addNewTodoIsLoading = false
        })
        builder.addCase(addTodoAsync.pending, (state, action) => {
            state.addNewTodoIsLoading = true
        })
        builder.addCase(addTodoAsync.rejected, (state, action) => {
            state.addNewTodoError = action.error.message
            state.addNewTodoIsLoading = false
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
export const { toggle, destroy, changeActiveFilter, clearCompleted } = todosSlice.actions
export default todosSlice.reducer;