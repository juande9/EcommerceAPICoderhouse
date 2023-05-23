import SessionManager from "../managers/SessionManager.js";
import userDataValidation from "../middleware/userValidation.js";

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body

        const manager = new SessionManager()
        const foundUser = await manager.login(email, password, req)

        res.status(201).send({ status: "success", message: `${foundUser.email} logueado con éxito` });

    }
    catch (e) {
        next(e)
    }
}

export const loginPassport = async (req, res) => {
    if (!req.user) res.status(400).send({ status: 'error', message: 'Invalid credentials' })
    req.session.passport = {
        email: req.user.email,
        role: req.user.role,
    }
    res.send({ status: 'success', message: `${req.user.email} log in` })
}

export const loginJwt = async (req, res, next) => {
    try {
        const { email, password } = req.body

        const manager = new SessionManager()
        const foundUser = await manager.loginJwt(email, password)

        res.status(201).send({ status: "success", message: `${email} logueado con éxito`, accessToken: foundUser });

    }
    catch (e) {
        next(e)
    }
}


export const signup = async (req, res, next) => {
    try {
        await userDataValidation.parseAsync(req.body);
        const dto = req.body

        const manager = new SessionManager();
        const newUser = await manager.signup(dto)
        res.status(201).send({
            status: 'success', message: `${newUser.email} Registered`,
            payload: { ...newUser, password: undefined }
        })
    }
    catch (e) {
        next(e)
    }
}

export const signupPassport = async (req, res, next) => {
    try {
        await userDataValidation.parseAsync(req.body);
        const dto = req.body

        res.status(201).send({
            status: 'success', message: `${dto.email} Registered`,
            payload: { ...dto, password: undefined }
        })
    }
    catch (e) {
        next(e)
    }
}

export const signupJwt = async (req, res, next) => {
    try {
        await userDataValidation.parseAsync(req.body);
        const dto = req.body

        const manager = new SessionManager();
        const newUser = await manager.signup(dto)

        res.status(201).send({
            status: 'success', message: `${newUser.email} Registered`,
            payload: { ...newUser, password: undefined }
        })
    }
    catch (e) {
        next(e)
    }
}

export const currentJwt = async (req, res) => {
    res.status(200).send({ status: 'Success', payload: req.user });
}


export const logout = (req, res) => {
    try {
        req.session.destroy(err => {
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