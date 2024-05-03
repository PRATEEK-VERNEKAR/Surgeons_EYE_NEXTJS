"use client";

import React, { useState, useRef, useEffect } from 'react';

const App = () => {
  const [stream, setStream] = useState(null);
  const [responses, setResponses] = useState([]);
  const [phasevalues,setPhaseValues]=useState(['Phase0']);
  const [currentPhase,setCurrentPhase]=useState("Phase0");
  const [display,setDisplay]=useState("Going Fine");
  const videoRef = useRef();
  const intervalRef = useRef(null);
  const containerRef = useRef(null);
  const [startOperation,setStartOperation]=useState(false);

  const startCamera = async () => {
    try {
      // const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      // setStream(mediaStream);
      setStartOperation(true);
      intervalRef.current = setInterval(captureAndSendFrame, 1000);
    } catch (error) {
      console.error('Error accessing user media:', error);
    }
  };

  function mostCommonElement(arr) {
    let frequency = {};
    let maxFrequency = 0;
    let mostCommon = null;

    for (let i = 0; i < arr.length; i++) {
        let element = arr[i];
        frequency[element] = (frequency[element] || 0) + 1;
        if (frequency[element] > maxFrequency) {
            maxFrequency = frequency[element];
            mostCommon = element;
        }
    }

    return mostCommon;
  }

  useEffect(() => {
    const myfunc=async()=>{
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      return () => {
        stopCamera();
      };
    }
    myfunc();
  }, []);

  useEffect(() => {
    console.log(videoRef.current)
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  useEffect(()=>{
    const checkvalidphase=()=>{
      console.log(phasevalues.length)
      const myMap={"Phase0":0,"Phase1":1,"Phase2":2,"Phase3":3,"Phase3":3,"Phase4":4,"Phase5":5,"Phase6":6,"Phase7":7,"Phase8":8,"Phase9":9,"Phase10":10}

      if(phasevalues.length>=5){
        const newlst=phasevalues.slice(Math.max(phasevalues.length-5,0))
        console.log(newlst)
        const recentCommon=mostCommonElement(newlst)
        if(recentCommon==='Phase2' && currentPhase==='Phase7'){
          console.log("if")
        }
        else if(myMap[recentCommon]!==myMap[currentPhase]){
          console.log(myMap[recentCommon],myMap[currentPhase])
          if(myMap[recentCommon]===myMap[currentPhase]+1){
            console.log("else if if")

            setCurrentPhase(recentCommon);
          }
          else{
            playDanger();
            setDisplay("Danger");
            console.log("else if else")
            stopCamera();
          }
        }
      }
    }

    checkvalidphase();

  },[phasevalues]);

  const stopCamera = () => {
    setStartOperation(false);
    if (stream) {
      stream.getTracks().forEach(track => {
        track.stop();
      });
      setStream(null);
      clearInterval(intervalRef.current);
    }
  };

  const playWarning=()=>{
    const warning=new Audio('/beep-warning-6387-[AudioTrimmer.com].mp3');
    warning.play();
  }

  const playDanger=()=>{
    const danger=new Audio('/danger.mp3');
    danger.play();
  }

  const captureAndSendFrame = async () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const frameData = canvas.toDataURL('image/jpeg');
    try {
      const response = await fetch('http://localhost:7000/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ frameData }),
      });
      const data = await response.json();
      const timestamp = new Date().getTime();
      if(data.blurry){
        playWarning();
        setDisplay("Warning");

        setResponses(prevResponses => [...prevResponses, { blurry: "Video is Blurry",phase:data.phase, timestamp }]);
      }
      else{
        setResponses(prevResponses => [...prevResponses, { blurry: data.blurry,phase:data.phase, timestamp }]);
      }
      if(data.phase!==null){
        setPhaseValues(phasevalues=>[...phasevalues,data.phase])
      }
      // containerRef.current.scrollTop = containerRef.current.scrollHeight;
      // containerRef.current.scrollTop = containerRef.current.scrollHeight - containerRef.current.offsetHeight -50;
    } catch (error) {
      console.error('Error sending frame to Flask API:', error);
    }
  };

  useEffect(() => {
    // Scroll to the bottom with a 10px gap
    if (containerRef.current) {
      containerRef.current.scrollTop =
        containerRef.current.scrollHeight -
        containerRef.current.offsetHeight +
        10;
    }
  }, [responses]);

  
  return (
    <div className="flex h-screen">
      <div className="w-[60%] h-full flex flex-col p-4">
        <video ref={videoRef} autoPlay playsInline className="h-[60%]" />
        {startOperation && (
          <div className="flex-grow flex flex-col items-center justify-center">
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
              onClick={stopCamera}
            >
              Stop
            </button>
          </div>
        )}
        {!startOperation && (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={startCamera}
          >
            Start
          </button>
        )}
      </div>

      <div className="w-[40%] h-[60%] border-2 border-gray-300 flex justify-evenly">
        <div className='m-4 w-[50%] h-[90%]  overflow-y-auto'  ref={containerRef}>

          {responses.map((response, index) => (
            <div key={index}>
              <p>
                {response.blurry} {response.phase} (Processed Frame{' '}
                {new Date(response.timestamp).toLocaleTimeString()})
              </p>
            </div>
          ))}
        </div>
        <div className='w-[50%] border-2 border-green-200 text-4xl flex justify-center items-center font-bold'>
          {display === "Going Fine" ? (
            <p className='text-green-300'>{display}</p>
          ) : display === "Warning" ? (
            <p className='text-yellow-300'>{display}</p>
          ) : (
            <p className='text-red-300'>{display}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;




