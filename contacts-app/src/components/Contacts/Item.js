import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteContact } from '../../redux/contactSlice'
import { Link } from "react-router-dom"

function Item({item}) {

  const dispatch = useDispatch()

  const handleDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteContact(id))

    }

  }

  return (
    <div>
        <span>{item.name}</span>
        <span  style={{margin: 10}}>{item.phone_number}</span>
        <span><Link to={`/edit/${item.id}`}>Edit</Link></span>        
        <span onClick={() => handleDelete(item.id)} style={{color: "red", cursor: "pointer"}}>X</span>
    </div>
  )
}

export default Item