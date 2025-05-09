import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import cors from 'cors';
import { Server } from 'socket.io';
import connectDB from './config/db.js';

import alertRoutes from './routes/alert.routes.js';
import newsRoutes from './routes/news.routes.js'

dotenv.config();
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: '*' }
});

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/alerts', alertRoutes(io));
app.use('/api/news', newsRoutes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));