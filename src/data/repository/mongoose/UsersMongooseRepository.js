import userSchema from "../../models/userSchema.js";
import User from "../../../domain/entities/user.js";

class UsersMongooseRepository {

    async getUsers(params) {
        const { limit = 10, page } = params
        const paginateOptions = {
            limit: limit || 10,
            page: page || 1,
        }

        const userDocument = await userSchema.paginate({ enabled: true }, paginateOptions)
        const { docs, ...pagination } = userDocument

        if (userDocument.length === 0) {
            throw new Error('Users not Found.');
        }

        const users = docs.map(document => new User({
            id: document._id,
            firstName: document.firstName,
            lastName: document.lastName,
            email: document.email,
            age: document.age,
            password: document.password,
            role: document.role,
            isAdmin: document.isAdmin,
            lastActiveSession: document.lastActiveSession,
        }))

        return {
            users,
            pagination
        }

    }

    async createUser(dto) {
        const userDocument = await userSchema.create(dto)

        return new User({
            id: userDocument._id,
            firstName: userDocument.firstName,
            lastName: userDocument.lastName,
            email: userDocument.email,
            age: userDocument.age,
            password: userDocument.password,
            role: userDocument.role,
            isAdmin: userDocument.isAdmin,
            lastActiveSession: userDocument.lastActiveSession,
        })
    }

    async createUserAdmin(dto) {
        const userDocument = await userSchema.create(dto)

        return new User({
            id: userDocument._id,
            firstName: userDocument.firstName,
            lastName: userDocument.lastName,
            email: userDocument.email,
            age: userDocument.age,
            password: userDocument.password,
            role: userDocument.role,
            isAdmin: userDocument.isAdmin,
            lastActiveSession: userDocument.lastActiveSession,
        })
    }


    async getUserById(uid) {
        const userDocument = await userSchema.findOne({ _id: uid, enabled: true })

        if (!userDocument) {
            throw new Error('User not found');
        }

        return new User({
            id: userDocument._id,
            firstName: userDocument.firstName,
            lastName: userDocument.lastName,
            email: userDocument.email,
            age: userDocument.age,
            password: userDocument.password,
            role: userDocument.role,
            isAdmin: userDocument.isAdmin,
            lastActiveSession: userDocument.lastActiveSession,
        })
    }

    async getOneByEmail(email) {
        const userDocument = await userSchema.findOne({ email, enabled: true });

        if (!userDocument) {
            return new Error("User not found")
        }

        return new User({
            id: userDocument._id,
            firstName: userDocument.firstName,
            lastName: userDocument.lastName,
            email: userDocument.email,
            age: userDocument.age,
            password: userDocument.password,
            role: userDocument.role,
            isAdmin: userDocument.isAdmin,
            lastActiveSession: userDocument.lastActiveSession,
        })
    }

    async deleteUser(uid) {
        return await userSchema.findOneAndUpdate({ _id: uid }, { enabled: false }, { new: true });
    }

    async assignRole(uid, role) {
        const newRole = { $set: { role: role.id } }
        const userDocument = await userSchema.findOneAndUpdate({ _id: uid }, newRole, { new: true });

        if (!userDocument) {
            throw new Error('User not found')
        }

        return new User({
            id: userDocument._id,
            firstName: userDocument.firstName,
            lastName: userDocument.lastName,
            email: userDocument.email,
            age: userDocument.age,
            password: userDocument.password,
            role: userDocument.role,
            isAdmin: userDocument.isAdmin,
            lastActiveSession: userDocument.lastActiveSession,
        })
    }

    async updateUser(uid, data) {
        const userDocument = await userSchema.findOneAndUpdate({ _id: uid }, data, { new: true });

        if (!userDocument) {
            throw new Error('User not found')
        }

        return new User({
            id: userDocument._id,
            firstName: userDocument.firstName,
            lastName: userDocument.lastName,
            email: userDocument.email,
            age: userDocument.age,
            password: userDocument.password,
            role: userDocument.role,
            isAdmin: userDocument.isAdmin,
            lastActiveSession: userDocument.lastActiveSession,
        })
    }
}
export default UsersMongooseRepository