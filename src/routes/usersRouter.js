import { Router } from 'express';
import authorization from '../middleware/authorization.js'
import auth from '../middleware/auth.js';
import { createUserAdmin, deleteUser, getUserById, getUsers, updateUser, assignRole } from '../controllers/usersController.js';

const usersRouter = Router()

usersRouter.get("/", auth, authorization('getUsers'), getUsers)
usersRouter.get("/:uid", authorization('getUser'), getUserById)
usersRouter.post("/", auth, authorization('createUser'), createUserAdmin)
usersRouter.put("/:uid", auth, authorization('updateUser'), updateUser)
usersRouter.delete("/:uid", auth, authorization('deleteUser'), deleteUser)
usersRouter.put("/role/:uid", auth, authorization('assignRole'), assignRole)


export default usersRouter