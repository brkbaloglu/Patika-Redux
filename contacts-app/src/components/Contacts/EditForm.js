import React, { useState } from 'react'
import { updateContact } from '../../redux/contactSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function EditForm({contact}) {

    const [name, setName] = useState(contact.name)
    const [number, setNumber] = useState(contact.phone_number)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault()
        if (!name || !number) {
            return false
        }
        dispatch(updateContact({
            id: contact.id,
            changes: {
                name,
                phone_number: number
            }
        }))
        navigate("/")
    }
    

  return (
    <div>
        <form onSubmit={handleSubmit} >
            <input value={name} placeholder='Enter your name' onChange={(event) => setName(event.target.value)}  type="text" />
            <input value={number} placeholder='Enter your phone number' onChange={(event) => setNumber(event.target.value)}  type="text" />
            <button type='submit'>Update</button>
        </form>
    </div>
  )
}

export default EditForm