import React from 'react';
import { Volume2 } from 'lucide-react';

interface TextToSpeechInputProps {
  text: string;
  setText: (text: string) => void;
  onSpeak: () => void;
  isLoading: boolean;
}

export function TextToSpeechInput({ text, setText, onSpeak, isLoading }: TextToSpeechInputProps) {
  return (
    <div className="w-full space-y-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your text here to convert it into speech..."
        className="w-full h-32 p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-gray-50"
      />
      <button
        onClick={onSpeak}
        disabled={!text.trim() || isLoading}
        className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98]"
      >
        <Volume2 className="w-5 h-5" />
        {isLoading ? 'Generating Speech...' : 'Generate Speech'}
      </button>
    </div>
  );
}