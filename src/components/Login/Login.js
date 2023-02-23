import axios from "axios";
import React, { useState } from "react";
import Chatroom from '../Chatroom/Chatroom'


export default function Login() {

  const [user, setUser] = useState({
    userId: "",
    password: "",
  });
  const [logIn, setLogin] = useState(false);
  const [err1, setErr1] = useState("");
  const [err2, setErr2] = useState("");
  const [spinner, setSpinner] = useState(false);
  const emailPattern =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const phonePattern = /^\d{10}$/;

  const setuserId = (e) => {
    const newOb = { ...user, userId: e.target.value };
    setUser(newOb);
    setErr1("");
    
  };
  const setuserPwd = (e) => {
    const newOb = { ...user, password: e.target.value };
    setUser(newOb);
  };

  const login = (e) => {
    e.preventDefault();
    const idAndPassword = { id: user.userId, password: user.password };
    //id.length!=0 &&
    console.log("login");

      setSpinner(true);

      axios
        .post("http://localhost:8090/api/v1/user/login", idAndPassword)
        .then((res) => {
          setTimeout(() => {
            setSpinner(false);
          }, 4000);
          
           console.log(res.data)
          if (res.data.data != "true") {
            setErr2("password is incorrect");
          } else {
            setLogin(true)
          }
        })
        .catch((error) => {
          console.log(error);
        });
    
   
    //setLogin(true)
  };

  console.log(user);


  if(logIn){
    return ( <Chatroom user ={user}/> )
  }
   else{
    return (
      <div className="container-fluid bg">
        <div className="container d-flex flex-column align-items-center">
          <div className="fw-bold hd1 pt-3 ">Simply Chat</div>
          <div className="hd2">Chat App For Everyone</div>
          <div className="hd3">Start your journey with us</div>
  
          <form className="reg d-flex flex-column p-3 mt-5 rounded-3 ">
            <input
              className="reg-inpt p-2  rounded-2 "
              placeholder="Email Or Phone"
              onChange={setuserId}
              onBlur={
                ()=>{
                if (
                  !(
                    RegExp(emailPattern).test(user.userId) ||
                    RegExp(phonePattern).test(user.userId)
                  )
                ) {
                  setErr1("Email or Phone is not valid! please check again");
                }
              }}
            ></input>
            <div className="err mb-1">{err1}</div>
  
            <input
              className="reg-inpt p-2  rounded-2 "
              placeholder="Password"
              type={"password"}
              onChange={setuserPwd}
              onBlur={
               ()=> setErr2("")
              }
            ></input>
            <div className="err mb-1">{err2}</div>
  
            <div className="d-flex flex-row justify-content-center mt-2">
              <button className="reg-btn  p-2 px-4 rounded-2" onClick={login}>
                Log In
              </button>
            </div>
            <div className="d-flex flex-row justify-content-center mt-3 text-primary mb-1">
              Forgotten Password?
            </div>
  
            <div>
              <hr></hr>
            </div>
  
            <div className="d-flex flex-row justify-content-center mt-2">
              <button className="reg-btn  p-2 px-4 rounded-2">
                Create Account{" "}
              </button>
            </div>
          </form>
        </div>
      </div>
    );

   }
  
}
