
import axios from 'axios'

const API_BASE_URL =  'http://localhost:5050/api';

// Export allows the function to be called by other files
// Audio Block is recording from the microphone, sends it to backend and receives string text
// Form data (HTML form) lets you send files to a server using multi part form
export const transcribeAudio = async (audioBlob: Blob): Promise<string> => {
    const formData = new FormData();
    // field name audio, the actual audio blob, filename we want to give it
    formData.append('audio', audioBlob, 'recording.webm');


    // Calling the POST route on backend
    const response = await axios.post(`${API_BASE_URL}/transcribe`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data.transcribe
}

// Cleaning the text from filler later on
export const cleanTranscript = async (transcript: string): Promise<string> => {
    const response = await axios.post(`${API_BASE_URL}/clean`, { transcript });
    return response.data.cleanedText
}
