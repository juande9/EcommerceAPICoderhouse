import mongoose, { Schema } from "mongoose";

const usersCollection = "users";

const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    password: { type: String, required: true },
    enabled: { type: Boolean, default: true }
});

export default mongoose.model(usersCollection, userSchema);