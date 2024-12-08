import React from 'react';
import { VoiceOption } from '../../utils/speech';
import { Mic2 } from 'lucide-react';

interface VoiceSelectorProps {
  voices: VoiceOption[];
  selectedVoice: VoiceOption | null;
  onVoiceSelect: (voice: VoiceOption) => void;
}

export function VoiceSelector({ voices, selectedVoice, onVoiceSelect }: VoiceSelectorProps) {
  const englishVoices = voices.filter(voice => voice.lang.startsWith('en-'));
  
  const getVoiceCategory = (voice: VoiceOption) => {
    const lang = voice.lang.toLowerCase();
    if (lang.includes('us')) return '🇺🇸 American';
    if (lang.includes('gb')) return '🇬🇧 British';
    if (lang.includes('au')) return '🇦🇺 Australian';
    if (lang.includes('ca')) return '🇨🇦 Canadian';
    return '🌐 Other English';
  };

  const groupedVoices = englishVoices.reduce((acc, voice) => {
    const category = getVoiceCategory(voice);
    if (!acc[category]) acc[category] = [];
    acc[category].push(voice);
    return acc;
  }, {} as Record<string, VoiceOption[]>);

  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
        <Mic2 className="w-4 h-4" />
        Select Voice
      </label>
      <select
        value={selectedVoice?.name || ''}
        onChange={(e) => {
          const selected = voices.find(v => v.name === e.target.value);
          if (selected) onVoiceSelect(selected);
        }}
        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="">Select a voice</option>
        {Object.entries(groupedVoices).map(([category, categoryVoices]) => (
          <optgroup key={category} label={category}>
            {categoryVoices.map(voice => (
              <option key={voice.name} value={voice.name}>
                {voice.name}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    </div>
  );
}