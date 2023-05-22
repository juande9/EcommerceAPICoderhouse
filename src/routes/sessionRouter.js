import { Router } from 'express';
import { login, logout, signup, signupPassport, loginPassport, fail } from '../controllers/sessionController.js';
import passport from 'passport';

const sessionRouter = Router()

sessionRouter.post("/login", login)
sessionRouter.post("/logout", logout)
sessionRouter.post("/signup", signup)
sessionRouter.post('/registerPassport', passport.authenticate('register', { failureRedirect: 'failPassport' }), signupPassport)
sessionRouter.post('/loginPassport', passport.authenticate('login', { failureRedirect: 'failPassport' }), loginPassport)
sessionRouter.get('/failPassport', fail)

export default sessionRouter