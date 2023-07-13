import UsersManager from "../../domain/managers/UsersManager.js";
import { idValidation } from "../../domain/validations/idValidation.js";
import createUserValidation from "../../domain/validations/createUserValidation.js";

export const getUsers = async (req, res) => {
    try {
        const manager = new UsersManager();
        const users = await manager.getUsers(req.query)
        res.status(200).send({ status: "success", payload: users.docs, ...users, docs: undefined });
    }
    catch (e) {
        next(e);
    }
}

export const createUserAdmin = async (req, res, next) => {
    try {
        await createUserValidation.parseAsync(req.body);
        const data = req.body

        const manager = new UsersManager();
        const newUser = await manager.createUserAdmin(data)
        return res.status(201).send({ status: "success", message: `Administrador "${newUser.email}" creado`, payload: { ...newUser, password: undefined } })
    }
    catch (e) {
        next(e);
    }
}

export const getUserById = async (req, res, next) => {
    try {
        const { uid } = req.params
        const validatedUserId = await idValidation.parseAsync(uid);

        const manager = new UsersManager();
        const userFound = await manager.getUserById(validatedUserId);
        res.status(200).send({ status: "success", payload: userFound });
    } catch (e) {
        next(e);
    }
}

export const updateUser = async (req, res, next) => {
    try {
        const newData = req.body

        const { uid } = req.params
        const validatedUserId = await idValidation.parseAsync(uid);

        const manager = new UsersManager();
        const userUpdated = await manager.updateUser(validatedUserId, newData);
        res.status(200).send({ status: "success", message: `Usuario modificado.` })
    }
    catch (e) {
        next(e);
    }
}

export const assignRole = async (req, res, next) => {
    try {
        const { role } = req.body
        const validatedRoleId =await idValidation.parseAsync(role);
        const { uid } = req.params
        const validatedUserId = await idValidation.parseAsync(uid);

        const manager = new UsersManager();
        const userUpdated = await manager.assignRole(validatedUserId, validatedRoleId);

        res.status(200).send({ status: "success", message: `${userUpdated.email} modificado.` })
    }
    catch (e) {
        next(e);
    }
}

export const deleteUser = async (req, res, next) => {
    try {

        const { uid } = req.params
        const validatedUserId = await idValidation.parseAsync(uid);

        const manager = new UsersManager();
        const userDeleted = await manager.deleteUser(validatedUserId);
        res.status(200).send({ status: "success", message: `Usuario eliminado` })
    }
    catch (e) {
        next(e)
    }
}