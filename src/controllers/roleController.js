import roleManager from "../managers/RoleManager.js";

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
        const roleFound = await manager.getOne(id);
        res.status(200).send({ status: "success", payload: roleFound });
    } catch (e) {
        next(e);
    }
}

export const create = async (req, res) => {
    const manager = new roleManager();
    const role = await manager.create(req.body);
    res.send({ status: 'success', role, message: 'Role created.' })
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
        const manager = new roleManager();
        const roleDeleted = await manager.deleteRole(id);
        res.status(200).send({ status: "success", message: `Rol ${roleDeleted.name} deleted` })
    }
    catch (e) {
        next(e)
    }
}