import mongoose, { Schema } from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2"

const usersCollection = "users";

const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    password: { type: String },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    enabled: { type: Boolean, default: true }
});

userSchema.plugin(mongoosePaginate)
export default mongoose.model(usersCollection, userSchema);