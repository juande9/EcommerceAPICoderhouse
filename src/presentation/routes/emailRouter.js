import { Router } from 'express';
import { resetPassword, confirmPassReset, ticketConfirmation } from '../controllers/emailController.js';

const emailRouter = Router()

emailRouter.get('/testEmail', ticketConfirmation)
emailRouter.get('/reset-password', resetPassword)
emailRouter.post('/confirm-password-change', confirmPassReset)

export default emailRouter