// export async function simulateResponse(text: string, transcript: string): Promise<string> {
  
//     text = transcript + '\n\n' + text;
//     const requestBody = {
//       prompt: text,
//       // chat_history: [],
//     };

//     console.log("HELLO\n\n\n")
//     console.log(requestBody)
  
//     try {
//       const response = await fetch('http://localhost:5000/chat', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(requestBody),
//       });
  
//       console.log(response)
//       const data = await response.json();
//       return data.response;
//     } catch (error) {
//       console.error('Error simulating response:', error);
//       return 'Error simulating response';
//     }
//   }


import axios from 'axios'; // You'll need to install axios first (npm install axios)

export async function simulateResponse(text: string, transcript: string): Promise<string> {
  
  text = transcript + '\n\n' + text;
  const requestBody = {
    prompt: text,
    // chat_history: [],
  };

  try {
    const response = await axios.post('http://localhost:5000/chat', requestBody, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log(response)

    if (response.status !== 200) {
      throw new Error(`API call failed with status code ${response.status}`);
    }

    const data = response.data;
    return data.response;
  } catch (error) {
    console.error('Error simulating response:', error);
    return 'Error simulating response';
  }
}
