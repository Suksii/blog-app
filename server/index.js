import express from 'express';
import cors from 'cors';
import postRoutes from './routes/posts.js'
import authRoutes from './routes/auth.js'
import userRoutes from  './routes/users.js'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
app.use(express.json());
app.use(cookieParser());

dotenv.config();

app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);



app.listen(3001, () => {
    console.log('Server is running on port 3001');
});