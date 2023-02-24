import axios from "axios";
import React, { useState } from "react";

export default function SignUp() {
  const usernamePattern = "^[A-Za-z0-9]{3,20}$";
  const emailPattern =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const phonePattern = /^\d{10}$/;
  const passwordPattern = /^.{5,15}$/;

  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const [err1, setErr1] = useState("");
  const [err2, setErr2] = useState("");
  const [err3, setErr3] = useState("");
  const [err4, setErr4] = useState("");

  const setusername = (e) => {
    const obj = { ...user, username: e.target.value };
    setUser(obj);
    console.log("hi");
    setErr1("");
  };
  const setemail = (e) => {
    const obj = { ...user, email: e.target.value };
    setUser(obj);
    setErr2("");
  };
  const setphone = (e) => {
    const obj = { ...user, phone: e.target.value };
    setUser(obj);
    setErr3("");
  };
  const setpassword = (e) => {
    const obj = { ...user, password: e.target.value };
    setUser(obj);
    setErr4("");
  };

  const passwordValidation = () => {
    if (user.password.length < 5) {
      setErr4("password should contain at least 5 characters");
    } else {
      setErr4("");
    }
  };

  const signUp = (e) => {
    e.preventDefault();
    console.log("e");

    axios
      .post("http://localhost:8090/api/v1/user/save", user)
      .then((res) => {
        setTimeout(() => {}, 4000);

        console.log(res.data);
        if (res.data.data == "User not Found") {
        } else if (res.data.data == "password not match") {
        } else {
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container-fluid bg">
      <div className="container d-flex flex-column align-items-center">
        <div className="fw-bold hd1 pt-3 ">Simply Chat</div>
        <div className="hd2">Chat App For Everyone</div>
        <div className="hd3">Start your journey with us</div>

        <form
          className="reg d-flex flex-column p-3 mt-5 rounded-3 "
          onSubmit={(e) => {
            signUp(e);
          }}
        >
          <input
            className="reg-inpt p-2  rounded-2 "
            placeholder="Username"
            pattern="^[A-Za-z0-9]{3,20}$"
            autoFocus
            required
            maxLength="20"
            minLength="3"
            onChange={(e) => {
              setusername(e);
              if (!RegExp(usernamePattern).test(e.target.value))
                setErr1(
                  "3-16 characters ,shouldn't include any special character!"
                );
              else {
                setErr1("");
              }
            }}
            onBlur={() => setErr1("")}
          ></input>
          <div className="err mb-1">{err1}</div>
          <input
            className="reg-inpt p-2  rounded-2 "
            placeholder="Email"
            type="email"
            required
            onChange={(e) => {
              setusername(e);
              if (!RegExp(emailPattern).test(e.target.value))
                setErr2("Email is not valid");
              else {
                setErr2("");
              }
            }}
            onBlur={() => setErr2("")}
          ></input>
          <div className="err mb-1">{err2}</div>
          <input
            className="reg-inpt p-2  rounded-2 "
            placeholder="Phone"
            required
            onChange={(e) => {
              setphone(e);
              if (!RegExp(phonePattern).test(e.target.value))
                setErr3("Phone number is not valid");
              else {
                setErr3("");
              }
            }}
            onBlur={() => setErr3("")}
          ></input>
          <div className="err mb-1">{err3}</div>
          <input
            className="reg-inpt p-2  rounded-2 "
            placeholder="Password"
            type={"password"}
            required
            onChange={(e) => {
              setpassword(e);
              if (!RegExp(passwordPattern).test(e.target.value))
                setErr4("Password should contain between 5 and 15 characters:");
              else {
                setErr4("");
              }
            }}
            onBlur={() => setErr4("")}
          ></input>
          <div className="err mb-3">{err4}</div>

          <div className="reg-txt ">
            By clicking Sign Up, you agree to our Terms, Privacy Policy and
            Cookies Policy.
          </div>
          <div className="reg-txt ">
            You may receive SMS notifications from us and can opt out at any
            time.
          </div>

          <div className="d-flex flex-row justify-content-center mt-4">
            <input
              className="reg-btn  p-2 px-4 rounded-2 "
              type="submit"
              value="Sign Up"
            ></input>
          </div>
          <a
            className="d-flex flex-row justify-content-center mt-3 text-primary mb-3 "
            style={{ cursor: "pointer" ,textDecoration:"none" }}
            href="/login"
          >
            Already Have An Account?
          </a>
        </form>
      </div>
    </div>
  );
}
