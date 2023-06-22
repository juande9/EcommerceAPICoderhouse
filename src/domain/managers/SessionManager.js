import UsersManager from "../managers/UsersManager.js";
import loginValidation from "../../domain/validations/loginValidation.js";
import createUserValidation from "../../domain/validations/createUserValidation.js";
import { isValidPassword, generateToken } from "../../shared/index.js";

class SessionManager {

    async login(data) {
        await loginValidation.parseAsync(data);
        const { email, password } = data
        const manager = new UsersManager();
        const user = await manager.getOneByEmail(email);
        const isHashedPassword = await isValidPassword(password, user.password)

        if (!isHashedPassword) {
            throw new Error('Incorrect Password.')
        }

        return await generateToken(user)
    }

    async signup(dto) {
        
        await createUserValidation.parseAsync(dto);
        const manager = new UsersManager();

        const newUser = await manager.createUser(dto)
        return newUser
    }

}

export default SessionManager;
