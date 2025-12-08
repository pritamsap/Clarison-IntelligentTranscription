

// We Still want the transcript text 
interface TranscriptDisplayProps {
    // Unedited Output
    rawTranscript: string;
    // Edited Output
    cleanedTranscript: string;
  }
  

  // Display transcript raw or cleaned component with parameter
  export const TranscriptDisplay = ({ rawTranscript, cleanedTranscript }: TranscriptDisplayProps) => {
    const copyToClipboard = (text: string) => {
      navigator.clipboard.writeText(text);
      alert('Copied to clipboard!');
    };
  
    return (
      <div className="transcript-display">
        {rawTranscript && (
          <div className="transcript-section">
            <div className="section-header">
              <h3>Raw Transcript</h3>
              <button 
                onClick={() => copyToClipboard(rawTranscript)}
                className="btn btn-small"
              >
                📋 Copy
              </button>
            </div>
            <div className="transcript-content">
              {rawTranscript}
            </div>
          </div>
        )}
  
        {cleanedTranscript && (
          <div className="transcript-section">
            <div className="section-header">
              <h3>Cleaned Transcript</h3>
              <button 
                onClick={() => copyToClipboard(cleanedTranscript)}
                className="btn btn-small"
              >
                📋 Copy
              </button>
            </div>
            <div className="transcript-content cleaned">
              {cleanedTranscript}
            </div>
          </div>
        )}
      </div>
    );
  };