import { Router } from 'express';
import auth from '../middleware/auth.js';
import { createUser, deleteUser, getUserById, getUsers, updateUser } from '../controllers/usersController.js';

const usersRouter = Router()

usersRouter.get("/", getUsers)
usersRouter.get("/:uid", getUserById)
usersRouter.post("/", auth, createUser)
usersRouter.put("/:uid", updateUser)
usersRouter.delete("/:uid", deleteUser)


export default usersRouter