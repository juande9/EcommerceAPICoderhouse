import { Router } from 'express';
import { resetPassword, confirmPassReset } from '../controllers/emailController.js';

const emailRouter = Router()

emailRouter.get('/reset-password', resetPassword)
emailRouter.post('/confirm-password-change', confirmPassReset)

export default emailRouter