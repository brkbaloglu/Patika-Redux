import React, { useState } from 'react'
import { useDispatch, useSelector }from "react-redux"
import { addTodoAsync } from '../redux/todos/services'
import Loading from './Loading'
import Error from './Error'

function Form() {

  const [title, setTitle] = useState("")
  const dispatch = useDispatch()
  const isLoading = useSelector(state => state.todos.addNewTodo.isLoading)
  const error = useSelector(state => state.todos.addNewTodo.error)
  const handleSubmit = async(event) => {
    if (!title) {
      return
    }
    event.preventDefault()

    await dispatch(addTodoAsync({title}))
    setTitle("")
  }

 
  
  return (
    <form style={{display: "flex", alignItems: "center"}} action="" onSubmit={handleSubmit}>
        <input disabled={isLoading} type="text" value={title} onChange={(event) => setTitle(event.target.value)} className='new-todo' placeholder='What needs to be done?' autoFocus />
        {
          isLoading && 
          <Loading />
        }
        {
          error &&
          <Error message={error}/>
        }
    </form>
  )
}

export default Form