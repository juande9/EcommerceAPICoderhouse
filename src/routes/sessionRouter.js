import { Router } from 'express';
import auth from '../middleware/auth.js';
import { newSessionPublic, newSessionPrivate, login, logout } from '../controllers/sessionController.js';

const sessionRouter = Router()

sessionRouter.get("/public", newSessionPublic)
sessionRouter.get("/private", auth, newSessionPrivate)
sessionRouter.post("/login", login)
sessionRouter.post("/logout", logout)


export default sessionRouter