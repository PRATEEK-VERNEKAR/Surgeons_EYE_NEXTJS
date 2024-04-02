"use client";

import React, { useState, useEffect } from 'react';

const HomePage = () => {
  const text = "This is the text to be read out.";
  const [isReading, setIsReading] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    const loadVoices = () => {
      const voices = speechSynthesis.getVoices();
      setVoices(voices);
    };

    loadVoices();

    window.speechSynthesis.addEventListener('voiceschanged', loadVoices);

    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', loadVoices);
    };
  }, []);

  const readOutText = () => {
    setIsReading(true);
    const utterance = new SpeechSynthesisUtterance(text);
    const femaleVoice = voices.find(voice => voice.name.includes('Female'));
    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }
    speechSynthesis.speak(utterance);
    utterance.addEventListener('end', () => setIsReading(false));
  };

  return (
    <div>
      <p>{text}</p>
      <button onClick={readOutText} disabled={isReading}>
        {isReading ? 'Reading...' : 'Read Out Text'}
      </button>
    </div>
  );
};

export default HomePage;