import container from "../../container.js";

class roleManager {

    constructor() {
        this.RoleRepository = container.resolve('RoleRepository')
    }

    async create(data) {
        return this.RoleRepository.createRole(data);
    }

    async getRoles(params, req) {
        return this.RoleRepository.getRoles(params, req);
    }

    async getOne(id) {
        return this.RoleRepository.getOne(id);
    }

    async deleteRole(uid) {
        return this.RoleRepository.deleteRole(uid);
    }

    async updateRole(uid, data) {
        return this.RoleRepository.updateRole(uid, data);
    }
}

export default roleManager