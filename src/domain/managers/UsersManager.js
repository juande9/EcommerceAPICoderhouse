import container from "../../container.js";
import { createHash } from "../../utils/auth.js";
import jwt from 'jsonwebtoken';
import emailManager from "./emailManager.js";

class UsersManager {

    constructor() {
        this.UsersRepository = container.resolve('UsersRepository')
        this.RoleRepository = container.resolve('RoleRepository')
    }

    async createUser(data) {
        const role = await this.RoleRepository.getOne("647e6757f16ff85ac7ec7c0d")
        const dto = {
            ...data,
            password: await createHash(data.password, 10),
            isAdmin: false,
            role: role.id,
            enabled: true
        };
        return this.UsersRepository.createUser(dto);
    }

    async createUserAdmin(data) {
        const role = await this.RoleRepository.getOne("647e6757f16ff85ac7ec7c0d")
        const dto = {
            ...data,
            password: await createHash(data.password, 10),
            isAdmin: true,
            role: role.id,
            enabled: true
        };
        return this.UsersRepository.createUserAdmin(dto);
    }


    async getUsers(params, req) {
        return this.UsersRepository.getUsers(params, req);
    }

    async getUserById(uid) {
        return this.UsersRepository.getUserById(uid);
    }

    async getOneByEmail(email) {
        return this.UsersRepository.getOneByEmail(email);
    }

    async deleteUser(uid) {
        return this.UsersRepository.deleteUser(uid);
    }

    async updateUser(uid, data) {
        return this.UsersRepository.updateUser(uid, data);
    }

    async assignRole(uid, rid) {
        const role = await this.RoleRepository.getOne(rid)
        return this.UsersRepository.assignRole(uid, role);
    }

    async forgotPassword(email) {
        const user = await this.UsersRepository.getOneByEmail(email)

        if (user instanceof Error) {
            throw new Error('Usuario no encontrado')
        }

        console.log(user.email)

        const token = jwt.sign({ user: user.id }, process.env.JWT_SECRET_PASSRESET, { expiresIn: '1h' });
        const resetLink = `http://localhost:${process.env.SERVER_PORT}/api/email/reset-password?token=${token}`;

        const manager = new emailManager()
        manager.send('forgotPassword', { user, resetLink })

        return user.email
    }

    async changePassword(token, newPassword) {

        const isValidToken = jwt.verify(token, process.env.JWT_SECRET_PASSRESET);
        if (!isValidToken) {
            return res.status(401).send('Token inválido');
        }
        const { user } = isValidToken

        const passUpdated = await this.UsersRepository.updateUser(user, { password: await createHash(newPassword, 10) })
        return passUpdated
    }
}

export default UsersManager