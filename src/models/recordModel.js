import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { z } from 'zod';

// Definir o esquema de validação com Zod
const recordSchema = z.object({
  report: z.string().min(1, "O campo 'report' é obrigatório"),
  exam: z.string().min(1, "O campo 'exam' é obrigatório"),
  recipe: z.string().optional(),
  user_id: z.number().int().positive("O campo 'user_id' deve ser um número positivo"),
  date: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "O campo 'date' deve ser uma data válida",
  })
});

// Listar todos os registros
export const listRecords = async (public_id) => {
  const records = await prisma.record.findMany({
      orderBy: {
          id: 'desc'
      },
      where: {
          user: {
              public_id
          }
      }
  })
  return records
}


export const getByIdRecord = async (id) => {
  const record = await prisma.record.findUnique({
    where: {
      id
    }
  });
  return record;
}

export const create = async (recordData) => {
  const parsedData = recordSchema.safeParse(recordData);

  if (!parsedData.success) {
    throw new Error(`Erro de validação: ${JSON.stringify(parsedData.error.format())}`);
  }

  const result = await prisma.record.create({
    data: parsedData.data 
  });

  return result;
}

export const deleteRecord = async (id) => {
  const record = await prisma.record.delete({
    where: {
      id: id
    }
  });
  return record;
}

export const update = async (record) => {
  const parsedData = recordSchema.safeParse(record);

  if (!parsedData.success) {
    throw new Error(`Erro de validação: ${JSON.stringify(parsedData.error.format())}`);
  }

  const result = await prisma.record.update({
    data: parsedData.data,
    where: {
      id: parsedData.data.id
    }
  });

  return result;
}
