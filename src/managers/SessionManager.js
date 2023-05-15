import UsersManager from "../managers/UsersManager.js";

class SessionManager {

    async login(email, password, req) {
        try {

            if (!email || !password) {
                throw new Error("Error en mail y password")
            }

            const manager = new UsersManager();
            const foundUser = await manager.getOneByEmail(email);

            if (foundUser.password !== password) {
                throw new Error("Usuario y contraseña no coinciden");
            }

            req.session.user = { email, role: foundUser.role };

            return foundUser;
        } catch (e) {
            return Promise.reject(e);
        }
    }

    async signup(data) {
        try {

            const manager = new UsersManager();
            const newUser = await manager.createUser(data, false)

            return newUser

        } catch (e) {
            return Promise.reject(e);
        }
    }

    async logout(req) {
        try {

            req.session.destroy(err => {
                if (!err) {
                    return res.status(201).send({ status: "success", message: "Usuario deslogueado." });
                }
            })

        } catch (e) {
            return Promise.reject(e);
        }
    }

}

export default SessionManager;
