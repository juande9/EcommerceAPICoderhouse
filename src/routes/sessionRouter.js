import { Router } from 'express';
import { login, signup, current } from '../controllers/sessionController.js';

import auth from '../middleware/auth.js';

const sessionRouter = Router()

sessionRouter.post("/login", login)
sessionRouter.post("/signup", signup)
sessionRouter.get('/current', auth, current)

export default sessionRouter