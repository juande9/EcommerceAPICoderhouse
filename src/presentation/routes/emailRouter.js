import { Router } from 'express';
import { sendEmail, resetPassword, confirmPassReset } from '../controllers/emailController.js';

const emailRouter = Router()

emailRouter.get("/", sendEmail)
emailRouter.get('/reset-password', resetPassword)
emailRouter.post('/confirm-password-change', confirmPassReset)

export default emailRouter