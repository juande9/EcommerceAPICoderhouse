import { createHash } from "../../utils/auth.js";

class User {

    constructor(params) {
        this.id = params.id;
        this.firstName = params.firstName;
        this.lastName = params.lastName;
        this.email = params.email;
        this.age = params.age;
        this.password = params.password;
        this.role = params.role;
        this.isAdmin = params.isAdmin;
        this.enabled = params.enabled;
    }

    static async createHash(password) {
        return createHash(password, 10)
    }

}

export default User