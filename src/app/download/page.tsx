// "use client";

// import React from 'react';
// import { downloadTextAsPdf } from './downloadHelpers'; // Import the function

// const DownloadButton = () => {
//   const text = 'abc................'; // Replace with your actual text

//   const handleDownload = () => {
//     downloadTextAsPdf(text);
//   };

//   return (
//     <button onClick={handleDownload}>Download as PDF</button>
//   );
// };

// export default DownloadButton;


import React from 'react';

const text = `Incision Phase: 0 - 91 seconds \n    * Tools Used: Bonn Forceps, Hydro Cannula \n    * Eye parts detected: Cornea, Iris \nViscous agent injection Phase: 92 - 102 seconds \n    * Tools Used: Hydro Cannula \n    * Eye parts detected: Cornea, Iris \nRhexis Phase: 103 - 124 seconds \n    * Tools Used: Cap Cystotome \n    * Eye parts detected: Cornea, Iris \nHydrodissection Phase: 125 - 156 seconds \n    * Tools Used: Primary Knife \n    * Eye parts detected: Cornea, Iris \nPhacoemulsificiation Phase: 157 - 231 seconds \n    * Tools Used: Phaco Handpiece \n    * Eye parts detected: Cornea, Lens fragments \nIrrigation and aspiration Phase: 232 - 271 seconds \n    * Tools Used: A/I Handpiece \n    * Eye parts detected: Cornea, Capsule \nCapsule polishing Phase: 272 - 283 seconds \n    * Tools Used: Visco Cannula \n    * Eye parts detected: Cornea, Capsule \nViscous agent injection Phase: 284 - 299 seconds \n    * Tools Used: Lens Injector \n    * Eye parts detected: Cornea, Iris \nLens implant setting-up Phase: 300 - 322 seconds \n    * Tools Used: Rycroft Cannula, A/I Handpiece \n    * Eye parts detected: Cornea, Lens implant \nViscous agent removal Phase: 323 - 354 seconds \n    * Tools Used: Visco Cannula \n    * Eye parts detected: Cornea, Lens implant \nTonifying and antibiotics Phase: 355 - 379 seconds \n    * Tools Used: Visco Cannula \n    * Eye parts detected: Cornea, Lens implant`;

const Paragraphs = () => {
  const paragraphs = text.split('\n'); // Split the text into paragraphs

  return (
    <div>
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
  );
};

export default Paragraphs;
