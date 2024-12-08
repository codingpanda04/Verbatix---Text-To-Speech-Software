export interface VoiceOption {
  voice: SpeechSynthesisVoice;
  name: string;
  lang: string;
}

export function getAvailableVoices(): VoiceOption[] {
  return window.speechSynthesis.getVoices()
    .filter(voice => voice.lang.startsWith('en-'))
    .map(voice => ({
      voice,
      name: voice.name,
      lang: voice.lang
    }));
}

export async function generateSpeech(text: string, selectedVoice?: VoiceOption | null): Promise<string> {
  return new Promise((resolve, reject) => {
    const utterance = new SpeechSynthesisUtterance(text);
    
    if (selectedVoice) {
      utterance.voice = selectedVoice.voice;
    } else {
      // Fallback to first available English voice
      const voices = window.speechSynthesis.getVoices();
      const englishVoice = voices.find(voice => voice.lang.startsWith('en-'));
      if (englishVoice) {
        utterance.voice = englishVoice;
      }
    }

    utterance.onend = () => {
      const blob = new Blob([text], { type: 'audio/mp3' });
      const url = URL.createObjectURL(blob);
      resolve(url);
    };

    utterance.onerror = () => {
      reject(new Error('Speech synthesis failed'));
    };

    window.speechSynthesis.speak(utterance);
  });
}