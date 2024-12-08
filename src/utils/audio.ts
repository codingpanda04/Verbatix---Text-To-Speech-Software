export const downloadAudio = (audioUrl: string) => {
  const link = document.createElement('a');
  link.href = audioUrl;
  link.download = 'speech.mp3';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};