import React from 'react'

export default function Login() {
  return (
    <div className='container-fluid bg' >
    
    <div className='container d-flex flex-column align-items-center'>

      <div className='fw-bold hd1 pt-3 '>Simply Chat</div>
      <div className='hd2'>Chat App For Everyone</div>
      <div className='hd3'>Start your journey with us</div>

      <form className='reg d-flex flex-column p-3 mt-5 rounded-3 ' >

         <input className='reg-inpt p-2 mb-4 rounded-2 ' placeholder='Email Or Phone'></input>
       
         <input className='reg-inpt p-2 mb-3 rounded-2 ' placeholder='Password' type={"password"}></input>

       

         <div className='d-flex flex-row justify-content-center mt-2'><button className='reg-btn  p-2 px-4 rounded-2'> Log In </button></div>
        <div className='d-flex flex-row justify-content-center mt-3 text-primary mb-1'>
           Forgotten Password?
        </div>

        <div>
            <hr></hr>
        </div>

        <div className='d-flex flex-row justify-content-center mt-2'><button className='reg-btn  p-2 px-4 rounded-2'>Create Account </button></div>
      </form>

    </div>

    </div>
  )
}
