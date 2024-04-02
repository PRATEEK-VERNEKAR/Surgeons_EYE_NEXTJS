export async function appendChatMessage(email: string, msgType: string, message: string, dateTimeId:string,transcript: string): Promise<boolean> {
    try {
      const response = await fetch('/api/chatSave', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, msgType, message,dateTimeId, transcript }),
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