"use client"
import { useEffect, useState } from 'react';

const prompts = [
  'Tire Pressure for Left Front',
  'Tire Pressure for Right Front',
  'Tire Condition for Left Front – (Good, Ok, Needs Replacement)',
  'Tire Condition for Right Front – (Good, Ok, Needs Replacement)',
  'Tire Pressure for Left Rear',
  'Tire Pressure for Right Rear',
  'Tire Condition for Left Rear – (Good, Ok, Needs Replacement)',
  'Tire Condition for Right Rear – (Good, Ok, Needs Replacement)',
  'Overall Tire Summary: (<1000 characters)',
  'Attached images of each tire in the same order.'
];

const TireSection: React.FC = () => {
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [isReading, setIsReading] = useState(false);

  const readPrompt = (index: number) => {
    if (index < prompts.length) {
      const utterance = new SpeechSynthesisUtterance(prompts[index]);
      utterance.onend = () => setIsReading(false);
      window.speechSynthesis.speak(utterance);
      setIsReading(true);
    }
  };

  useEffect(() => {
    if (currentPromptIndex < prompts.length) {
      readPrompt(currentPromptIndex);
    }
  }, [currentPromptIndex]);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Your browser does not support speech recognition.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const speechToText = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');

      if (speechToText.toLowerCase().includes('done') && !isReading) {
        setCurrentPromptIndex(prevIndex => prevIndex + 1);
      }
    };

    recognition.start();

    return () => {
      recognition.stop();
    };
  }, [isReading]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Tire Section</h1>
      <p>Listening for the "done" command to proceed to the next prompt.</p>
      <p>{prompts[currentPromptIndex]}</p>
    </div>
  );
};

export default TireSection;
