import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const prisma = new PrismaClient()

const doctorSchema = z.object({
  id: z.number({
    invalid_type_error: "O id deve ser um valor numérico",
    required_error: "O id é obrigatório"
  })
    .positive({ message: "O id deve ser um número positivo maior que 0" }),

  public_id: z.string({
    invalid_type_error: "O public_id deve ser uma string",
    required_error: "O public_id é obrigatório"
  })
    .max(256, { message: "O public_id deve ter no máximo 256 caracteres" }),

  name: z.string({
    invalid_type_error: "O nome deve ser uma string",
    required_error: "O nome é obrigatório"
  })
    .min(3, { message: "O nome deve ter ao menos 3 caracteres" })
    .max(100, { message: "O nome deve ter no máximo 100 caracteres" }),

  email: z.string({
    invalid_type_error: "O email deve ser uma string",
    required_error: "O email é obrigatório"
  })
    .email({ message: "Email inválido" })
    .max(200, { message: "O email deve ter no máximo 200 caracteres" }),

  age: z.number({
    invalid_type_error: "A idade deve ser um número",
    required_error: "A idade é obrigatória"
  })
    .int({ message: "A idade deve ser um número inteiro" })
    .positive({ message: "A idade deve ser um número positivo" })
    .min(18, { message: "A idade deve ser maior que 17 anos" }),

  gender: z.string({
    invalid_type_error: "O gênero deve ser uma string",
    required_error: "O gênero é obrigatório"
  })
    .min(3, { message: "O gênero deve ter ao menos 3 caracteres" })
    .max(50, { message: "O gênero deve ter no máximo 50 caracteres" }),

  specialization: z.string({
    invalid_type_error: "A especialização deve ser uma string",
    required_error: "A especialização é obrigatória"
  })
    .min(3, { message: "A especialização deve ter ao menos 3 caracteres" })
    .max(100, { message: "A especialização deve ter no máximo 100 caracteres" }),

  avatar: z.string({
    invalid_type_error: "O avatar deve ser uma string"
  })
    .url({ message: "URL do avatar inválida" })
    .min(11, { message: "O avatar deve ter no mínimo 11 caracteres" })
    .max(1000, { message: "O avatar deve ter no máximo 1000 caracteres" })
    .optional(),
})

export const getDoctorById = async (id) => {
  const doctor = await prisma.doctor.findUnique({
    where: { id }
  })
  return doctor
}


export const listDoctor = async () => {
    try {
      const doctors = await prisma.doctor.findMany()
      return doctors
    } catch (error) {
      throw new Error(`Erro ao listar os médicos: ${error.message}`)
    }
  }
  
export const createDoctor = async (doctor) => {
  try {
    const validatedDoctor = doctorSchema.omit({ id: true }).parse(doctor) 
    
    const result = await prisma.doctor.create({
      data: validatedDoctor
    })
    return result
  } catch (error) {
    throw new Error(`Erro de validação: ${error.errors.map(e => e.message).join(', ')}`)
  }
}

export const updateDoctor = async (id, doctorData) => {
  try {
    const validatedDoctorData = doctorSchema.omit({ id: true }).parse(doctorData)

    const updatedDoctor = await prisma.doctor.update({
      where: { id },
      data: validatedDoctorData
    })
    return updatedDoctor
  } catch (error) {
    throw new Error(`Erro de validação: ${error.errors.map(e => e.message).join(', ')}`)
  }
}

export const deleteDoctor = async (id) => {
  try {
    const deletedDoctor = await prisma.doctor.delete({
      where: { id }
    })
    return deletedDoctor
  } catch (error) {
    throw new Error(`Erro ao excluir o médico com id ${id}: ${error.message}`)
  }
}
