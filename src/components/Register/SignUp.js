import React from 'react'

export default function SignUp() {


  return (
    <div className='container-fluid bg' >
    
    <div className='container d-flex flex-column align-items-center'>

      <div className='fw-bold hd1 pt-3 '>Simply Chat</div>
      <div className='hd2'>Chat App For Everyone</div>
      <div className='hd3'>Start your journey with us</div>

      <form className='reg d-flex flex-column p-3 mt-5 rounded-3 ' >

         <input className='reg-inpt p-2 mb-4 rounded-2 ' placeholder='Username'></input>
         <input className='reg-inpt p-2 mb-4 rounded-2 ' placeholder='Email'></input>
         <input className='reg-inpt p-2 mb-4 rounded-2 ' placeholder='Phone'></input>
         <input className='reg-inpt p-2 mb-3 rounded-2 ' placeholder='Password' type={"password"}></input>

         <div className='reg-txt '>
         By clicking Sign Up, you agree to our Terms, Privacy Policy and Cookies Policy.
         </div>
         <div className='reg-txt '>
         You may receive SMS notifications from us and can opt out at any time.
        </div>

         <div className='d-flex flex-row justify-content-center mt-4'><button className='reg-btn  p-2 px-4 rounded-2'> Sign Up </button></div>
        <div className='d-flex flex-row justify-content-center mt-3 text-primary mb-3' style={{ "cursor":"pointer" }}>
            Already Have An Account?
        </div>
      </form>

    </div>

    </div>
  )

}
