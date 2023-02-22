import React from 'react'
import person from "../../Assets/person.jpeg";

export default function SendMessage(props) {

  const message = props.msg
  return (
    <div className='d-flex flex-row px-2 justify-content-end '>

    
    <div className='ml-1 p-2 pt-0 msg m-1'>{message}
   </div>
   <img src={person} className='rounded-circle' style={{ "width":"40px","height":"40px"}}/>
    
</div>
  )
}
