import dotenv from "dotenv";
import express from "express";
import cors from 'cors';
import passportJWT from './src/config/passport-jwt-strategy.js';

import userRoutes from './src/features/user/user.routes.js';
import roomRoutes from './src/features/room/room.routes.js';

dotenv.config();

const app = express();
// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true })); // Added extended option
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/rooms', roomRoutes);
export default app;