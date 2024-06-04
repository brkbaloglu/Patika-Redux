import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTodosAsync, toggleTodoAsync, removeItemAsync } from '../redux/todos/services'
import { selectFilteredTodos } from '../redux/todos/todosSlice'
import Loading from './Loading'
import Error from './Error'

function TodoList() {

    const dispatch = useDispatch()
    const filteredTodos = useSelector(selectFilteredTodos)
    const isLoading = useSelector(state => state.todos.isLoading)
    const error = useSelector(state => state.todos.error)
    useEffect(() => {
        dispatch(getTodosAsync())
    }, [dispatch])

    if(isLoading){
        return <Loading/>
    }
    if(error){
        return <Error message={error}/>
    }
    const handleToggle = async(id, completed) => {
        await dispatch(toggleTodoAsync({ id, data: { completed }}))
    }
  return (
    <div>
        <ul className="todo-list">
            {
                filteredTodos.map((item) => (
                    <li key={item.id} className={item.completed ? "completed" : ""}>
                        <div className="view">
                            <input type="checkbox" name="" checked={item.completed} onChange={() => handleToggle(item.id, !item.completed)} className='toggle' id="" />
                            <label htmlFor="">{item.title}</label>
                            <button onClick={async() => await dispatch(removeItemAsync(item.id))} className="destroy"></button>
                        </div>
                    </li>
                ))
            }
        </ul>
    </div>
  )
}

export default TodoList