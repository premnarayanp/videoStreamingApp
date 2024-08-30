
import express from 'express';
import passport from 'passport';
import userController from './user.controller.js';

const router = express.Router();

router.post('/signup', userController.signUp);
router.post('/login', userController.login);

export default router;