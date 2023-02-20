import axios from 'axios'
import React, { useState } from 'react'

export default function Testing() {

    const [image,setImage] = useState("")

    const handleImageUpload = (event) => {
        console.log(event.target.files)
        setImage(event.target.files[0])
       
      }
      

      const uploadImage = ()=>{
        const formData = new FormData()
        formData.append('image',image)
        axios.post(`https://api.imgbb.com/1/upload`,formData,{

        headers: {
            'Content-Type': 'multipart/form-data'
          },
          params: {
            key: apiKey
          }
        })
             .then((res)=>{
               console.log(res)
             })
             .catch((err)=>{
               console.log(err)
             })

      }


      const apiKey = 'e82868e04f76ded549481f4fd845157e'

  return (
    <div>

    <input type="file" onChange={handleImageUpload} />

    <button onClick={uploadImage}>submit</button>

    

    </div>
  )
}
