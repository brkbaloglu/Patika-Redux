import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { changeActiveFilter, clearCompleted, selectTodos, selectActiveFilter } from '../redux/todos/todosSlice'
function ContentFooter() {

  const dispatch = useDispatch()

  const items = useSelector(selectTodos)
  const itemsLeft = items.filter(item => !items.completed).length
  
  const activeFilter = useSelector(selectActiveFilter)


  return (
    <footer className='footer'>
      <span className="todo-count">
        <strong>{itemsLeft}</strong> item{itemsLeft > 1 ? "s" : ""} left
      </span>
      <ul className="filters">
        <li>
          <a href='#/' onClick={() => dispatch(changeActiveFilter("all"))} className={activeFilter === "all" ? "selected" : ""}>All</a>
        </li>
        <li>
          <a href="#/" onClick={() => dispatch(changeActiveFilter("active"))} className={activeFilter === "active" ? "selected" : ""}>Active</a>
        </li>
        <li>
          <a href="#/" onClick={() => dispatch(changeActiveFilter("completed"))} className={activeFilter === "completed" ? "selected" : ""}>Completed</a>
        </li>
      </ul>
      <button onClick={() => dispatch(clearCompleted())} className='clear-completed'>Clear completed</button>

    </footer>
  )
}

export default ContentFooter