// import React from 'react'
// import { redirect } from "next/navigation";
// import { getServerSession } from "next-auth/next";
// import { options } from "@/app/api/auth/[...nextauth]/route";

// const page = async () => {
//   const session = await getServerSession(options);
//   console.log(session);

//   if(!session){
//     redirect(`/auth/login?callbackUrl=/realtime`)
//   }


//   return (
//     <div>page</div>
//   )
// }

// export default page


// app/page.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';

interface FlaskResponse {
  anomaly: boolean;
  phase: string;
  tools: string;
}

const Home = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [flaskResponse, setFlaskResponse] = useState<FlaskResponse | null>(null);

  useEffect(() => {
    // const startCamera = async () => {
    //   try {
    //     const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    //     if (videoRef.current) {
    //       videoRef.current.srcObject = stream;
    //     }
    //   } catch (error) {
    //     console.error('Error accessing camera:', error);
    //   }
    // };

		const startCamera = async () => {
			try {
				const stream = await navigator.mediaDevices.getUserMedia({
					video: {
						facingMode: 'environment', // Use the back camera if available
						width: { ideal: 1920 },    // Set ideal width
						height: { ideal: 1080 },   // Set ideal height
					},
				});
		
				if (videoRef.current) {
					videoRef.current.srcObject = stream;
				}
			} catch (error) {
				console.error('Error accessing camera:', error);
			}
		};
		

    startCamera();
  }, []);

  useEffect(() => {
    const captureFrameAndSendToFlask = () => {
      if (videoRef.current && canvasRef.current) {
        const canvas = canvasRef.current;
        const video = videoRef.current;
        const ctx = canvas.getContext('2d');

        if (ctx) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

          const imageData = canvas.toDataURL('image/jpeg');

          // Send the image data to the Flask server
          fetch('/api/process-frame', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ imageData }),
          })
            .then((response) => response.json())
            .then((data: FlaskResponse) => {
              setFlaskResponse(data);
            })
            .catch((error) => {
              console.error('Error communicating with Flask server:', error);
            });
        }
      }

      requestAnimationFrame(captureFrameAndSendToFlask);
    };

    requestAnimationFrame(captureFrameAndSendToFlask);
  }, []);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ flex: 0.7 }}>
        <video ref={videoRef} autoPlay muted playsInline style={{ maxWidth: '100%', maxHeight: '100%' }} />
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>
      <div style={{ flex: 0.3, padding: '1rem' }}>
        <h2>Flask Server Response</h2>
        {flaskResponse ? (
          <div>
            <p>Anomaly: {flaskResponse.anomaly ? 'True' : 'False'}</p>
            <p>Phase: {flaskResponse.phase}</p>
            <p>Tools: {flaskResponse.tools}</p>
          </div>
        ) : (
          <p>Waiting for response from Flask server...</p>
        )}
      </div>
    </div>
  );
};

export default Home;