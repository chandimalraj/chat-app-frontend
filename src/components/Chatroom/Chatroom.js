import React, { useEffect, useState } from "react";
import person from "../../Assets/person.jpeg";
import Friend from "./Friend";
import RecieveMessage from "./RecieveMessage";
import SendMessage from "./SendMessage";
import axios from "axios";
import { over } from "stompjs";
import SockJS from "sockjs-client";

var stompClient = null;

export default function Chatroom(props) {
  const user = props.user;
  const [data, setData] = useState([]);
  const [msg, setMsg] = useState("");
  const [recieverName, setReciever] = useState("");
  const [msgData, setMsgData] = useState([]);
 
  console.log(msgData);

  const [userData, setUserData] = useState({
    username: user.userId,
    receivername: "",
    connected: false,
    message: "",
  });

  useEffect(() => {
    fetchData();
    registerUser();
  }, []);

  const fetchData = () => {
    axios
      .get("http://localhost:8090/api/v1/user/get-all")
      .then((res) => {
        const data = res.data.data;

        setData(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const registerUser = () => {
    connect();
  };

  //connect to backend
  const connect = () => {
    let Sock = new SockJS("http://localhost:8090/ws");
    stompClient = over(Sock);
    stompClient.connect(
      {},
      () => {
        if (stompClient.connected) {
          console.log("stomp client connected to server");
          setUserData({ ...userData, connected: true });

          stompClient.subscribe(
            "/user/" + userData.username + "/private",
            (payload) => {
              const data = JSON.parse(payload.body);

              const chatMessage = {
                senderName: data.senderName,
                receiverName: data.receiverName,
                status: "MESSAGE",
                message: data.message,
              };

              setMsgData((prevMessages) => [...prevMessages, chatMessage]);

             
            }
          );
        }
      },
      (onError) => {
        console.error(onError);
      }
    );
  };
  console.log("hi");

  const setMessage = (e) => {
    setMsg(e.target.value);
  };

  const sendMessage = () => {
    var chatMessage = {
      senderName: user.userId,
      receiverName: recieverName,
      status: "MESSAGE",
      message: msg,
    };
    setMsgData((prevMessages) => [...prevMessages, chatMessage]);
   
    stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
  };

  const users = [1, 2, 3];

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

            <div className="px-4 chat-name">{user.userId}</div>
          </div>

          <div>
            <hr></hr>
          </div>

          <div className="d-flex flex-row">
            <div className="friends d-flex flex-column">
              {data.map((user) => (
                <Friend name={user.username} setReciever={setReciever} />
              ))}

              
            </div>

            <div className="chat-room d-flex flex-column">
              <div className="msg-box pt-2">
                {msgData.map(
                  (item) =>
                     item.receiverName !=user.userId ? (
                      <SendMessage msg={item.message} />
                    ) : (
                      <RecieveMessage msg={item.message} />
                    )

                 
                )}
                
              </div>
              <div className="msg-send-box d-flex flex-row">
                <input className="w-75 reg-inpt" onChange={setMessage} />
                <button className="send-btn w-25" onClick={sendMessage}>
                  Send{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
