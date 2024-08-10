// src/global.d.ts or another location for type declarations

interface SpeechRecognitionResult {
    // Extend SpeechRecognitionResult if needed
  }
  
  interface SpeechRecognitionResultList extends Array<SpeechRecognitionResult> {}
  
  interface SpeechRecognitionEvent extends Event {
    results: SpeechRecognitionResultList;
  }
  
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof webkitSpeechRecognition;
  }
  