import roleSchema from "../../models/roleSchema.js"
import Role from "../../../domain/entities/role.js"

class RoleMongooseRepository {

    async getRoles(params) {
        const { limit, page } = params
        const paginateOptions = {
            limit: limit || 10,
            page: page || 1,
        }

        const rolesDocument = await roleSchema.paginate({}, paginateOptions)
        const { docs, ...pagination } = rolesDocument

        const roles = docs.map(document => new Role({
            id: document._id,
            name: document.name,
            permissions: document.permissions,
        }))

        return {
            roles,
            pagination
        }
    }

    async createRole(data) {
        const rolesDocument = await roleSchema.create(await Role.validation(data));

        return new Role({
            id: rolesDocument._id,
            name: rolesDocument.name,
            permissions: rolesDocument.permissions,
        })
    }

    async getOne(id) {
        const rolesDocument = await roleSchema.findOne({ _id: id })

        console.log(rolesDocument)

        if (!rolesDocument) {
            throw new Error('Role not found');
        }

        return new Role({
            id: rolesDocument._id,
            name: rolesDocument.name,
            permissions: rolesDocument.permissions,
        })
    }

    async deleteRole(id) {
        const rolesDocument = await roleSchema.deleteOne(id);

        return new Role({
            id: rolesDocument._id,
            name: rolesDocument.name,
            permissions: rolesDocument.permissions,
        })
    }

    async updateRole(id, data) {
        const rolesDocument = await roleSchema.findOneAndUpdate({ _id: id }, data, { new: true });

        if (!rolesDocument) {
            throw new Error('Role not found')
        }
        return new Role({
            id: rolesDocument._id,
            name: rolesDocument.name,
            permissions: rolesDocument.permissions,
        })
    }
}
export default RoleMongooseRepository