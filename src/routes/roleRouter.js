import { Router } from 'express';
import { list, deleteOne, getOne, create, update } from '../controllers/roleController.js';

import auth from '../middleware/auth.js';

const roleRouter = Router()

roleRouter.get("/", list)
roleRouter.post("/", auth, create)
roleRouter.get("/:id", auth, getOne)
roleRouter.put("/:id", auth, update)
roleRouter.delete("/:id", auth, deleteOne)


export default roleRouter