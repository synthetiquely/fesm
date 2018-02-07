interface IWindow extends Window {
  webkitSpeechRecognition: any;
  SpeechRecognition: any;
}

export interface SpeechEvent extends Event {
  results: any[];
}

export const initializeSpeechRecognition = () => {
  (<IWindow>window).SpeechRecognition =
    (<IWindow>window).SpeechRecognition ||
    (<IWindow>window).webkitSpeechRecognition;

  if ((<IWindow>window).SpeechRecognition) {
    const recognition = new (<IWindow>window).SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'ru-RU';
    return {
      recognition,
      hashVoiceSupport: true,
    };
  }
  return {
    recognition: null,
    hashVoiceSupport: false,
  };
};
