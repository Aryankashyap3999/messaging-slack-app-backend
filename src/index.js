import express from 'express';
import { StatusCodes } from 'http-status-codes';

// import { cors } from 'cors'; 
import bullServerAdapter from './config/bullBoardConfig.js';
import connectDB from './config/dbConfig.js';
import { PORT } from './config/serverConfig.js';
import apiRoutes from './routes/index.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}))

app.use('/ui', bullServerAdapter.getRouter());


app.get('/ping', (req, res) => {
  res.status(StatusCodes.OK).json({
    msg: 'pong',
  });
});

app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log('Server is running on port: ', PORT);
  connectDB(); 
});
