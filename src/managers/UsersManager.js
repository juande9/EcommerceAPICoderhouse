import UsersMongooseDao from "../daos/UsersMongooseDao.js";
import { createHash } from "../shared/index.js";

class UsersManager {

    constructor() {

        this.dao = new UsersMongooseDao()

    }

    async createUser(data) {
        try {
            const dto = {
                ...data,
                password: await createHash(data.password, 10)
            }

            return this.dao.createUser(dto);
        }
        catch (e) {
            return e
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