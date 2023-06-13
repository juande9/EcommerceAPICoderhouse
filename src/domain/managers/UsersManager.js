import UsersMongooseDao from "../../data/daos/UsersMongooseDao.js";
import { createHash } from "../../shared/index.js";
import roleManager from "./RoleManager.js";

class UsersManager {

    constructor() {

        this.dao = new UsersMongooseDao()

    }

    async createUser(data) {
        try {
            const role = await new roleManager().getOne("647e6757f16ff85ac7ec7c0d");
            const dto = {
                ...data,
                password: await createHash(data.password, 10),
                role: role.id
            };
    
            return this.dao.createUser(dto);
        } catch (e) {
            return e;
        }
    }
    

    async getUsers(params, req) {
        try {
            return this.dao.getUsers(params, req);
        }
        catch (e) {
            return e
        }
    }

    async getUserById(uid) {
        try {
            return this.dao.getUserById(uid);
        }
        catch (e) {
            return e
        }
    }

    async getOneByEmail(email) {
        try {
            return this.dao.getOneByEmail(email);
        }
        catch (e) {
            return e
        }
    }

    async deleteUser(uid) {
        try {
            return this.dao.deleteUser(uid);
        }
        catch (e) {
            return e
        }
    }

    async updateUser(uid, data) {
        try {
            return this.dao.updateUser(uid, data);
        }
        catch (e) {
            return e
        }
    }

    async assignRole(uid, data) {
        try {
            return this.dao.assignRole(uid, data);
        }
        catch (e) {
            return e
        }
    }

}

export default UsersManager