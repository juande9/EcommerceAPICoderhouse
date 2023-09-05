import UsersManager from "../../domain/managers/UsersManager.js"
import emailManager from "../../domain/managers/emailManager.js"
import passwordValidation from "../../domain/validations/passwordValidation.js"

export const ticketConfirmation = async (res, next) => {
    try {
        const email = new emailManager()
        email.send('testEmail', { userName: 'Joe Doe', test: 'Email sent succesfully.' })
        res.status(201).send({ status: "success", message: `Mail enviado correctamente.` })
    }
    catch (e) {
        next(e)
    }
}

export const resetPassword = async (req, res, next) => {
    try {
        const { token } = req.query;
        res.render('resetPassword', { token });
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