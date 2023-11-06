import { AudioRecorder, Client, SpeechRecognizer } from '@jovotech/client-web';
import { action, computed, configure, makeObservable, observable } from 'mobx';

configure({
  enforceActions: 'never',
});

const client = new Client('http://localhost:3000/webhook', {
  input: {
    audioRecorder: {
      startDetection: {
        enabled: false,
      },
      silenceDetection: {
        enabled: false,
      },
    },
    speechRecognizer: {
      lang: 'en',
      startDetection: {
        enabled: false,
      },
      silenceDetection: {
        enabled: false,
      },
    },
  },
  output: {
    reprompts: {
      enabled: false,
    },
  },
  store: {
    shouldPersistSession: false,
  },
});

makeObservable<AudioRecorder & any>(client.audioRecorder, {
  initialized: observable,
  isInitialized: computed,
  initialize: action,
  recording: observable,
  isRecording: computed,
  start: action,
  stop: action,
  abort: action,
});

makeObservable<SpeechRecognizer & any>(client.speechRecognizer, {
  recording: observable,
  isRecording: computed,
  start: action,
  stop: action,
  abort: action,
  setupSpeechRecognition: action,
});

export default makeObservable<Client & any>(client, {
  initialized: observable,
  isInitialized: computed,
  initialize: action,
  audioRecorder: observable.deep,
  speechRecognizer: observable.deep,
}) as Client;