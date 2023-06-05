import roleManager from "../managers/roleManager.js";

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
        const { id } = req.params
        const manager = new roleManager();
        const roleUpdated = await manager.updateRole(id, newData);
        res.status(200).send({ status: "success", message: `${roleUpdated.email} modificado.` })
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
        res.status(200).send({ status: "success", message: `Usuario ${roleDeleted.email} eliminado` })
    }
    catch (e) {
        next(e)
    }
}