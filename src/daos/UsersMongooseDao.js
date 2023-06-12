import userSchema from "../models/userSchema.js";
import roleSchema from "../models/roleSchema.js";

class UsersMongooseDao {

    async getUsers(params) {
        try {
            const { limit = 10, page } = params

            const paginateOptions = {
                limit: limit || 10,
                page: page || 1,
            }

            const userDocument = await userSchema
                .paginate({ enabled: true }, paginateOptions)

            if (userDocument.length === 0) {
                throw new Error('Users not Found.');
            }

            userDocument.docs = userDocument.docs.map(document => ({
                id: document._id,
                firstName: document.firstName,
                lastName: document.lastName,
                email: document.email,
                age: document.age,
                password: document.password,
                role: document.role,
                isAdmin: document.isAdmin
            }))

            return userDocument
        }
        catch (e) {
            return e.message
        }
    }


    async createUser(dto) {
        const userDocument = await userSchema.create(dto);

        if (!userDocument) {
            throw new Error('User creating problem.');
        }

        return {
            id: userDocument._id,
            firstName: userDocument.firstName,
            lastName: userDocument.lastName,
            email: userDocument.email,
            age: userDocument.age,
            password: userDocument.password,
            role: userDocument.role,
            isAdmin: userDocument.isAdmin
        }
    }

    async getUserById(uid) {
        const userDocument = await userSchema.findOne({ _id: uid, enabled: true })

        if (!userDocument) {
            throw new Error('User not found');
        }

        return {
            id: userDocument._id,
            firstName: userDocument.firstName,
            lastName: userDocument.lastName,
            email: userDocument.email,
            age: userDocument.age,
            password: userDocument.password,
            role: userDocument.role,
            isAdmin: userDocument.isAdmin
        }

    }

    async getOneByEmail(email) {
        const userDocument = await userSchema.findOne({ email, enabled: true });

        if (!userDocument) {
            return new Error("User not found")
        }

        return {
            id: userDocument._id,
            firstName: userDocument.firstName,
            lastName: userDocument.lastName,
            email: userDocument.email,
            age: userDocument.age,
            password: userDocument.password,
            role: userDocument.role,
            isAdmin: userDocument.isAdmin
        }
    }

    async deleteUser(uid) {
        const userDocument = await userSchema.deleteOne(uid);
        return {
            id: userDocument._id,
            email: userDocument.email
        }
    }


    async assignRole(uid, rid) {

        const role = await roleSchema.findOne({ _id: rid });
        const newRole = { $set: { role } }
        const userDocument = await userSchema.findOneAndUpdate({ _id: uid }, newRole, { new: true });

        if (!userDocument) {
            throw new Error('User not found')
        }

    }

    async updateUser(uid, data) {

        const userDocument = await userSchema.findOneAndUpdate({ _id: uid }, data, { new: true });

        if (!userDocument) {
            throw new Error('User not found')
        }
        return {
            id: userDocument._id,
            firstName: userDocument.firstName,
            lastName: userDocument.lastName,
            email: userDocument.email,
            age: userDocument.age,
            password: userDocument.password,
            role: userDocument.role,
            isAdmin: userDocument.isAdmin
        }
    }
}
export default UsersMongooseDao