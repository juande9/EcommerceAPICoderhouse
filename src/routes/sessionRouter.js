import { Router } from 'express';
import { login, logout, signup, signupPassport, loginPassport, fail, loginJwt, currentJwt, signupJwt } from '../controllers/sessionController.js';
import passport from 'passport';
import auth from '../middleware/auth.js';

const sessionRouter = Router()

sessionRouter.post("/login", login)
sessionRouter.post("/logout", logout)
sessionRouter.post("/signup", signup)
sessionRouter.post('/registerPassport', passport.authenticate('register', { failureRedirect: 'failPassport' }), signupPassport)
sessionRouter.post('/loginPassport', passport.authenticate('login', { failureRedirect: 'failPassport' }), loginPassport)
sessionRouter.get('/failPassport', fail)
sessionRouter.get('/github', passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => { });
sessionRouter.get('/github-callback', passport.authenticate('github', { failureRedirect: '/login' }), async (req, res) => {
    req.session.user = req.user;
    console.log(req.user);
    res.redirect('');
})
sessionRouter.get("/", async (req, res) => {
    res.render("home")
})
sessionRouter.get("/login", async (req, res) => {
    res.render("login")
})

sessionRouter.post('/loginJwt', loginJwt)
sessionRouter.get('/currentJwt', auth, currentJwt)
sessionRouter.post('/signupJwt', signupJwt)

export default sessionRouter