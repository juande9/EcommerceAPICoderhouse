import UsersManager from "../managers/UsersManager.js";
import { isValidPassword } from "../helpers/index.js";

class SessionManager {

    async login(email, password, req) {
        try {

            if (!email || !password) {
                throw new Error('Invalid email or password format')
            }

            const manager = new UsersManager();
            const user = await manager.getOneByEmail(email);
            const isHashedPassword = await isValidPassword(password, user.password)

            if (!isHashedPassword) {
                throw new Error ('Incorrect Password.')
            }

            req.session.user = { email, role: user.role };
            return user

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
