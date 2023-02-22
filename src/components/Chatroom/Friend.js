import React, { useState } from 'react'
import person from "../../Assets/person.jpeg";




export default function Friend(props) {

  const image = props.image;
  const name = props.name;
  const setReciever = props.setReciever;

  return (
    <div className='d-flex flex-row pt-2 align-items-center border pb-2' onClick={()=>setReciever(name)}>
      
      <img src={person}  className="rounded-circle px-2"
              alt="..."
              style={{ width: "60px" }}/>
      <div className='px-2 friend-name'>{name}</div>

    </div>
  )
}
