import React from 'react'
import { contactSelectors, deleteAllContacts } from '../../redux/contactSlice'
import { useSelector, useDispatch } from 'react-redux'
import Item from "./Item"

function List() {

  const dispatch = useDispatch()
  const contacts = useSelector(contactSelectors.selectEntities)
  const total = useSelector(contactSelectors.selectTotal)
  console.log(contacts);
  // const total= useSelector(contactSelectors.selectTotal)

  const handleDeleteAll = () => {
    if (window.confirm("Are you sure? ")) {
      dispatch(deleteAllContacts())
    }
  }

  return (
    <div>
      {
        total > 0 && 
        <div style={{cursor: "pointer"}} onClick={handleDeleteAll} >Delete All</div>
      }

        {
            Object.values(contacts).map((contact) => (
                <Item key={contact.id} item={contact} />
            ))
        }
    </div>
  )
}

export default List