import { NextFunction, Request, Response } from 'express'
import { HttpException, StatusCode } from '../exceptions'
import prisma from '../services/prisma'
import { PrismaModelName } from '../types'
import catchAsync from '../utils/catchAsync.util'

// ###########################################################
// CAUTION: use prisma.$queryRawUnsafe may cause sql-injection
// Run first, Fix later!!!
// ###########################################################

const getAll = (modelName: PrismaModelName) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await prisma.$queryRawUnsafe(`SELECT * FROM ${modelName}`)

    res.status(200).json({
      data: {
        [modelName]: doc,
      },
    })
  })

const body = {
  username: 'john doe',
  age: 10,
}

// Awwwwwwwwwwwwwwwwwwwwwwwww, I hate prisma

const insertQueryGenerate = (modelName: PrismaModelName, data: object) => {
  const values = Object.values(data)
    .map((v) => {
      if (typeof v === 'string') return `'${v}'`
      return v
    })
    .join(', ')
  const fields = Object.keys(data).join(', ')
  const query = `INSERT INTO ${modelName} (${fields}) VALUES (${values})`
  return query
}

const updateQueryGenerate = (modelName: PrismaModelName, data: object, id: string) => {
  // let set = `(${fields}) = (${values})`
  let set = Object.entries(data)
    .map((e) => `${e[0]} = '${e[1]}'`)
    .join(', ')
  const query = `UPDATE ${modelName} SET ${set} WHERE id = ${id}`
  return query
}

const getOne = (modelName: PrismaModelName) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await prisma.$queryRawUnsafe(`SELECT * FROM ${modelName} WHERE id='${req.body.id}'`)

    if (!doc) return next(new HttpException('NoDataFound', 'No data found', StatusCode.NotFound))

    res.status(200).json({
      data: {
        [modelName]: doc,
      },
    })
  })

const createOne = (modelName: PrismaModelName) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const query = insertQueryGenerate(modelName, req.body)

    const doc = await prisma.$executeRawUnsafe(query)

    res.status(200).json({
      data: {
        [modelName]: doc,
      },
    })
  })

const updateOne = (modelName: PrismaModelName) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const query = updateQueryGenerate(modelName, req.body, req.params.id)
    console.log(query)
    const doc = await prisma.$executeRawUnsafe(query)

    if (!doc) return next(new HttpException('NoDataFound', 'No data found with that ID', StatusCode.Forbidden))

    res.status(200).json({
      data: {
        [modelName]: doc,
      },
    })
  })

const deleteOne = (modelName: PrismaModelName) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await prisma.$executeRawUnsafe(`DELETE FROM ${modelName} WHERE id = '${req.params.id}'`)

    if (!doc) return next(new HttpException('NoDataFound', 'No data found with that ID', StatusCode.Forbidden))

    res.status(200).json({
      data: {
        [modelName]: doc,
      },
    })
  })

const factory = {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
}

const namedFactory = (modelName: PrismaModelName) => {
  return {
    getAll: getAll(modelName),
    getOne: getOne(modelName),
    createOne: createOne(modelName),
    updateOne: updateOne(modelName),
    deleteOne: deleteOne(modelName),
  }
}

export { factory, namedFactory }
