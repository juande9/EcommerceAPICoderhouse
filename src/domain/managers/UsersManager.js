import container from "../../container.js";
import { createHash } from "../../utils/auth.js";

import jwt from 'jsonwebtoken';
import cron from 'node-cron'
import emailManager from "./emailManager.js";

class UsersManager {

    constructor() {
        this.UsersRepository = container.resolve('UsersRepository')
        this.RoleRepository = container.resolve('RoleRepository')
        this.startInactivityCronJob()
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
        return this.UsersRepository.createUserAdmin(data);
    }

    async getUsers(params) {
        return this.UsersRepository.getUsers(params);
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

    async checkInactivity() {
        const currentDate = new Date();
        const users = await this.UsersRepository.getUsers({});

        const inactiveUsers = users.users.filter(user => {
            const lastConnection = new Date(user.lastActiveSession)
            const timeDiff = currentDate - lastConnection
            const twentyDaysInMillis = 20 * 24 * 60 * 60 * 1000;
            return timeDiff >= twentyDaysInMillis;
        });

        inactiveUsers.forEach(user => {
            this.UsersRepository.deleteUser(user.id)
            console(`User ${user.email} marked as inactive.`);
        });
    }

    startInactivityCronJob() {
        cron.schedule('0 0 * * *', () => {
            console.log('Checking inactivity...')
            this.checkInactivity();
        }, {
            timezone: 'America/Argentina/Buenos_Aires'
        });
    }

    async forgotPassword(email, domain) {
        const user = await this.UsersRepository.getOneByEmail(email)

        if (user instanceof Error) {
            throw new Error('Usuario no encontrado')
        }

        const token = jwt.sign({ user: user.id }, process.env.JWT_SECRET_PASSRESET, { expiresIn: '1h' });
        const resetLink = `${domain}/api/email/reset-password?token=${token}`;

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