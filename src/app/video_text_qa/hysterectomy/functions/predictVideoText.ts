export async function predictVideoText(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('video', file);
  
  
    try {
      // Replace this with your actual API call
      // return "Incision Phase: 0 - 91 seconds\n---------------------->Tools Used: Bonn Forceps, Hydro Cannula\n---------------------->Eye parts detected: Cornea, Iris\nViscous agent injection Phase: 92 - 102 seconds---------------------->\nTools Used: Hydro Cannula---------------------->\nEye parts detected: Cornea, Iris\nRhexis Phase: 103 - 124 seconds\n---------------------->Tools Used: Cap Cystotome\n---------------------->Eye parts detected: Cornea, Iris\nHydrodissection Phase: 125 - 156 seconds\n---------------------->Tools Used: Primary Knife\n---------------------->Eye parts detected: Cornea, Iris\nPhacoemulsificiation Phase: 157 - 231 seconds\n---------------------->Tools Used: Phaco Handpiece\n---------------------->Eye parts detected: Cornea, Lens fragments\nIrrigation and aspiration Phase: 232 - 271 seconds\n---------------------->Tools Used: A/I Handpiece\n---------------------->Eye parts detected: Cornea, Capsule\nCapsule polishing Phase: 272 - 283 seconds\n---------------------->Tools Used: Visco Cannula\n---------------------->Eye parts detected: Cornea, Capsule\nViscous agent injection Phase: 284 - 299 seconds\n---------------------->Tools Used: Lens Injector\n---------------------->Eye parts detected: Cornea, Iris\nLens implant setting-up Phase: 300 - 322 seconds\n---------------------->Tools Used: Rycroft Cannula, A/I Handpiece\n---------------------->Eye parts detected: Cornea, Lens implant\nViscous agent removal Phase: 323 - 354 seconds\n---------------------->Tools Used: Visco Cannula\n---------------------->Eye parts detected: Cornea, Lens implant\nTonifying and antibiotics Phase: 355 - 379 seconds\n---------------------->Tools Used: Visco Cannula\n---------------------->Eye parts detected: Cornea, Lens implant\n";
      const response = await fetch('http://127.0.0.1:8000/process_video_uterus', {
        method: 'POST',
        body: formData,
      });
      const videoOutputdata = await response.json();
      return videoOutputdata.message+"\n****************\n"+videoOutputdata.message2;
    } catch (error) {
      console.error('Error sending video to API:', error);
      return 'Error processing video';
    }
  }