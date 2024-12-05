import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const doctorSchema = z.object({
  id: z.number().positive({ message: "O id deve ser um número positivo maior que 0" }),
  name: z.string().min(3, { message: "O nome deve ter ao menos 3 caracteres" }).max(100),
  email: z.string().email({ message: "Email inválido" }).max(200),
  age: z.number().int({ message: "A idade deve ser um número inteiro" }).positive().min(18),
  gender: z.string().min(3).max(50),
  specialization: z.string().min(3).max(100),
  avatar: z.string().url({ message: "URL do avatar inválida" }).optional(),
});

// Função para buscar médico por ID
export const getDoctorById = async (id) => {
  if (!id) throw new Error("O parâmetro id é obrigatório.");
  try {
    const doctor = await prisma.doctor.findUnique({ where: { id } });
    if (!doctor) throw new Error(`Médico com id ${id} não encontrado.`);
    return doctor;
  } catch (error) {
    throw new Error(`Erro ao buscar médico com id ${id}: ${error.message}`);
  }
};

export const listDoctor = async (page = 1, limit = 10) => {
  try {
      const doctors = await prisma.doctor.findMany({
          skip: (page - 1) * limit,  
          take: limit,  
      });
      return doctors;
  } catch (error) {
      console.error('Erro ao listar usuários:', error);
      throw new Error('Erro ao listar usuários');
  }
};

// Função para criar um médico
export const createDoctor = async (doctor) => {
  try {
    const validatedDoctor = doctorSchema.omit({ id: true }).parse(doctor);
    return await prisma.doctor.create({ data: validatedDoctor });
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(`Erro de validação: ${error.errors.map(e => e.message).join(', ')}`);
    }
    throw new Error(`Erro ao criar médico: ${error.message}`);
  }
};

export const updateDoctor = async (id, doctorData) => {
  if (!id) throw new Error("O parâmetro id é obrigatório.");
  try {
    const validatedDoctorData = doctorSchema.omit({ id: true }).parse(doctorData);
    return await prisma.doctor.update({ where: { id }, data: validatedDoctorData });
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(`Erro de validação: ${error.errors.map(e => e.message).join(', ')}`);
    }
    throw new Error(`Erro ao atualizar médico com id ${id}: ${error.message}`);
  }
};

export const deleteDoctor = async (id) => {
  if (!id) throw new Error("O parâmetro id é obrigatório.");
  try {
    return await prisma.doctor.delete({ where: { id } });
  } catch (error) {
    throw new Error(`Erro ao excluir médico com id ${id}: ${error.message}`);
  }
};
