import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './database';
import rotas from './routes/rotas';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api', rotas);

connectDB();
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});