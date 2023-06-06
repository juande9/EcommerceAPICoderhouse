import z from 'zod';
import idValidation from "../shared/idValidation.js";
import createUserValidation from "./createUserValidation.js";

const userUpdateValidation = z.union([
  idValidation,
  createUserValidation
]);

export default userUpdateValidation;