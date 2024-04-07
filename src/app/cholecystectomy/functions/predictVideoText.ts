export async function predictVideoText(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('video', file);
  
  
    try {
      // Replace this with your actual API call
      // return "Preparation Phase: 0 - 36 seconds \n\n     Tools Used: Bonn Forceps, Hydro Cannula \n\n     Eye parts detected: Cornea, Iris \n\n\n    \nCalotTriangle Dissection Phase: 37 - 629 seconds \n\n     Tools Used: Hydro Cannula \n\n     Eye parts detected: Cornea, Iris \n\n\n    \nClipping Cutting Phase: 630 - 966 seconds \n\n     Tools Used: Cap Cystotome \n\n     Eye parts detected: Cornea, Iris \n\n\n    \nGallbladder Dissection Phase: 967 - 1430 seconds \n\n     Tools Used: Primary Knife \n\n     Eye parts detected: Cornea, Iris \n\n\n    \nGallbladder Packaging Phase: 1431 - 1567 seconds \n\n     Tools Used: Phaco Handpiece \n\n     Eye parts detected: Cornea, Lens fragments \n\n\n    \nCleaning Coagulation Phase: 1568 - 1648 seconds \n\n     Tools Used: A/I Handpiece \n\n     Eye parts detected: Cornea, Capsule \n\n\n    \nGallbladder Retraction Phase: 1649 - 1734 seconds \n\n     Tools Used: Visco Cannula \n\n     Eye parts detected: Cornea, Capsule \n\n\n    \n"
      // return "Preparation Phase: 0 - 29 seconds --------------------->Tools Used: Grasper --------------------->arts detected: Liver, Gallbladder CalotTriangle Dissection Phase: 30 - 599 seconds --------------------->Tools Used: Grasper, Hook, Irrigator --------------------->arts detected: Gallbladder Clipping Cutting Phase: 600 - 959 seconds --------------------->Tools Used: Grasper, Clipper, Scissors --------------------->arts detected: Gallbladder, Fat Gallbladder Dissection Phase: 960 - 1439 seconds --------------------->Tools Used: Grasper, Bipolar --------------------->arts detected: Gallbladder Gallbladder Packaging Phase: 1440 - 1579 seconds --------------------->Tools Used: Grasper, Specimenbag --------------------->arts detected: Gallbladder Cleaning Coagulation Phase: 1580 - 1649 seconds --------------------->Tools Used: Grasper, Bipolar, Irrigator --------------------->arts detected: Liver,Gallbladder Gallbladder Retraction Phase: 1650 - 1734 seconds --------------------->Tools Used: Grapser, Bipolar, Irrigator --------------------->arts detected: Gallbladder"
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