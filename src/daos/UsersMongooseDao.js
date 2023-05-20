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
                throw new Error('No se encontraron usuarios.');
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

    async createUser(data, isAdmin) {
        try {
            const role = isAdmin ? 'admin' : 'user';
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
        catch (e) {
            return e
        }
    }

    async getUserById(uid) {
        try {
            const userDocument = await userSchema.findOne({ _id: uid, enabled: true });

            if (!userDocument) {
                return Promise.reject(new Error("Usuario no existe"))
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
        catch (e) {
            return e
        }
    }

    async getOneByEmail(email) {
        try {
            const userDocument = await userSchema.findOne({ email, enabled: true });

            console.log(email)

            if (!userDocument) {
                return Promise.reject(new Error("Usuario no existe"))
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
        catch (e) {
            return e
        }
    }

    async deleteUser(uid) {
        try {
            const userDocument = await userSchema.deleteMany();
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
                throw new Error("Usuario no existe")
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