import { Router } from 'express';
import authorization from '../middlewares/authorization.js'
import auth from '../middlewares/auth.js';
import { createUserAdmin, deleteUser, getUserById, getUsers, updateUser, assignRole } from '../controllers/usersController.js';

const usersRouter = Router()

usersRouter.get("/", getUsers)
usersRouter.get("/:uid", auth, authorization('getUser'), getUserById)
usersRouter.post("/", auth, authorization('createUser'), createUserAdmin)
usersRouter.put("/:uid", auth, authorization('updateUser'), updateUser)
usersRouter.delete("/:uid", auth, authorization('deleteUser'), deleteUser)
usersRouter.put("/role/:uid", auth, authorization('assignRole'), assignRole)


export default usersRouter