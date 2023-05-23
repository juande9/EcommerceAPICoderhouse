import UsersManager from "../managers/UsersManager.js";
import { idValidationUser } from "../middleware/idValidation.js";
import userDataValidation from "../middleware/userValidation.js";

export const getUsers = async (req, res) => {
    try {
        const manager = new UsersManager();
        const params = req.query
        const users = await manager.getUsers(params, req)
        res.status(200).send({ status: "success", payload: users.docs, ...users, docs: undefined });
    }
    catch (e) {
        next(e);
    }
}

export const createUserAdmin = async (req, res, next) => {
    try {
        await userDataValidation.parseAsync(req.body);
        const data = req.body

        const isAdmin = true
        const manager = new UsersManager();
        const newUser = await manager.createUser(data, isAdmin)
        return res.status(200).send({ status: "success", message: `Administrador "${newUser.email}" creado`, payload: { ...newUser, password: undefined } })
    }
    catch (e) {
        next(e);
    }
}

export const getUserById = async (req, res, next) => {
    try {

        await idValidationUser.parseAsync(req.params);
        const { uid } = req.params

        const manager = new UsersManager();
        const userFound = await manager.getUserById(uid);

        res.status(200).send({ status: "success", payload: userFound });

    } catch (e) {
        next(e);
    }
}

export const updateUser = async (req, res, next) => {
    try {

        await idValidationUser.parseAsync(req.body);
        const newData = req.body
        
        await idValidationUser.parseAsync(req.params);
        const { uid } = req.params

        const manager = new UsersManager();

        const userUpdated = await manager.updateUser(uid, newData);
        res.status(200).send({ status: "success", message: `${userUpdated.email} modificado.` })
    }
    catch (e) {
        next(e);
    }
}

export const deleteUser = async (req, res, next) => {
    try {

        await idValidationUser.parseAsync(req.params);
        const { uid } = req.params

        const manager = new UsersManager();
        const userDeleted = await manager.deleteUser(uid);
        res.status(200).send({ status: "success", message: `Usuario ${userDeleted.email} eliminado` })
    }
    catch (e) {
        next(e)
    }
}