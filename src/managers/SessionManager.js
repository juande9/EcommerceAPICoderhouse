import UsersManager from "../managers/UsersManager.js";

class SessionManager {

    async login(email, password) {
        try {

            if (!email || !password) {
                throw new Error("Error en mail y password")
            }
            
            const manager = new UsersManager();
            const foundUser = await manager.getOneByEmail(email);

            if (foundUser.password !== password) {
                throw new Error("Usuario y contraseña no coinciden");
            }

            return foundUser;
        } catch (e) {
            return Promise.reject(e);
        }
    }

}

export default SessionManager;
