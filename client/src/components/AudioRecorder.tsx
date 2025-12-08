

// This file is a React Component being made
// TSX File allowing for input of React Components with TypeScript Compatible
import { useState, useRef } from 'react';

// API exported to turn audio into text
import { transcribeAudio } from '../services/api';

// Use Ref to store MediaRecorder and audio chunks

// Creating interface AudioRecorderProps

// This is an Prop
interface AudioRecorderProps {
    onTranscriptReceived: (transcript: string) => void;
}

// Exporting it into components
// Creating a component AudioRecorder
// This component receives a prop (parameter) transcript (which is the string)
export const AudioRecorder = ({ onTranscriptReceived }: AudioRecorderProps) => {
  // Tracks when recording is one or ff
  const [isRecording, setIsRecording] = useState(false);

  //Tracks when the app is sending audio to API
  const [isProcessing, setIsProcessing] = useState(false);

  // Use Ref do not render the component.
  // Media Recorder is an object
  // MediaRecorder is like built tool that records video and audio from microphone
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  // list of audio pieces 
  const audioChunksRef = useRef<Blob[]>([]);

  // Starting recording
  const startRecording = async () => {
    try {

      // Get Microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // Create Media Recorder
      const mediaRecorder = new MediaRecorder(stream);
      

      // save current instance in mediaRecorderRef 
      mediaRecorderRef.current = mediaRecorder;
      //Reset Audio Chunks
      audioChunksRef.current = [];


      // Recorder sends data in fragments (chunks)
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      // When user stops recording 
      // Combine chunks into one file
      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        await handleTranscription(audioBlob);
        
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
      };

      // Start recording 
      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
      alert('Could not access microphone. Please check permissions.');
    }
  };



  // Stop Recording
  // trigger onStop callback above
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };


  // Transcribe the audio
  // Pass the audio to transcribeAudio exported route from the service
  const handleTranscription = async (audioBlob: Blob) => {
    // Send isProcessing to true
    setIsProcessing(true);
    try {
      const transcript = await transcribeAudio(audioBlob);
      onTranscriptReceived(transcript);
    } catch (error) {
      console.error('Transcription error:', error);
      alert('Failed to transcribe audio. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="audio-recorder">
      <div className="controls">
        {!isRecording && !isProcessing && (
          <button onClick={startRecording} className="btn btn-primary">
            🎤 Start Recording
          </button>
        )}
        
        {isRecording && (
          <button onClick={stopRecording} className="btn btn-danger">
            ⏹️ Stop Recording
          </button>
        )}
        
        {isProcessing && (
          <div className="processing">
            <span>⏳ Processing audio...</span>
          </div>
        )}
      </div>
      
      {isRecording && (
        <div className="recording-indicator">
          <span className="pulse">🔴 Recording...</span>
        </div>
      )}
    </div>
  );
};