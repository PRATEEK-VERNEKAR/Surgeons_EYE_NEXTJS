export async function predictVideoText(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('video', file);
  
  
    try {
      // Replace this with your actual API call
      // return "Preparation Phase: 0 - 36 seconds \n\n     Tools Used: Bonn Forceps, Hydro Cannula \n\n     Eye parts detected: Cornea, Iris \n\n\n    \nCalotTriangle Dissection Phase: 37 - 629 seconds \n\n     Tools Used: Hydro Cannula \n\n     Eye parts detected: Cornea, Iris \n\n\n    \nClipping Cutting Phase: 630 - 966 seconds \n\n     Tools Used: Cap Cystotome \n\n     Eye parts detected: Cornea, Iris \n\n\n    \nGallbladder Dissection Phase: 967 - 1430 seconds \n\n     Tools Used: Primary Knife \n\n     Eye parts detected: Cornea, Iris \n\n\n    \nGallbladder Packaging Phase: 1431 - 1567 seconds \n\n     Tools Used: Phaco Handpiece \n\n     Eye parts detected: Cornea, Lens fragments \n\n\n    \nCleaning Coagulation Phase: 1568 - 1648 seconds \n\n     Tools Used: A/I Handpiece \n\n     Eye parts detected: Cornea, Capsule \n\n\n    \nGallbladder Retraction Phase: 1649 - 1734 seconds \n\n     Tools Used: Visco Cannula \n\n     Eye parts detected: Cornea, Capsule \n\n\n    \n"
      const response = await fetch('http://127.0.0.1:8000/process_video_cholec', {
        method: 'POST',
        body: formData,
      });
      const videoOutputdata = await response.json();
      return videoOutputdata.message;
    } catch (error) {
      console.error('Error sending video to API:', error);
      return 'Error processing video';
    }
  }