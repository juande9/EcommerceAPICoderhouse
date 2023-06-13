import SessionManager from "../../domain/managers/SessionManager.js";

export const login = async (req, res, next) => {
    try {
        const manager = new SessionManager()
        const accessToken = await manager.login(req.body)

        res.cookie('accessToken', accessToken, {
            maxAge: 60 * 60 * 100,
            httpOnly: true
        }).status(201).send({ status: "success", message: `${req.body.email} logged in.`, accessToken: accessToken });

    }
    catch (e) {
        next(e)
    }
}

export const signup = async (req, res, next) => {
    try {
        const manager = new SessionManager();
        const newUser = await manager.signup(req.body)
        res.status(201).send({
            status: 'success', message: `${newUser.email} registered.`,
            payload: { ...newUser, password: undefined }
        })
    }
    catch (e) {
        next(e)
    }
}

export const current = async (req, res) => {
    res.status(200).send({ status: 'success', payload: req.user });
}