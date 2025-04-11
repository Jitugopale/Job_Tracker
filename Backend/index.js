import express from 'express'
import connectToMongo from './db.js';
import cors from 'cors'; 
import router from './routes/JobtrackerRoute.js';
const app = express();

const PORT = process.env.PORT || 4000;
app.use(cors({
    origin: '*', // allow localhost and your frontend domain
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'auth-token','token'], // Include your custom headers here
  }));
app.use(express.json()); 


connectToMongo();

app.use('/api/jobs', router);

app.listen(PORT,()=>{
    console.log(`Server running on port no${PORT}`)
})