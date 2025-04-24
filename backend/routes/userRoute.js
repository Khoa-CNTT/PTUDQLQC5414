import express from 'express';
import { registerUser, loginUser, adminLogin, forgotPassword, resetPassword, getProfileUser, putProfileUser, getAccount, addAccount, getUpdateAccountId, putUpdateAccountId, removeAccount } from '../controllers/userController.js';
import authUser from '../middlewares/authUser.js';
import adminAuth from '../middlewares/adminAuth.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/admin', adminLogin)
userRouter.post('/forgot-password', forgotPassword);
userRouter.post('/reset-password', resetPassword);
userRouter.get('/profile', authUser, getProfileUser);
userRouter.put('/profile', authUser, putProfileUser);
//admin
//get
userRouter.get('/account', adminAuth, getAccount);
//post
userRouter.post('/add', adminAuth, addAccount);
//put
userRouter.get('/update/:id/edit', adminAuth, getUpdateAccountId);
userRouter.put('/update/:id', adminAuth, putUpdateAccountId);
//delete
userRouter.delete('/remove', adminAuth, removeAccount);

export default userRouter;