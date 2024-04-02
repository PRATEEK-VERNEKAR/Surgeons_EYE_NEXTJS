export async function simulateResponse(text: string, transcript: string): Promise<string> {
    console.log(text);
  
    text = transcript + '\n\n' + text;
    const requestBody = {
      prompt: text,
      chat_history: [],
    };
  
    try {
      const response = await fetch('http://localhost:5000/answer_question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
  
      console.log(response);
  
      const data = await response.json();
      console.log(data);
      return data.response;
    } catch (error) {
      console.error('Error simulating response:', error);
      return 'Error simulating response';
    }
  }