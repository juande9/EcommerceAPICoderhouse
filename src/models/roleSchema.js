import mongoose, { Schema } from "mongoose"
import paginate from "mongoose-paginate-v2"

const roleCollection = "roles";

const roleSchema = new Schema({
    name: { type: String, required: true },
    permissions: [{ type: String }],
});

roleSchema.plugin(paginate)
export default mongoose.model(roleCollection, roleSchema);