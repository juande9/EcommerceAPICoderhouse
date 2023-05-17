import UsersManager from "../managers/UsersManager.js";
import bcrypt from "bcrypt"

class SessionManager {

    async login(email, password, req) {
        try {

            if (!email || !password) {
                throw new Error("Error en mail y password")
            }

            const manager = new UsersManager();
            const foundUser = await manager.getOneByEmail(email);

            const isHashedPassword = await bcrypt.compare(password, foundUser.password)

            if (isHashedPassword) {
                req.session.user = { email, role: foundUser.role };
                return foundUser
            }


        } catch (e) {
            return Promise.reject(e);
        }
    }

    async signup(data) {
        try {

            const manager = new UsersManager();

            const payload = {
                ...data,
                password: await bcrypt.hash(data.password, 10)
            }

            const newUser = await manager.createUser(payload, false)

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
