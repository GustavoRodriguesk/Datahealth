import {PrismaClient} from '@prisma/client'
const prisma = new PrismaClient()

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

export const create = async (record) => {
    const result = await prisma.record.create({
        data: record
    })
    return result
}

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