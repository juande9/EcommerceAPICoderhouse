import UsersMongooseDao from "../daos/UsersMongooseDao.js";

class UsersManager {

    constructor() {

        this.dao = new UsersMongooseDao()

    }

    async createUser(data) {
        try {
            return this.dao.createUser(data);
        }
        catch (e) {
            return e
        }
    }

    async getUsers() {
        try {
            return this.dao.getUsers();
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


    async deleteUser(uid) {
        try {
            return this.dao.deleteUser(uid);
        }
        catch (e) {
            return e
        }
    }

}

export default UsersManager