import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const roleCollection = 'roles';

const roleSchema = new Schema({
  name: { type: String, required: true, unique: true },    
  permissions: { type: [String], required: true },
});

roleSchema.plugin(mongoosePaginate);

export default mongoose.model(roleCollection, roleSchema);