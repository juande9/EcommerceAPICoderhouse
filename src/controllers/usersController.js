import UsersManager from "../managers/UsersManager.js";

export const getUsers = async (req, res) => {
    try {
        const manager = new UsersManager();
        const users = await manager.getUsers()
        res.status(200).send({ status: "success", payload: users })
    }
    catch (e) {
        console.log(e)
        res.status(400).send({ status: "error", message: e.message });
    }
}

export const createUser = async (req, res) => {
    try {
        const data = req.body
        const manager = new UsersManager();
        const newUser = await manager.createUser(data)

        return res.status(200).send({ status: "success", message: `Usuario ${newUser.email} creado`, payload: newUser })
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