import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../utils/chatSlice";
import { generateRandomName, makeRandomMessage } from "../utils/helper";
import ChatMessage from "./ChatMessage";

const LiveChat = () => {
  const dispatch = useDispatch();
  const [liveMessage,setLiveMessage]       = useState("")
  const chatMessages = useSelector((store) => store.chat.messages);
  useEffect(() => {
    const i = setInterval(() => {
      //API polling
      dispatch(
        addMessage({
          name: generateRandomName(),
          message: makeRandomMessage(20),
        })
      );
    }, 3000);
    return () => {
      clearInterval(i);
    };
  }, []);
  return (
    <>
      <div
        className="h-[500px] ml-2 p-2 w-full border border-black bg-slate-100 rounded-lg overflow-y-scroll
    flex flex-col-reverse"
      >
        <div>
          {chatMessages.map((c, index) => (
            <ChatMessage key={index} name={c.name} message={c.message} />
          ))}
        </div>
      </div>

      <form onSubmit={(e) =>{e.preventDefault()
        console.log(liveMessage)
        dispatch(addMessage({
            name:"Bharat",
            message:liveMessage
        }))
        setLiveMessage("")
        }}>
        <input className="w-96 p-2 ml-3 border border-black"type="text" value={liveMessage} onChange={(e) => setLiveMessage(e.target.value)}/>
        <button className="ml-1 px-4 py-2 bg-slate-300 rounded" >Send</button>
      </form>
    </>
  );
};

export default LiveChat;
