import { Router } from 'express';
import authorization from '../middlewares/authorization.js'
import { list, deleteOne, getOne, create, update } from '../controllers/roleController.js';

import auth from '../middlewares/auth.js';

const roleRouter = Router()

roleRouter.get("/", auth, list)
roleRouter.post("/", auth, authorization('createRole'), create)
roleRouter.get("/:id", auth, authorization('getRole'), getOne)
roleRouter.put("/:id", auth, authorization('updateRole'), update)
roleRouter.delete("/:id", auth, authorization('deleteRole'), deleteOne)


export default roleRouter