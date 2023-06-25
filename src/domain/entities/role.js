import roleValidation from "../validations/roleValidation.js";

class Role {

    constructor(params) {
        this.id = params.id;
        this.name = params.name;
        this.permissions = params.permissions;
    }

    static validation(data) {
        const validatedRole = roleValidation.parseAsync(data)

        return validatedRole
    }
}

export default Role