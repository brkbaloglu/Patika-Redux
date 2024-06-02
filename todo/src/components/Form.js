import React, { useState } from 'react'
import { useDispatch }from "react-redux"
import { addTodo } from '../redux/todos/todosSlice'
import { nanoid } from '@reduxjs/toolkit'

function Form() {

  const [title, setTitle] = useState("")
  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()

    dispatch(addTodo({id: nanoid(), title, completed: false}))
    setTitle("")
  }

  
  return (
    <form action="" onSubmit={handleSubmit}>
        <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} className='new-todo' placeholder='What needs to be done?' autoFocus />
    </form>
  )
}

export default Form