
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv'


dotenv.config();


// Initialize the App with express
const app: Express = express()
const PORT = process.env.PORT || 5050;


// Allow frontend to access the routes
app.use(cors());

// Enables JSON body parsing from POST, PUT into req
app.use(express.json());

// GET Route 
app.get("/transcribe", (req: Request, res: Response) => {
  res.json({ message: 'Clarison is running!' });
});



// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});




