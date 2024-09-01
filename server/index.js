import dotenv from "dotenv";
import express from "express";
import cors from 'cors';

import userRoutes from './src/features/user/user.routes.js';
// import Room from './src/features/room/room.schema.js'; // Uncomment if needed

dotenv.config();

const app = express();
// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true })); // Added extended option
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

export default app;