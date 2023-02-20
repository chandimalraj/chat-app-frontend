import React from 'react'
import person from "../../Assets/person.jpeg";

export default function RecieveMessage(props) {

    const message = props.message

  return (
    <div className='d-flex flex-row px-2 '>

        <img src={person} className='rounded-circle' style={{ "width":"40px","height":"40px"}}/>
        <div className='ml-1 p-2 pt-0 msg m-1'>ado khmd bn 
        asdasdsad
        asdasdsadasddsad
       </div>
        
    </div>
  )
}
