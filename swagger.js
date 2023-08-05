import { resolve } from 'path';

const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'API Ecommerce Documentation',
            version: '1.0.0',
        },
    },
    apis: [resolve('docs/**/*.yaml')],
}

export default swaggerOptions