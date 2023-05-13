import SessionManager from "../managers/SessionManager.js";
import UsersManager from "../managers/UsersManager.js";

export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const manager = new SessionManager()
        const foundUser = await manager.login(email, password)

        req.session.user = { email };

        res.status(201).send({ status: "success", message: "Logueado" });

    }
    catch (e) {
        res.status(400).send({ status: "error", message: e.message });
    }
}

//*Cambiar esto!
export const signup = async (req, res) => {
    try {
        const data = req.body
        const manager = new UsersManager();
        const newUser = await manager.createUser(data)
        return res.status(201).send({ status: "success", message: `Usuario ${newUser.email} creado`, payload: newUser })
    }
    catch (e) {
        res.status(400).send({ status: "error", message: e.message });
    }
}


export const logout = (req, res) => {
    try {
        req.session.destroy(err => {
            if (!err) {
                res.status(201).send({ status: "success", message: "Log Out Ok" });
            }
        })

    }
    catch (e) {
        res.status(400).send({ status: "error", message: "Log out error" });
    }
} 