import { managerDependencies } from "../../config/managerDependencies.js";
import container from "../../container.js";
import { createHash } from "../../shared/index.js";
import roleManager from "./RoleManager.js";

class UsersManager {

    constructor() {
        this.usersDao = container.resolve(managerDependencies.usersManager)
    }

    async createUser(data) {
        const role = await new roleManager().getOne("647e6757f16ff85ac7ec7c0d");

        const dto = {
            ...data,
            password: await createHash(data.password, 10),
            role: role.id
        };
        return this.usersDao.createUser(dto);
    }


    async getUsers(params, req) {
        return this.usersDao.getUsers(params, req);
    }

    async getUserById(uid) {
        return this.usersDao.getUserById(uid);
    }

    async getOneByEmail(email) {
        return this.usersDao.getOneByEmail(email);
    }

    async deleteUser(uid) {
        return this.usersDao.deleteUser(uid);
    }

    async updateUser(uid, data) {
        return this.usersDao.updateUser(uid, data);
    }

    async assignRole(uid, data) {
        return this.usersDao.assignRole(uid, data);
    }

}

export default UsersManager