import { useState } from 'react';
import { AudioRecorder } from './components/AudioRecorder';
import { TranscriptDisplay } from './components/transcriptDisplay';
import './App.css';

function App() {

  // Simple states to update transcript both raw and clean.
  const [rawTranscript, setRawTranscript] = useState('');
  const [cleanedTranscript, setCleanedTranscript] = useState('');

  const handleTranscriptReceived = (transcript: string) => {
    setRawTranscript(transcript);
    // TODO: Call cleaning API
    setCleanedTranscript('Cleaned version coming soon!');
  };

  // AudioRecorder with parameter component
  // TranscriptDisplay Component
  return (
    <div className="App">
      <header className="app-header">
        <h1>🎙️ Clarison</h1>
        <p>Intelligent Transcript For You</p>
      </header>

      <main className="app-main">

        <AudioRecorder onTranscriptReceived={handleTranscriptReceived} />
        <TranscriptDisplay 
          rawTranscript={rawTranscript}
          cleanedTranscript={cleanedTranscript}
        />
      </main>
    </div>
  );
}

export default App;