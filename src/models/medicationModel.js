import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const medicationSchema = z.object({
    medicine: z.string().min(1, "O campo 'medicine' é obrigatório"),
    description: z.string().min(1, "O campo 'description' é obrigatório"),
    image: z.string().max(1000, "A URL da imagem não pode ser maior que 1000 caracteres").optional(),
    user_id: z.number().int().positive("O campo 'user_id' deve ser um número positivo"),
    period: z.number().int().positive("O campo 'period' deve ser um número positivo"),
    date: z.string().refine(val => !isNaN(Date.parse(val)), {
      message: "O campo 'date' deve ser uma data válida",
    }).optional()
  });

export const listMedications = async () => {
  const medications = await prisma.medication.findMany({
    orderBy: {
      id: 'desc', 
    },
  });
  return medications;
};

export const getByIdMedication = async (id) => {
  const medication = await prisma.medication.findUnique({
    where: {
      id,
    },
  });
  return medication;
};

export const createMedication = async (medicationData) => {
  const parsedData = medicationSchema.safeParse(medicationData);
  
  if (!parsedData.success) {
    throw new Error(`Erro de validação: ${JSON.stringify(parsedData.error.format())}`);
  }

  const result = await prisma.medication.create({
    data: parsedData.data,
  });

  return result;
};

export const deleteMedication = async (id) => {
  const medication = await prisma.medication.delete({
    where: {
      id,
    },
  });
  return medication;
};

export const updateMedication = async (medication) => {
  const result = await prisma.medication.update({
    data: medication,
    where: {
      id: medication.id,
    },
  });
  return result;
};
