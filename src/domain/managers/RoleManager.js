import { managerDependencies } from "../../config/managerDependencies.js";
import container from "../../container.js";

class roleManager {

    constructor() {
        this.roleDao = container.resolve(managerDependencies.roleManager)
    }

    async create(data) {
        return this.roleDao.createRole(data);
    }

    async getRoles(params, req) {
        return this.roleDao.getRoles(params, req);
    }

    async getOne(id) {
        return this.roleDao.getOne(id);
    }

    async deleteRole(uid) {
        return this.roleDao.deleteRole(uid);
    }

    async updateRole(uid, data) {
        return this.roleDao.updateRole(uid, data);
    }
}

export default roleManager