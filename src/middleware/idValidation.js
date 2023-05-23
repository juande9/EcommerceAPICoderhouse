import z from 'zod';

export const idValidationUser = z.object({
  uid: z.string().min(24).max(24),
});

export const idValidationProduct = z.object({
  pid: z.string().min(24).max(24),
});

export const idValidationCart = z.object({
  cid: z.string().min(24).max(24),
});

