import { Router } from 'express';
import { login, logout, signup } from '../controllers/sessionController.js';
import passport from 'passport';

const sessionRouter = Router()

sessionRouter.post("/login", login)
sessionRouter.post("/logout", logout)
sessionRouter.post("/signup", signup)
sessionRouter.post('/registerPassport', passport.authenticate('register', { failureRedirect: 'failRegister' }), async (req, res) => {
    const newUser = req.user
    res.status(201).send({ status: 'success', message: `${newUser.email} Registered`, payload: { ...newUser, password: undefined } })
})
sessionRouter.post('/loginPassport', passport.authenticate('login', { failureRedirect: 'failRegister' }), async (req, res) => {
    if (!req.user) res.status(400).send({ status: 'error', message: 'Invalid credentials' })

    req.session.user = {
        email: req.user.email,
    }

    res.send({ status: 'success', message: `${req.user.email} log in` })
})
sessionRouter.get('/failRegister', async (req, res) => {
    console.log('Failed registration')
    res.send({ error: 'Failed' })
})


export default sessionRouter