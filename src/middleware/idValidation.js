import z from 'zod';

const idValidation = z.object({
  id: z.string().length(24)
});

export default idValidation;

export const idValidationUser = z.object({
  uid: z.string().length(24),
});

export const idValidationProduct = z.object({
  pid: z.string().length(24),
});

export const idValidationCart = z.object({
  cid: z.string().length(24),
});

export const idValidationRole = z.object({
  role: z.string().length(24),
});

