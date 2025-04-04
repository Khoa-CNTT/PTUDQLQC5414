import express from 'express';
import { registerUser, loginUser, forgotPassword, resetPassword, getProfileUser, putProfileUser } from '../controllers/userController.js';
import authUser from '../middlewares/authUser.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/forgot-password', forgotPassword);
userRouter.post('/reset-password', resetPassword);
userRouter.get('/profile', authUser, getProfileUser);
userRouter.put('/profile', authUser, putProfileUser);

export default userRouter;