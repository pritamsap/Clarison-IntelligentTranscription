
import { TranscriptionResponse } from '../types';
import express, { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';

// making a sub router application
const router = express.Router();

// Configure multer for file uploads
// Multer is a middleware for handing multipart form data used for uploading files in forms
const storage = multer.diskStorage({
    // where to save the file
    // req : incoming req, file : file being uploaded
    // cb: call back function to tell multer where to save the file
    destination: (req, file, cb) => {
        // calculates the folder path to save the file
        cb(null, path.join(__dirname, '../uploads'));
    },

    // Decides what to name the uploaded file
    filename: (req, file, cb) => {
        // creating unique file name
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, 'audio-'  + uniqueSuffix + path.extname(file.originalname));
    }
});


// handles file uploads
const upload = multer({
  // storage object defined earlier
  storage,
  limits: { fileSize: 25 * 1024 * 1024 }, // 25MB limit

  // Func decides which files are allowed to be uploaded
  fileFilter: (req, file, cb) => {
    const allowedTypes = /wav|mp3|webm|ogg|m4a/;
    const allowedMime = /audio\/(wav|mpeg|mp3|ogg|webm|x-m4a|mp4)/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    
    // check if mime type like 'wav' matches allowed type
    const mimetype = allowedMime.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true); // accept file
    } else {
      cb(new Error('Only audio files are allowed!')); //reject file
    }
  },
});


// POST /api/transcribe to upload and transcribe audio
// Single is a multer method to handle single file upload
router.post('/transcribe', upload.single('audio'), async (req: Request, res: Response) => {
    try{
        if (!req.file) {
            return res.status(400).json({
                success: false,
                error: "No Audio file was given"
            });
        }
        console.log('File successfully received: ', req.file.filename);

        // Todo for later Implement Whisper Transcription
        // Later


        // For Now, return temp mock data
        const mockTranscript = "This is a mock script. AI integration integrating soon."

        // Response Interface Transcription Response
        // Create an actual object
        const response: TranscriptionResponse =  {
            success: true,
            transcript: mockTranscript,
        };
        res.json(response)
    } catch (error) {
        console.error('Transcription error:', error);
        res.status(500).json({
            success: false,
            error: 'Transcription failed',
        });
    }
});

export default router;