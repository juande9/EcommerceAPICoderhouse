import roleSchema from "../../models/roleSchema.js"

class RoleMongooseDao {

    async getRoles(params) {
        const { limit = 10, page } = params
        const paginateOptions = {
            limit: limit || 10,
            page: page || 1,
        }

        const rolesDocument = await roleSchema.paginate({}, paginateOptions)

        rolesDocument.docs = rolesDocument.docs.map(document => ({
            id: document._id,
            name: document.name,
            permissions: document.permissions,
        }))
        return rolesDocument
    }


    async createRole(dto) {
        const rolesDocument = await roleSchema.create(dto);
        return {
            id: rolesDocument._id,
            name: rolesDocument.name,
            permissions: rolesDocument.permissions,
        }
    }

    async getOne(id) {
        const rolesDocument = await roleSchema.findOne({ _id: id })

        if (!rolesDocument) {
            throw new Error('Role not found');
        }

        return {
            id: rolesDocument._id,
            name: rolesDocument.name,
            permissions: rolesDocument.permissions,
        }
    }

    async deleteRole(id) {

        const rolesDocument = await roleSchema.deleteOne(id);
        return {
            id: rolesDocument._id,
            email: rolesDocument.email
        }

    }

    async updateRole(id, data) {

        const rolesDocument = await roleSchema.findOneAndUpdate({ _id: id }, data, { new: true });

        if (!rolesDocument) {
            throw new Error('Role not found')
        }
        return {
            id: rolesDocument._id,
            name: rolesDocument.name,
            permissions: rolesDocument.permissions,
        }

    }
}
export default RoleMongooseDao