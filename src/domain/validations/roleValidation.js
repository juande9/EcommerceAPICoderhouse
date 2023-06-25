import z from 'zod';

const allowedPermissions = [
  'getUsers',
  'getRoles',
  'getCart',
  'addProductCart',
  'emptyCart',
  'updateProductCart',
  'deleteProductCart',
];

const roleValidation = z.object({
  name: z.string(),
  permissions: z
    .array(z.enum(allowedPermissions))
    .nonempty('Permissions must be a non-empty array'),
});

export default roleValidation;
