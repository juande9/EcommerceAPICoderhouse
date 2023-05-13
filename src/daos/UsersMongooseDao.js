import userSchema from "./models/userSchema.js";

class UsersMongooseDao {

    async getUsers() {
        try {
            const userDocument = await userSchema.find({ enabled: true });

            if (userDocument.length === 0) {
                throw new Error('No se encontraron usuarios.');
            }

            return userDocument.map(document => ({
                id: document._id,
                firstName: document.firstName,
                lastName: document.lastName,
                email: document.email,
                age: document.age,
            }))
        }
        catch (e) {
            return e.message
        }
    }

    async createUser(data) {
        try {
            const userDocument = await userSchema.create(data);
            return {
                id: userDocument._id,
                firstName: userDocument.firstName,
                lastName: userDocument.lastName,
                email: userDocument.email,
                age: userDocument.age,
            }
        }
        catch (e) {
            return e
        }
    }

    async getUserById(uid) {
        try {
            const userDocument = await userSchema.findOne({ _id: uid, enabled: true });
            return {
                id: userDocument._id,
                firstName: userDocument.firstName,
                lastName: userDocument.lastName,
                email: userDocument.email,
                age: userDocument.age,
            }
        }
        catch (e) {
            return e
        }
    }

    async deleteUser(uid) {
        try {
            const userDocument = await userSchema.updateOne({ _id: uid }, { enabled: false });
            return {
                id: userDocument._id,
                email: userDocument.email
            }
        }
        catch (e) {
            return e
        }
    }


}

export default UsersMongooseDao