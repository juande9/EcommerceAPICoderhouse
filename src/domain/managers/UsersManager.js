import container from "../../container.js";
import { createHash } from "../../utils/auth.js";

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

}

export default UsersManager