import { Router } from 'express';
import auth from '../middleware/auth.js';
import { createUserAdmin, deleteUser, getUserById, getUsers, updateUser } from '../controllers/usersController.js';

const usersRouter = Router()

usersRouter.get("/", getUsers)
usersRouter.get("/:uid", getUserById)
usersRouter.post("/", auth, createUserAdmin)
usersRouter.put("/:uid", auth, updateUser)
usersRouter.delete("/:uid", auth, deleteUser)


export default usersRouter