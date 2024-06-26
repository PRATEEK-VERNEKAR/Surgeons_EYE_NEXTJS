export async function appendChatMessage(email: string, msgType: string, message: string, dateTimeId:string,transcript: string,category:string): Promise<boolean> {
    try {
      console.log("HELLO\n\n")
      console.log(transcript);
      const response = await fetch('/api/chatSave', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, msgType, message,dateTimeId, transcript,category }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        return true;
      } else {
        console.error('Failed to append chat message');
        return false;
      }
    } catch (error) {
      console.error('Error:', error);
      return false;
    }
  }