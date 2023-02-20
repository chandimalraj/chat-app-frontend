import React from 'react'
import person from "../../Assets/person.jpeg";
import close from "../../Assets/Cancel.png"

export default function ProfilePic(props) {

    const closef = props.close;

  return (
    <div className='container-fluid position-fixed z-3 top-0 right-0 bottom-0 left-0 d-flex flex-column  align-items-center ' style={{ "paddingTop":"181px" }}>
        
        <div className="reg d-flex flex-column p-3  rounded-3 ">
        <div className='d-flex justify-content-end '><img src={close} style={{ "width":"35px","cursor":"pointer" }} onClick={()=>{
        closef(false)
        }}/></div>
          <div className="d-flex flex-row align-items-center px-4">
            <img
              src={person}
              class="rounded-circle"
              alt="..."
              style={{ width: "80px" }}
            />
            <img 
            // src={camera} 
            className="" style={{ "width":"35px","marginLeft":"-25px","marginTop":"40px","cursor":"pointer"}} />

            <div className="px-4 p-name">Anura Kumara</div>
          </div>

          <div className="px-4 pt-4 ">
               Update Profile Picture
          </div>
          <div className="px-4  pb-3">
                
          </div>


          <div>
            <hr></hr>
          </div>

          <div className="d-flex flex-row justify-content-center mt-2">
            <input className="reg-btn  p-2 px-4 rounded-2" type="file"/>
          </div>
        </div>
    </div>
  )
}
