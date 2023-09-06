import UsersManager from "../../domain/managers/UsersManager.js"
import passwordValidation from "../../domain/validations/passwordValidation.js"

export const resetPassword = async (req, res, next) => {
    try {
        const { token } = req.query;
        const isValidToken = token.verify(token, process.env.JWT_SECRET_PASSRESET);
        if (!isValidToken) {
            return res.status(401).send('Token inválido');
        }
        res.render('resetPassword', { isValidToken });
    }
    catch (e) {
        next(e)
    }
}

export const confirmPassReset = async (req, res, next) => {
    try {
        const { token, newPassword } = req.body
        const validatedPassword = await passwordValidation.parseAsync({ password: newPassword })
        const manager = new UsersManager()
        const updatedPassUser = await manager.changePassword(token, validatedPassword.password)
        res.status(201).send({ status: "success", message: `${updatedPassUser.email} ha cambiado la contraseña correctamente.` })
    }
    catch (e) {
        next(e)
    }
}