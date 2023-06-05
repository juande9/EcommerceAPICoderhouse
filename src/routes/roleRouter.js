import { Router } from 'express';
import { list, deleteOne, getOne, create, update } from '../controllers/roleController.js';

import auth from '../middleware/auth.js';
import authorization from '../middleware/authorization.js';

const roleRouter = Router()

roleRouter.get("/", list)
roleRouter.post("/", auth, authorization('createRole'), create)
roleRouter.get("/:id", auth, authorization('getRole'), getOne)
roleRouter.put("/:id", auth, authorization('updateeRole'), update)
roleRouter.delete("/:id", auth, authorization('deleteRole'), deleteOne)


export default roleRouter