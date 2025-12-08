// Making two interface
// result of the transcript which is a raw uncleaned Transcript
export interface TranscriptResult {
    rawTranscript: string,
    cleanedTranscript: string
}


// Response from the api
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}

