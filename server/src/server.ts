
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import path from 'path';
import fs from 'fs'
import transcriptRoutes from './routes/transcription.routes'


dotenv.config();


// Initialize the App with express
const app: Express = express()
const PORT = process.env.PORT || 5050;

// Middleware
// Allow frontend to access the routes
app.use(cors());

// Enables JSON body parsing from POST, PUT into req
app.use(express.json());
// Built in middleware parsing url encoded data
app.use(express.urlencoded({ extended: true }));


// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
// check if the folder exist if not make it creating nested files sync
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// GET Route 
app.get("/api/health", (req: Request, res: Response) => {
    res.json({
        message: 'Clarison is running!' 
    });
});

app.use('/api', transcriptRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});




