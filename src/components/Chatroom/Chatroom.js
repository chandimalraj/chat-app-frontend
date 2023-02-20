import React, { useEffect, useState } from "react";
import person from "../../Assets/person.jpeg";
import Friend from "./Friend";
import RecieveMessage from "./RecieveMessage";
import SendMessage from "./SendMessage";
import axios from "axios";

export default function Chatroom() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("http://localhost:8090/api/v1/user/get-all")
      .then((res) => {
        const data = res.data.data;
        console.log(data);
        setData(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const users = [1,2,3]

  return (
    <div className="container-fluid bg">
      <div className="container d-flex flex-column align-items-center">
        <div className="fw-bold hd1 pt-3 ">Simply Chat</div>

        <div className="chat d-flex flex-column p-3 mt-5 rounded-3 ">
          <div className="d-flex flex-row align-items-center px-4">
            <img
              src={person}
              class="rounded-circle"
              alt="..."
              style={{ width: "50px" }}
            />

            <div className="px-4 chat-name">Anura Kumara</div>
          </div>

          <div>
            <hr></hr>
          </div>

          <div className="d-flex flex-row">
            <div className="friends d-flex flex-column">


              {
                data.map((user)=>
                 <Friend name={user.username}/>
                )
              }


              {/* <Friend name="chandimal prabath" />
              <Friend name="chandimal prabath" />
              <Friend name="chandimal prabath" />
              <Friend name="chandimal prabath" />
              <Friend name="chandimal prabath" />
              <Friend name="chandimal prabath" />
              <Friend name="chandimal prabath" />
              <Friend name="chandimal prabath" />
              <Friend name="chandimal prabath" /> */}
            </div>

            <div className="chat-room d-flex flex-column">
              <div className="msg-box pt-2">
                <RecieveMessage />
                <SendMessage />
                <RecieveMessage />
                <RecieveMessage />
                <SendMessage />
                <RecieveMessage />
                <SendMessage />
                <RecieveMessage />
                <RecieveMessage />
                <SendMessage />
              </div>
              <div className="msg-send-box d-flex flex-row">
                <input className="w-75 reg-inpt" />
                <button className="send-btn w-25">Send </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
