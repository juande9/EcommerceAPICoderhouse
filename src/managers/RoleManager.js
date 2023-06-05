import roleMongooseDao from "../daos/roleMongooseDao.js";

class roleManager {

    constructor() {

        this.dao = new roleMongooseDao()

    }

    async create(data) {
        try {
            return this.dao.createRole(data);
        }

        catch (e) {
            return e
        }
    }

    async getRoles(params, req) {
        try {
            return this.dao.getRoles(params, req);
        }
        catch (e) {
            return e
        }
    }

    async getOne(id) {
        try {
            return this.dao.getOne(id);
        }
        catch (e) {
            return e
        }
    }

    async deleteRole(uid) {
        try {
            return this.dao.deleteRole(uid);
            }
        catch (e) {
            return e
        }
    }

    async updateRole(uid, data) {
        try {
            return this.dao.updateRole(uid, data);
        }
        catch (e) {
            return e
        }

    }

}

export default roleManager