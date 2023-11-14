import express from 'express';
import { authenticate } from '../utilities/middlewares/auth';
import { loginUser, logoutUser, registerUser } from './auth.controller';

const authRoutes = express.Router();

authRoutes.post('/signup',registerUser);
authRoutes.post('/login', authenticate, loginUser);
authRoutes.get('/logout', logoutUser);

export default authRoutes;