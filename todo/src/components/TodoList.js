import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggle, destroy } from '../redux/todos/todosSlice'

let filtered = [];

function TodoList() {

    const dispatch = useDispatch()
    const items = useSelector(state => state.todos.items)
    const activeFilter = useSelector(state => state.todos.activeFilter)

    filtered = items

    if (activeFilter !== "all") {
        filtered = items.filter((todo) => activeFilter === "active" ? todo.completed === false  : todo.completed === true)    
    }
    

  return (
    <div>
        <ul className="todo-list">
            {
                filtered.map((item) => (
                    <li key={item.id} className={item.completed ? "completed" : ""}>
                        <div className="view">
                            <input type="checkbox" name="" checked={item.completed} onChange={() => dispatch(toggle({id: item.id}))} className='toggle' id="" />
                            <label htmlFor="">{item.title}</label>
                            <button onClick={() => dispatch(destroy(item.id))} className="destroy"></button>
                        </div>
                    </li>
                ))
            }
        </ul>
    </div>
  )
}

export default TodoList