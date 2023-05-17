import UsersManager from "../managers/UsersManager.js";

export const getUsers = async (req, res) => {
    try {
        const manager = new UsersManager();
        const params = req.query
        const users = await manager.getUsers(params, req)
        res.status(200).send({ status: "success", payload: users.docs, ...users, docs: undefined });
    }
    catch (e) {
        res.status(400).send({ status: "error", message: e.message });
    }
}

export const createUserAdmin = async (req, res) => {
    try {
        const data = req.body
        const isAdmin = true
        const manager = new UsersManager();
        const newUser = await manager.createUser(data, isAdmin)
        console.log(newUser)
        return res.status(200).send({ status: "success", message: `Administrador "${newUser.email}" creado`, payload: payload: {...newUser, password: undefined }})
    }
    catch (e) {
        res.status(400).send({ status: "error", message: e.message });
    }
}

export const getUserById = async (req, res) => {
    try {
        const manager = new UsersManager();
        const { uid } = req.params;

        if (uid.length !== 24) throw new Error("El ID ingresado es inválido");
        const userFound = await manager.getUserById(uid);

        if (!userFound || Object.keys(userFound).length === 0) {
            throw new Error("No se encontró ningún usuario con el ID proporcionado");
        }

        res.status(200).send({ status: "success", payload: userFound });

    } catch (e) {
        res.status(400).send({ status: "error", message: e.message });
    }
}

export const updateUser = async (req, res) => {
    try {
        const manager = new UsersManager();
        const { uid } = req.params
        const newData = req.body
        if (uid.length !== 24) throw new Error("El ID ingresado es inválido");

        const userUpdated = await manager.updateUser(uid, newData);
        res.status(200).send({ status: "success", message: `${userUpdated.email} modificado.` })
    }
    catch (e) {
        res.status(400).send({ status: "error", message: e.message });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const manager = new UsersManager();
        const { uid } = req.params
        if (uid.length !== 24) throw new Error("El ID ingresado es inválido");

        const userDeleted = await manager.deleteUser(uid);
        res.status(200).send({ status: "success", message: `Usuario ${userDeleted.email} eliminado` })
    }
    catch (e) {
        res.status(400).send({ status: "error", message: e.message });
    }
}