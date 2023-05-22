import SessionManager from "../managers/SessionManager.js";

export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const manager = new SessionManager()
        const foundUser = await manager.login(email, password, req)

        res.status(201).send({ status: "success", message: `${foundUser.email} logueado con éxito` });

    }
    catch (e) {
        res.status(400).send({ status: "error", message: e.message });
    }
}

export const loginPassport = async (req, res) => {
    if (!req.user) res.status(400).send({ status: 'error', message: 'Invalid credentials' })

    req.session.passport = {
        email: req.user.email,
    }

    res.send({ status: 'success', message: `${req.user.email} log in` })
}


export const signup = async (req, res) => {
    try {
        const data = req.body
        const manager = new SessionManager();
        const newUser = await manager.signup(data)

        res.status(201).send({ status: "success", message: `Usuario ${newUser.email} creado`, payload: { ...newUser, password: undefined } })
    }
    catch (e) {
        res.status(400).send({ status: "error", message: e.message });
    }
}

export const signupPassport = async (req, res) => {

    const newUser = req.user
    res.status(201).send({
        status: 'success', message: `${newUser.email} Registered`,
        payload: { ...newUser, password: undefined }
    })
}


export const logout = (req, res) => {
    try {
        req.session.destroy(err => {
            req.logout(); // Cerrar sesión en Passport
            if (!err) {
                return res.status(201).send({ status: "success", message: "Logout successful." });
            }
        })
    }
    catch (e) {
        res.status(400).send({ status: "error", message: "Log out error" });
    }
}

export const fail = async (req, res) => {
    res.status(400).send({ status: "error", message: "Proccess Failed." });
}