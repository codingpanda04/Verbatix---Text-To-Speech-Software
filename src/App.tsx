import React, { useState, useEffect } from 'react';
import { TextToSpeechInput } from './components/TextToSpeech/TextToSpeechInput';
import { AudioPlayer } from './components/TextToSpeech/AudioPlayer';
import { VoiceSelector } from './components/TextToSpeech/VoiceSelector';
import { Header } from './components/Layout/Header';
import { generateSpeech, getAvailableVoices, VoiceOption } from './utils/speech';

function App() {
  const [text, setText] = useState('');
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [voices, setVoices] = useState<VoiceOption[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<VoiceOption | null>(null);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = getAvailableVoices();
      setVoices(availableVoices);
      
      if (availableVoices.length > 0 && !selectedVoice) {
        setSelectedVoice(availableVoices[0]);
      }
    };

    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    loadVoices();
  }, []);

  const handleSpeak = async () => {
    try {
      setIsLoading(true);
      const url = await generateSpeech(text, selectedVoice);
      setAudioUrl(url);
    } catch (error) {
      console.error('Error generating speech:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8 border border-gray-100">
          <Header />

          <VoiceSelector
            voices={voices}
            selectedVoice={selectedVoice}
            onVoiceSelect={setSelectedVoice}
          />

          <TextToSpeechInput
            text={text}
            setText={setText}
            onSpeak={handleSpeak}
            isLoading={isLoading}
          />

          <AudioPlayer audioUrl={audioUrl} />
        </div>
      </div>
    </div>
  );
}

export default App;