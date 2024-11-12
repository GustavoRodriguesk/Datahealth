import {PrismaClient} from '@prisma/client'
const prisma = new PrismaClient()
import { z } from 'zod';

const recordSchema = z.object({
  report: z.string().min(1, "O campo 'report' é obrigatório"),
  exam: z.string().min(1, "O campo 'exam' é obrigatório"),
  recipe: z.string().optional(),
  user_id: z.number().int().positive("O campo 'user_id' deve ser um número positivo"),
  date: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "O campo 'date' deve ser uma data válida",
  })
});

export const listRecords = async () => {
    const records = await prisma.record.findMany({
        orderBy: {
            id: 'desc'
        }
    })
    return records
}

export const getByIdRecord = async (id) => {
    const record = await prisma.record.findUnique({
        where: {
            id
        }
    })
    return record
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
  };

export const deleteRecord = async (id) => {
    const record = await prisma.record.delete({
        where: {
            id: id
        }
    })
    return record
}

export const update = async (record) => {
    const result = await prisma.record.update({
        data: record,
        where:{
           id: record.id 
        }
    })
    return result
}