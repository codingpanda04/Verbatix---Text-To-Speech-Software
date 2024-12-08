import React from 'react';
import { Download } from 'lucide-react';
import { downloadAudio } from '../../utils/audio';

interface AudioPlayerProps {
  audioUrl: string | null;
}

export function AudioPlayer({ audioUrl }: AudioPlayerProps) {
  if (!audioUrl) return null;

  return (
    <div className="w-full space-y-4">
      <audio controls className="w-full">
        <source src={audioUrl} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
      <button
        onClick={() => downloadAudio(audioUrl)}
        className="flex items-center justify-center gap-2 w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
      >
        <Download className="w-5 h-5" />
        Download MP3
      </button>
    </div>
  );
}