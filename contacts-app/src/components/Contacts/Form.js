import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addContact }from '../../redux/contactSlice'
import {nanoid} from "@reduxjs/toolkit"

function Form() {
    const [name, setName] = useState("")
    const [number, setNumber] = useState("")
    const dispatch = useDispatch()

    const handleSubmit = (event) => {
        event.preventDefault()
        if (!name || !number) return false

        // const names = name.split(",")
        
        dispatch(addContact({id: nanoid(), name, phone_number: number}))
        // dispatch(addContacts(names.map(name => ({id: nanoid(), name}))))

        setName("")
        setNumber("")
    }

  return (
    <div>
        <form onSubmit={handleSubmit} >
            <input value={name} placeholder='Enter your name' onChange={(event) => setName(event.target.value)} type="text" />
            <input value={number} placeholder='Enter your phone number' onChange={(event) => setNumber(event.target.value)} type="text" />
            <button type='submit'>Add</button>
        </form>
    </div>
  )
}

export default Form