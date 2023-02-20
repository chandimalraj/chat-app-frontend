import React, { useEffect, useState } from "react";
import { over } from "stompjs";
import SockJS from "sockjs-client";

var stompClient = null;

const ChatRoom = () => {
  const [privateChats, setPrivateChats] = useState(new Map());

 // const [privateChats, setPrivateChats] = useState([]);
  const [publicChats, setPublicChats] = useState([]);
  const [tab, setTab] = useState("CHATROOM");
  const [userData, setUserData] = useState({
    username: "",
    receivername: "",
    connected: false,
    message: "",
  });

  const [msgs, setMsgs] = useState([]);

  useEffect(() => {
    // console.log(userData);
  }, [userData]);

  //  Issellama weda krnne meya
  const registerUser = () => {
    //dewanuwata meya
    connect();
  };

  //connect to backend
  const connect = () => {

    //socket eka hadanawa backend ekath ekka
    let Sock = new SockJS("http://localhost:8090/ws");

    //stomp clientwa hadanawa hadapu socket eka pavichi krla
    stompClient = over(Sock);

    //stomp clientwa connect krnw backend ekata
    stompClient.connect(
      {},

      // onConnected
      () => {
        if (stompClient.connected) {
          console.log("stomp client connected to server");
          setUserData({ ...userData, connected: true });
          
          stompClient.subscribe(
            "/chatroom",
            // messageRecieved
            (payload) => {
              var payloadData = JSON.parse(payload.body);

              privateChats.set(payloadData.senderName,[]);
              setPrivateChats(new Map(privateChats));
              msgs.push(payloadData.message)
              //setMsgs([...msgs,payloadData.message])
              console.log(msgs);
             
            }
          );
          stompClient.subscribe('/user', (payload)=>{
             console.log("private message is come")
          });
          stompClient.subscribe('/user/'+ userData.username +'/private',  (payload)=>{
            console.log("private message is come")
         });
          var chatMessage = {
            senderName: userData.username,
            status: "JOIN",
            message: "halo",
          };
          stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
        }
      },
      onError
    );

    //userJoin();
  };

  const msgAdd = (msg)=>{
       setMsgs([...msgs , msg])
  }

  const userJoin = () => {
    if (stompClient.connected) {
      var chatMessage = {
        senderName: userData.username,
        status: "JOIN",
        message: "halo",
      };
      stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
    }
    console.log(msgs);
    // var chatMessage = {
    //   senderName: userData.username,
    //   status: "JOIN",
    //   message:"halo"
    // };

    //console.log(chatMessage)
    //stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
  };





  const send = () => {
    var chatMessage = {
      senderName: userData.username,
      status: "MESSAGE",
      message: userData.message,
    };

    console.log(privateChats)
    stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
  };

  const sendPrivate = ()=>{
    var chatMessage = {
      senderName: userData.username,
      receiverName: "b",
      status: "MESSAGE",
      message:" private message",
    };

    stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
  }





  const messageRecieved = (payload) => {
    console.log(payload.body);

    var payloadData = JSON.parse(payload.body);
  };

  //thun wenuwata meya
  const onConnected = () => {
    console.log(stompClient.connected);
    setUserData({ ...userData, connected: true });

    //topic ekata set krnw clientwa
    stompClient.subscribe("/chatroom/public", onMessageReceived);

    stompClient.subscribe(
      "/user/" + userData.username + "/private",
      onPrivateMessage
    );

    //
  };

  const onMessageReceived = (payload) => {
    console.log(payload.body);

    var payloadData = JSON.parse(payload.body);

    switch (payloadData.status) {
      case "JOIN":
        // if (!privateChats.get(payloadData.senderName)) {
        //   privateChats.set(payloadData.senderName, []);
        //   setPrivateChats(new Map(privateChats));
        // }
        setPrivateChats([...privateChats, payloadData]);
        break;
      case "MESSAGE":
        publicChats.push(payloadData);
        setPublicChats([...publicChats]);
        break;
    }
  };

  const onPrivateMessage = (payload) => {
    console.log(payload);
    var payloadData = JSON.parse(payload.body);

    if (privateChats.get(payloadData.senderName)) {
      privateChats.get(payloadData.senderName).push(payloadData);
      setPrivateChats(new Map(privateChats));
    } else {
      let list = [];
      list.push(payloadData);
      privateChats.set(payloadData.senderName, list);
      setPrivateChats(new Map(privateChats));
    }
  };

  const onError = (err) => {
    console.log(err);
  };

  const handleMessage = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, message: value });
  };

  const sendValue = () => {
    console.log("send value");

    if (stompClient.connected) {
      var chatMessage = {
        senderName: userData.username,
        message: userData.message,
        status: "MESSAGE",
      };

      console.log(chatMessage);

      stompClient.send("/app/message", {}, JSON.stringify(chatMessage));

      setUserData({ ...userData, message: "" });
    }
  };

  const sendPrivateValue = () => {
    if (stompClient.connected) {
      var chatMessage = {
        senderName: userData.username,
        receiverName: tab,
        message: userData.message,
        status: "MESSAGE",
      };

      if (userData.username !== tab) {
        privateChats.get(tab).push(chatMessage);
        setPrivateChats(new Map(privateChats));
      }
      stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
      console.log(chatMessage);
      setUserData({ ...userData, message: "" });
    }
  };

  // const handleUsername = (event) => {
  //   const { value } = event.target;
  //   setUserData({ ...userData, username: value });
  // };

 const x = [{name:"1"},{name:"2"},{name:"3"}]

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">

      <div className="w-lg-25 h-75 d-flex flex-column ">

       {[...privateChats].map((name,index)=>(
                        <li onClick={()=>{
                          //setTab(name)
                          sendPrivate()
                        }} className={`member ${tab===name && "active"}`} key={index}>{name}</li>
                    ))} 



        
      </div>
      <div className="w-lg-50 h-75 d-flex flex-column">
        <div>
          <input
            onChange={(e) => {
              const x = e.target.value;
              setUserData({ ...userData, username: x });
            }}
          />
          <button
            onClick={() => {
              console.log(userData);
              registerUser();
            }}
          >
            join chat
          </button>
        </div>

        <div className="h-75 d-flex flex-column">
          <div className="h-75 d-flex flex-column bg-primary">
            
           {
            msgs.map((msg)=>

              <div>{msg}</div>            
            
            
            )
           }

                    {/* {[...privateChats].map((name,index)=>(
                        <li onClick={()=>{setTab(name)}} className={`member ${tab===name && "active"}`} key={index}>{name}</li>
                    ))} */}



          </div>
          <div className="">
            <input
              onChange={(e) => {
                const x = e.target.value;
                setUserData({ ...userData, message: x });
              }}
            />
            <button
              onClick={() => {
                console.log(userData);
                //userJoin();
                send();
              }}
            >
              Send message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
