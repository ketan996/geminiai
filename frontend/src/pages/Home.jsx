import React, { useState, useEffect } from 'react'
import { IoCodeSlash, IoSend } from 'react-icons/io5'
import { BiPlanet } from 'react-icons/bi'
import { FaPython } from 'react-icons/fa'
import { TbMessageChatbot } from 'react-icons/tb'
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const [message, setMessage] = useState("");
  const [isResponseScreen, setIsResponseScreen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);  // Loading state
  const navigate = useNavigate();

  const hitRequest = () => {
    if (message) {
      generateResponse(message);
    } else {
      alert("You must write something... !");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);

  const generateResponse = async (msg) => {
    if (!msg) return;
    
    setIsLoading(true);  // Set loading to true when fetching data

    

    const genAI = new GoogleGenerativeAI("AIzaSyDj8WaJmEfl8SgxGoMScA7dqGrDJ_wSsQg");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(msg);

    const newMessages = [
      ...messages,
      { type: "userMsg", text: msg },
      { type: "responseMsg", text: result.response.text() },
    ];
    
    setMessages(newMessages);
    setIsResponseScreen(true);
    setIsLoading(false);  // Set loading to false after receiving response
    setMessage("");
    console.log(result.response.text());
  };

  const newChat = () => {
    setIsResponseScreen(false);
    setMessages([]);
  }

  return (
    <div className="container min-w-full h-screen overflow-hidden bg-[#0E0E0E] text-white">
      {isResponseScreen ? (
        <div className='h-[80vh]'>
          <div className="header pt-[25px] flex items-center justify-between w-[100vw] px-[300px]">
            <h2 className='text-2xl'>AssistMe</h2>
            <button id='newChatBtn' className='bg-[#181818] p-[10px] rounded-[30px] cursor-pointer text-[14px] px-[20px]' onClick={newChat}>New Chat</button>
          </div>

          <div className="messages">
            {messages?.map((msg, index) => (
              <div key={index} className={msg.type}>{msg.text}</div>
            ))}
          </div>
        </div>
      ) : (
        <div className="middle h-[80vh] flex items-center flex-col justify-center">
          <h1 className='text-4xl'>AssistMe</h1>
          <div className="boxes mt-[30px] flex items-center gap-2">
            <div onClick={() => setMessage("What is coding ? How we can learn it.")} className="card rounded-lg cursor-pointer transition-all hover:bg-[#201f1f] px-[20px] relative h-[20vh] bg-[#181818] p-[10px]">
              <p className='text-[18px]'>What is coding ? <br /> How we can learn it.</p>
              <i className='absolute right-3 bottom-3 text-[18px]'><IoCodeSlash /></i>
            </div>
            <div onClick={() => setMessage("Which is the red planet of solar system.")} className="card rounded-lg cursor-pointer transition-all hover:bg-[#201f1f] px-[20px] relative h-[20vh] bg-[#181818] p-[10px]">
              <p className='text-[18px]'>Which is the red <br /> planet of solar <br /> system</p>
              <i className='absolute right-3 bottom-3 text-[18px]'><BiPlanet /></i>
            </div>
            <div onClick={() => setMessage("In which year python was invented ?")} className="card rounded-lg cursor-pointer transition-all hover:bg-[#201f1f] px-[20px] relative h-[20vh] bg-[#181818] p-[10px]">
              <p className='text-[18px]'>In which year python <br /> was invented ?</p>
              <i className='absolute right-3 bottom-3 text-[18px]'><FaPython /></i>
            </div>
            <div onClick={() => setMessage("How we can use the AI for adopt ?")} className="card rounded-lg cursor-pointer transition-all hover:bg-[#201f1f] px-[20px] relative h-[20vh] bg-[#181818] p-[10px]">
              <p className='text-[18px]'>How we can use <br /> the AI for adopt ?</p>
              <i className='absolute right-3 bottom-3 text-[18px]'><TbMessageChatbot /></i>
            </div>
          </div>
        </div>
      )}

      <div className="bottom w-[100%] flex flex-col items-center">
        <div className="inputBox w-[60%] text-[15px] py-[7px] flex items-center bg-[#181818] rounded-[30px]">
          <input value={message} onChange={(e) => setMessage(e.target.value)} type="text" className='p-[10px] pl-[15px] bg-transparent flex-1 outline-none border-none' placeholder='Write your message here...' id='messageBox' />
          {message === "" ? "" : (
            isLoading ? (
              <span className="text-green-500 text-[20px] mr-5">...</span>  // Show "..." while loading
            ) : (
              <i className='text-green-500 text-[20px] mr-5 cursor-pointer' onClick={hitRequest}><IoSend /></i>
            )
          )}
        </div>
        <p className='text-[gray] text-[14px] my-4'>AssistMe is developed by Mo. Mahdi Farooqui. This AI uses the Gemini API to give the response.</p>
      </div>
    </div>
  );
}

export default Home;
