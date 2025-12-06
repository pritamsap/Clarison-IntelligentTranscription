// Interface defines shape of request when someone wants transcribe audio
// Multer is a middleware for handling 
// Any object that wants to be transcriptionRequest must have an audio File
export interface TranscriptionRequest {
   // Audio File is Express Multer Type
    audioFile: Express.Multer.File;
  }
 
  // Response after transcribing request
  // Success whether transcription worked, transcript is a text which might or might not 
  export interface TranscriptionResponse {
    success: boolean;
    transcript?: string;
    error?: string;
  }
  
  // Cleaning Response for the cleaning the transcribed text
  export interface CleaningResponse {
    success: boolean;
    cleanedText?: string;
    error?: string;
  }
  

  // Full Response that includes raw and cleaned transcript
  export interface FullTranscriptResponse {
    success: boolean;
    rawTranscript?: string;
    cleanedTranscript?: string;
    error?: string;
  }