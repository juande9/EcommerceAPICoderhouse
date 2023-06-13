import z from 'zod'

const productValidation = z.object({
    title: z.string().nonempty('El título es obligatorio'),
    description: z.string().nonempty('La descripción es obligatoria'),
    price: z.number().positive('El precio debe ser mayor a 0.'),
    code: z.string().nonempty('El código es obligatorio'),
    stock: z.number().positive('El stock debe ser mayor a 0.'),
    thumbnail: z.string().optional(),
})

export default productValidation