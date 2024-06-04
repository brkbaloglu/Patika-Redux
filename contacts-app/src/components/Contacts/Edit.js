import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import EditForm from './EditForm'

import { useSelector } from 'react-redux'
import { contactSelectors } from '../../redux/contactSlice'
function Edit() {
  const {id} = useParams()
  const navigate = useNavigate()
  const contact = useSelector(state => contactSelectors.selectById(state, id))
  if (!contact) {
    return navigate("/")
  }
  return (
    <div>
      <h1>Edit</h1>
      <EditForm contact={contact}></EditForm>
    </div>
  )
}

export default Edit