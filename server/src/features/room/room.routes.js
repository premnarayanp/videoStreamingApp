
import express from 'express';
import passport from 'passport';
import roomController from './room.controller.js';

const router = express.Router();

router.post('/create', passport.authenticate('jwt', { session: false }), roomController.createRoom);
router.get('/my-rooms', passport.authenticate('jwt', { session: false }), roomController.getMyRooms);

export default router;