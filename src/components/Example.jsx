import Chatbot from 'react-chatbot-kit';
import { useState } from 'react';
import 'react-chatbot-kit/build/main.css';
import ActionProvider from './ActionProvider';
import MessageParser from './MessageParser';
import config from './Config';
import { useNavigate } from 'react-router-dom';


const Example = () => {
  
  const navigate=useNavigate()

  const videoList = [
    'https://www.youtube.com/embed/QXeEoD0pB3E?rel=0',
    'https://www.youtube.com/embed/hEgO047GxaQ?rel=0',
    'https://www.youtube.com/embed/mbryl4MZJms?rel=0',
    'https://www.youtube.com/embed/DWgzHbglNIo?rel=0',
    'https://www.youtube.com/embed/Z3UsF2Hurew?rel=0',
    'https://www.youtube.com/embed/TqPzwenhMj0?rel=0',
    'https://www.youtube.com/embed/Eaz5e6M8tL4?rel=0',
    'https://www.youtube.com/embed/Mf7eFtbVxFM?rel=0',
    'https://www.youtube.com/embed/2IsF7DEtVjg?rel=0',
    'https://www.youtube.com/embed/4V14G5_CNGg?rel=0',
    'https://www.youtube.com/embed/1U8TI16AR4s?rel=0',
    'https://www.youtube.com/embed/_OZIAHg5i7M?rel=0',
    'https://www.youtube.com/embed/gCCVsvgR2KU?rel=0',
  ];
  
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  
    const handleUpNextClick = () => {
      if (currentVideoIndex < videoList.length - 1) {
        setCurrentVideoIndex((prevIndex) => prevIndex + 1);
  
      }
    };

    // const [disturbed, setDisturbed] = useState(false);

    // const checkDisturbance = async () => {
    //   try {
    //     const response = await fetch('http://127.0.0.1:8000/camera', {
    //       method: 'POST',
    //     });
  
    //     if (response.ok) {
    //       const data = await response.json();
    //       setDisturbed(data.disturbed);
    //     } else {
    //       console.error('Failed to fetch disturbance status');
    //     }
    //   } catch (error) {
    //     console.error('Error fetching disturbance status:', error);
    //   }
    // };
  
    // Fetch disturbance status every 1 second
    // useEffect(() => {
    //   const intervalId = setInterval(checkDisturbance, 1000);
  
    //   return () => {
    //     clearInterval(intervalId);
    //   };
    // }, []);

    const props = {
      lang: 'Python',
      skill: 'Beginner',
      title: 'Conditional Statements'
    };

return (
  <div className='flex  bg-blue-100 p-2 pb-[1000px] space-x-2 pt-4'>
      <div className="w-full gap-6 bg-blue-400">
          {/* YouTube Embed */}
          <iframe
            className="w-full h-full rounded-2xl"
            src={videoList[currentVideoIndex]}
            frameBorder="0"
            height={200}
            allowFullScreen
          />

        <h2 className="text-2xl font-bold mb-4 mt-4">Learn with me! Python 101</h2>
        <div className='flex justify-between'>
        <div className="flex space-x-2">
          <button className="bg-blue-800 rounded-md  text-white px-4 py-2" onClick={()=>{navigate('/ai-code',{state: props})}}>Ai Code</button>
          <button className="bg-blue-800 rounded-md  text-white px-4 py-2" onClick={()=>{navigate('/ai-read',{state: props})}}>Ai Read</button>
          <button className="bg-blue-800 rounded-md  text-white px-4 py-2" onClick={()=>{navigate('/quiz',{state: props})}}>Ai Quiz</button>
          {/* <button className="bg-white rounded-md  text-black px-4 py-2" onClick={()=>{navigate('/science')}}>Ai Science</button> */}
          <button className="bg-blue-800 rounded-md  text-white px-4 py-2" onClick={()=>{navigate('/leader-board',{state: props})}}>Leader Board</button>
          {/* ... */}
        </div>
        <div className="flex space-x-2">
          <button onClick={handleUpNextClick} className="bg-gray-600 rounded-md text-white px-4 py-2">Completed ➡</button>
          {/* ... */}
        </div>
        </div>
       
      </div>


<div className="h-max">
        {/* Chatbot */}
        <Chatbot
          headerText="Mimi AI"
          config={config}
          messageParser={(params) => MessageParser(params, videoList[currentVideoIndex])}
          actionProvider={ActionProvider}
        />
        <div className="flex items-start justify-start space-x-2 mt-4">
          {/* Next Video Button */}
          {/* <button 
            onClick={handleUpNextClick}
            className=" text-white rounded-2 rounded-md border-dashed border-2 border-white px-4 py-2">
            Next Video
          </button> */}
          {/* Iframe */}
          <div className=" relative">
            <iframe
              className="absolute w-full h-full top-0 left-0"
              src={videoList[currentVideoIndex + 1]}
              frameBorder="0"
              allowFullScreen
            />
          </div>
        </div>

        {/* {(disturbed &&
          <div className="absolute left-8 top-1/4 transform translate-y-1/2 bg-red-500 text-white p-2 rounded shadow-md">
            Warning: You are disturbed!
          </div>
        )} */}

      </div>

      </div>
)
  
};

export default Example;
