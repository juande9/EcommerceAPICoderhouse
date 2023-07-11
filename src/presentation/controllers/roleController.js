import roleManager from "../../domain/managers/RoleManager.js";
import { idValidation } from "../../domain/validations/idValidation.js";

export const list = async (req, res, next) => {
    try {
        const manager = new roleManager();
        const roles = await manager.getRoles(req.query)
        res.status(200).send({ status: "success", payload: roles.docs, ...roles, docs: undefined });
    }
    catch (e) {
        next(e);
    }
}

export const getOne = async (req, res, next) => {
    try {
        const { id } = req.params
        const manager = new roleManager();
        const roleFound = await manager.getOne(await idValidation.parseAsync(id));
        res.status(200).send({ status: "success", payload: roleFound });
    } catch (e) {
        next(e);
    }
}

export const create = async (req, res, next) => {
    try {
        const manager = new roleManager();
        const role = await manager.create(req.body);
        res.status(201).send({ status: 'success', role, message: 'Role created.' })
    } catch (e) {
        next(e)
    }
};

export const update = async (req, res, next) => {
    try {
        const newData = req.body
        const { id } = req.params
        const manager = new roleManager();
        const roleUpdated = await manager.updateRole(id, newData);
        res.status(200).send({ status: "success", message: `Rol ${roleUpdated.name} modified.` })
    }
    catch (e) {
        next(e);
    }
}

export const deleteOne = async (req, res, next) => {
    try {
        const { id } = req.params
        await idValidation.parseAsync(id);
        const manager = new roleManager();
        const roleDeleted = await manager.deleteRole(id);
        res.status(200).send({ status: "success", message: `Rol ${roleDeleted.name} deleted` })
    }
    catch (e) {
        next(e)
    }
}