import express from 'express';
import { StatusCodes } from 'http-status-codes';

import connectDB from './config/dbConfig.js';
// import { cors } from 'cors'; 
import { PORT } from './config/serverConfig.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}))

// app.use(cors());


app.get('/ping', (req, res) => {
  res.status(StatusCodes.OK).json({
    msg: 'pong',
  });
});

app.listen(PORT, () => {
  console.log('Server is running on port: ', PORT);
  connectDB(); 
});
