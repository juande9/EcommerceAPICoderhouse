import userSchema from "./models/userSchema.js";

class UsersMongooseDao {

    async getUsers(params, req) {
        try {
            const { limit = 10, page } = params

            const paginateOptions = {
                limit: limit || 10,
                page: page || 1,
            }

            const isAdmin = req.session?.user?.role === "admin"

            const userDocument = await userSchema
                .paginate(isAdmin ? { enabled: true } : { enabled: true, role: "user" }, paginateOptions)

            if (userDocument.length === 0) {
                throw new Error('Users not Found.');
            }

            userDocument.docs = userDocument.docs.map(document => ({
                id: document._id,
                firstName: document.firstName,
                lastName: document.lastName,
                email: document.email,
                age: document.age,
                role: document.role
            }))

            return userDocument
        }
        catch (e) {
            return e.message
        }
    }

    async getUsersPassport() {

        let userDocument = await userSchema.find({})

        userDocument = userDocument.map(document => ({
            id: document._id,
            firstName: document.firstName,
            lastName: document.lastName,
            email: document.email,
            age: document.age,
            role: document.role
        }))

        return userDocument
    }

    async createUser(data, role) {
        const userDocument = await userSchema.create({ ...data, role });

        return {
            id: userDocument._id,
            firstName: userDocument.firstName,
            lastName: userDocument.lastName,
            email: userDocument.email,
            age: userDocument.age,
            password: userDocument.password
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
            role: userDocument.role,
            password: userDocument.password
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
            role: userDocument.role
        }
    }

    async deleteUser(uid) {
        try {
            const userDocument = await userSchema.deleteOne(uid);
            return {
                id: userDocument._id,
                email: userDocument.email
            }
        }
        catch (e) {
            return e
        }
    }

    async updateUser(uid, data) {
        try {
            const userDocument = await userSchema.findOneAndUpdate({ _id: uid, enabled: true }
                , data, { new: true });

            if (!userDocument) {
                throw new Error('User not found')
            }
            return {
                id: userDocument._id,
                firstName: userDocument.firstName,
                lastName: userDocument.lastName,
                email: userDocument.email,
                age: userDocument.age,
                password: userDocument.password
            }
        }
        catch (e) {
            return e
        }
    }
}
export default UsersMongooseDao