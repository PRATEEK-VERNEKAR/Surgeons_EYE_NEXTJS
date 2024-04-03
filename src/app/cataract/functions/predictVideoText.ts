export async function predictVideoText(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('video', file);
  
  
    try {
      // Replace this with your actual API call
      // return "Incision Phase: 0 - 91 seconds\n    * Tools Used: Bonn Forceps, Hydro Cannula\n    * Eye parts detected: Cornea, Iris\n    Viscous agent injection Phase: 92 - 102 seconds\n    * Tools Used: Hydro Cannula\n    * Eye parts detected: Cornea, Iris\n    Rhexis Phase: 103 - 124 seconds\n    * Tools Used: Cap Cystotome\n    * Eye parts detected: Cornea, Iris\n    Hydrodissection Phase: 125 - 156 seconds\n    * Tools Used: Primary Knife\n    * Eye parts detected: Cornea, Iris\n    Phacoemulsificiation Phase: 157 - 231 seconds\n    * Tools Used: Phaco Handpiece\n    * Eye parts detected: Cornea, Lens fragments\n    Irrigation and aspiration Phase: 232 - 271 seconds\n    * Tools Used: A/I Handpiece\n    * Eye parts detected: Cornea, Capsule\n    Capsule polishing Phase: 272 - 283 seconds\n    * Tools Used: Visco Cannula\n    * Eye parts detected: Cornea, Capsule\n    Viscous agent injection Phase: 284 - 299 seconds\n    * Tools Used: Lens Injector\n    * Eye parts detected: Cornea, Iris\n    Lens implant setting-up Phase: 300 - 322 seconds\n    * Tools Used: Rycroft Cannula, A/I Handpiece\n    * Eye parts detected: Cornea, Lens implant\n    Viscous agent removal Phase: 323 - 354 seconds\n    * Tools Used: Visco Cannula\n    * Eye parts detected: Cornea, Lens implant\n    Tonifying and antibiotics Phase: 355 - 379 seconds\n    * Tools Used: Visco Cannula\n    * Eye parts detected: Cornea, Lens implant\n";
      const response = await fetch('http://127.0.0.1:8000/process_video_cataract', {
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