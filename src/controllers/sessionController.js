import SessionManager from "../managers/SessionManager.js";
import loginValidation from "../middleware/loginValidation.js";
import userDataValidation from "../middleware/userValidation.js";


export const login = async (req, res, next) => {
    try {
        await loginValidation.parseAsync(req.body);
        const { email, password } = req.body

        const manager = new SessionManager()
        const foundUser = await manager.loginJwt(email, password)

        res.status(201).send({ status: "success", message: `${email} logged in with Jwt`, accessToken: foundUser });
        
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


// Código sin Jwt


/* export const logout = (req, res) => {
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
} */

/* export const signup = async (req, res, next) => {
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
} */

/* export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body

        const manager = new SessionManager()
        const foundUser = await manager.login(email, password, req)

        res.status(201).send({ status: "success", message: `${foundUser.email} logueado con éxito` });

    }
    catch (e) {
        next(e)
    }
} */