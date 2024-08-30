import dotenv from "dotenv";
import express from "express";
import cors from 'cors'
import userRoutes from './src/features/user/user.routes.js';

dotenv.config();

const app = express();
app.use(cors());

// use post request  url
app.use(express.urlencoded());

//for json req/res
app.use(express.json());

app.use('/api/users', userRoutes);

export default app;