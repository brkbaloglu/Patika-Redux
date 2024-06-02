import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggle, destroy, selectTodos, selectFilteredTodos } from '../redux/todos/todosSlice'


function TodoList() {

    const dispatch = useDispatch()
    const filteredTodos = useSelector(selectFilteredTodos)
   
    

  return (
    <div>
        <ul className="todo-list">
            {
                filteredTodos.map((item) => (
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