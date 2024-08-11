"use client"
import { useEffect, useState } from 'react';

const prompts = {
  model: "Enter the model",
  inspectorName: "Enter the inspector name",
  inspectionEmployeeId: "Enter the inspection employee ID",
  date: "Enter the date",
  time: "Enter the time",
  location: "Enter the location",
  meterHours: "Enter the service meter hours",
  customerName: "Enter the customer name",
  catCustomerId: "Enter the CAT customer ID",
};

const keys = Object.keys(prompts) as Array<keyof typeof prompts>;

interface InspectionFormProps {
  onSaveData: (formData: FormData) => void;
}

const InspectionForm: React.FC<InspectionFormProps> = ({ onSaveData }) => {
    console.log('FormData:', "smriti");
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [isReading, setIsReading] = useState(false);
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
  const [formData, setFormData] = useState<FormData>(new FormData());
  const [transcript, setTranscript] = useState('');

  const readPrompt = (index: number) => {
    if (index < keys.length) {
        window.speechSynthesis.cancel(); 
      const utterance = new SpeechSynthesisUtterance(prompts[keys[index]]);
      utterance.onend = () => {
        setIsReading(false);
        setIsWaitingForResponse(true); // Start waiting for user response after reading the prompt
      };
      window.speechSynthesis.speak(utterance);
      setIsReading(true);
    }
  };

  useEffect(() => {
    if (currentPromptIndex < keys.length) {
      readPrompt(currentPromptIndex);
    } else {
      // If all prompts have been answered, save the form data
      onSaveData(formData);
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

      console.log('Speech to text:', speechToText);
       setTranscript(speechToText); 

      // If the user says "done," store the response and move to the next prompt
      if (speechToText.toLowerCase().includes('done') && isWaitingForResponse) {
        const response = speechToText.toLowerCase().replace('done', '').trim();
        formData.set(keys[currentPromptIndex], response);
        setCurrentPromptIndex(prevIndex => prevIndex + 1);
        setIsWaitingForResponse(false); // Stop waiting for user response
      }
    };

    recognition.start();

    return () => {
      recognition.stop();
    };
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Inspection Form</h1>
      <p>Answer the question, then say "done" to proceed to the next prompt.</p>
      <p>{transcript}</p>
      {currentPromptIndex < keys.length && <p>{prompts[keys[currentPromptIndex]]}</p>}
      {currentPromptIndex >= keys.length && <p>All prompts completed.</p>}
    </div>
  );
};

export default InspectionForm;
