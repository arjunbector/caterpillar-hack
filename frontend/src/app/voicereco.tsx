"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const VoiceActivation: React.FC = () => {
  const [transcript, setTranscript] = useState<string>('');
  const [isListening, setIsListening] = useState<boolean>(true);
  const [isActivated, setIsActivated] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const speechSynthesis = window.speechSynthesis;
    
    if (!SpeechRecognition) {
      alert('Your browser does not support speech recognition.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = async (event: SpeechRecognitionEvent) => {
      const speechToText = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');


      console.log("speechtotext",speechToText);

      setTranscript(speechToText);

      if (speechToText.toLowerCase().includes('go to tire section')) {
        setIsActivated(true);
        const utterance = new SpeechSynthesisUtterance('done');
        speechSynthesis.speak(utterance);
        await handleNavigation(speechToText.toLowerCase());
      }

      if (isActivated) {
        console.log("hereeeeeeee")
        await handleNavigation(speechToText.toLowerCase());
      }
    };

    recognition.onend = () => {
      if (isListening) {
        recognition.start();
      }
    };

    recognition.start();

    return () => {
      recognition.stop();
    };
  }, [isListening, isActivated]);

  const handleNavigation = async (command: string) => {
    try {
      console.log("tttttttttttt")
      console.log("command",command)
      // Send command to server-side API to get embeddings and query Pinecone
      const response = await fetch('/api/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ command }),
      });
      const data = await response.json();


      console.log("dara",data)

      if (data.command) {
        switch (data.command) {
          case 'go to tire section':
            console.log("hereeeeeeee")
            router.push('/tire');
            break;
          case 'go to about page':
            router.push('/about');
            break;
          case 'go to contact page':
            router.push('/contact');
            break;
          default:
            const utterance = new SpeechSynthesisUtterance('Command not recognized.');
            window.speechSynthesis.speak(utterance);
        }
      } else {
        const utterance = new SpeechSynthesisUtterance('Command not recognized.');
        window.speechSynthesis.speak(utterance);
      }
    } catch (error) {
      console.error('Error handling navigation:', error);
      const utterance = new SpeechSynthesisUtterance('Error processing command.');
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Voice Activation Example</h1>
      {isActivated ? (
        <p>Voice feature activated! You can now proceed with the next action.</p>
      ) : (
        <p>Listening for the activation phrase: "Hello"</p>
      )}
      <p>{transcript}</p>
    </div>
  );
};

export default VoiceActivation;
