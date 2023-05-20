import { Router } from 'express';
import { login, logout, signup } from '../controllers/sessionController.js';
import passport from 'passport';

const sessionRouter = Router()

sessionRouter.post("/login", login)
sessionRouter.post("/logout", logout)
sessionRouter.post("/signup", signup)
sessionRouter.post('/registerPassport', passport.authenticate('register', { failureRedirect: 'failRegister' }), async (req, res) => {
    res.send({ status: 'success', message: `User Registered` })
})
sessionRouter.get('/failRegister', async (req, res) => {
    console.log('Failed registration')
    res.send({ error: 'Failed' })
})


export default sessionRouter