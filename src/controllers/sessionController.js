import SessionManager from "../managers/SessionManager.js";

export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            throw new Error("Error en el correo electrónico o la contraseña");
        }

        const manager = new SessionManager()
        const foundUser = await manager.login(email, password, req)

        res.status(201).send({ status: "success", message: `${foundUser.email} logueado con éxito` });

    }
    catch (e) {
        res.status(400).send({ status: "error", message: e.message });
    }
}


export const signup = async (req, res) => {
    try {
        const data = req.body
        const manager = new SessionManager();
        const newUser = await manager.signup(data)

        res.status(201).send({ status: "success", message: `Usuario ${newUser.email} creado`, payload: newUser })
    }
    catch (e) {
        res.status(400).send({ status: "error", message: e.message });
    }
}


export const logout = (req, res) => {
    try {
        req.session.destroy(err => {
            if (!err) {
                return res.status(201).send({ status: "success", message: "Usuario deslogueado." });
            }
        })
    }
    catch (e) {
        res.status(400).send({ status: "error", message: "Log out error" });
    }
} 