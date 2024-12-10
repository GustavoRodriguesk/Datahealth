import {PrismaClient} from '@prisma/client'
import {z} from 'zod'

const prisma = new PrismaClient()

const accountSchema = z.object({
    id: z.number({
            invalid_type_error: "O id deve ser um valor numérico",
            required_error: "O id é obrigatório"
        })
        .positive({message: "O id deve ser um número positivo maior que 0"}),
    public_id: z.string({
            invalid_type_error: "O public_id deve ser uma string",
            required_error: "O public_id é obrigatório"
        }),  
    name: z.string({
            invalid_type_error: "O nome deve ser uma string",
            required_error: "O nome é obrigatório"
        })
        .min(3, {message: "O nome deve ter ao menos 3 caracter"})
        .max(100, {message: "O nome deve ter no máximo 100 caracteres"}),
    email: z.string({
            invalid_type_error: "O email deve ser uma string",
            required_error: "O email é obrigatório"
        })
        .email({message: "Email inválido"})
        .max(200, {message: "O email deve ter no máximo 200 caracteres"}),    
    avatar: z.string({
            invalid_type_error: "O avatar deve ser uma string"
        })
        .url({message: "Url Inválida"})
        .min(11, {message: "O avatar deve ter no mínimo 11 caracteres"})
        .max(1000, {message: "O avatar deve ter no máximo 1000 caracteres"})
        .optional(),
    pass: z.string({
            invalid_type_error: "A senha deve ser uma string",
            required_error: "A senha é obrigatória"
        })
        .min(6, {message: "A senha deve ter ao menos 6 caracter"})
        .max(500, {message: "A senha deve ter no máximo 500 caracteres"}),
        age: z.number({
            invalid_type_error: "A idade deve ser um número",
            required_error: "A idade é obrigatória"
        })
        .int({ message: "A idade deve ser um número inteiro" }) 
        .positive({ message: "A idade deve ser um número positivo" })  
        .min(1, { message: "A idade deve ser maior que 0" }),  

    ethnicity: z.string({
            invalid_type_error: "A etnia deve ser uma string",
            required_error: "A etnia é obrigatória"
        })
        .min(2, { message: "A etnia deve ter pelo menos 2 caracteres" })  
        .max(50, { message: "A etnia deve ter no máximo 50 caracteres" }),

    gender: z.string({
    invalid_type_error: "o genero deve ser uma string",
    required_error: "o genero é obrigatório"
})
.min(2, { message: "o genero deve ter pelo menos 2 caracteres" })  
.max(50, { message: "o genero deve ter no máximo 50 caracteres" }),
blood_type: z.string({
    invalid_type_error: "o tipo sanguineo deve ser uma string",
    required_error: "o tipo sanguineo é obrigatório"
})
.min(2, { message: "o tipo sanguineo deve ter pelo menos 2 caracteres" })  
.max(50, { message: "o tipo sanguineo deve ter no máximo 50 caracteres" })
})
export const userValidateToCreate = (account) => {
    const partialAccountSchema = accountSchema.partial({id: true, public_id: true})
    return partialAccountSchema.safeParse(account)
}

export const userValidateToLogin = (account) => {
    const partialAccountSchema = accountSchema.partial({id: true, public_id: true, name: true, phone: true, address: true, age: true, birth_date: true, gender: true, marital_status: true, blood_type: true, ethnicity: true, height: true, weight: true, chronic_conditions: true, allergies: true, emergency_contact: true, insurance_provider: true, insurance_number: true, smoker: true, pregnancy_status: true, avatar: true, registered_by: true});
    return partialAccountSchema.safeParse(account)
}

export const getByPublicId = async (public_id) => {
    const user = await prisma.user.findUnique({
        where: {
            public_id
        }
    })
    return user
}

export const getById = async (id) => {
    const user = await prisma.user.findUnique({
        where: {
            id
        }
    })
    return user
}

export const getByEmail = async (email) => {
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })
    return user
}

export const signUp = async (user) => {
    const result = await prisma.user.create({
        data: user
    })
    return result
}
export const listUsers = async (page = 1, limit = 10) => {
    try {
        const users = await prisma.user.findMany({
            skip: (page - 1) * limit,
            take: limit,
        });
        return users;
    } catch (error) {
        console.error('Erro ao listar usuários:', error);
        throw new Error('Erro ao listar usuários');
    }
};