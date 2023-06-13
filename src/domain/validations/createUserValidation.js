import z from 'zod'

const createUserValidation = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    age: z.number().min(18),
    password: z.string().min(8)
})

export default createUserValidation