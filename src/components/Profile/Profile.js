import React, { useState } from "react";
import person from "../../Assets/person.jpeg";
import camera from "../../Assets/Camera2.png";
import ProfilePic from "./ProfilePic";

export default function Profile() {
  const [show, setShow] = useState(false);

  return (
    <div className="container-fluid bg position-relative p-0">
      {show == true && <ProfilePic close={setShow} />}

      <div className="container d-flex flex-column align-items-center">
        <div className="fw-bold hd1 pt-3 ">Simply Chat</div>
        <div className="hd2">Chat App For Everyone</div>
        <div className="hd3">Start your journey with us</div>

        <div className="reg d-flex flex-column p-3 mt-5 rounded-3 ">
          <div className="d-flex flex-row align-items-center px-4">
            <img
              src={person}
              class="rounded-circle"
              alt="..."
              style={{ width: "80px" }}
            />
            <img
              onClick={() => {
                setShow(true);
              }}
              src={camera}
              className=""
              style={{
                width: "35px",
                marginLeft: "-25px",
                marginTop: "40px",
                cursor: "pointer",
              }}
            />

            <div className="px-4 p-name">Anura Kumara</div>
          </div>

          <div className="px-4 pt-4 pb-3">anurakumara@gmail.com</div>
          <div className="px-4  pb-3">0763399543</div>

          <div>
            <hr></hr>
          </div>

          <div className="d-flex flex-row justify-content-center mt-2">
            <button className="reg-btn  p-2 px-4 rounded-2">Join Chat </button>
          </div>
        </div>
      </div>
    </div>
  );
}
