import SessionManager from "../managers/SessionManager.js";
import loginValidation from "../middleware/loginValidation.js";
import userDataValidation from "../middleware/userValidation.js";


export const login = async (req, res, next) => {
    try {
        await loginValidation.parseAsync(req.body);
        const { email, password } = req.body

        const manager = new SessionManager()
        const accessToken = await manager.login(email, password)

        console.log(accessToken)

        res.cookie('accessToken', accessToken, {
            maxAge: 60 * 60 * 100,
            httpOnly: true
        }).status(201).send({ status: "success", message: `${email} logged in.`, accessToken: accessToken });

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
            status: 'success', message: `${newUser.email} registered with Jwt`,
            payload: { ...newUser, password: undefined }
        })
    }
    catch (e) {
        next(e)
    }
}

export const current = async (req, res) => {
    res.status(200).send({ status: 'Success', payload: req.user });
}