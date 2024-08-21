import HttpStatusCodes from '@/common/HttpStatusCodes'
import UserService from '@/services/UserService'

import { insertUserSchema } from '@/repos/UserRepo'
import { Request, Response } from 'express'

async function getAll(_: Request, res: Response) {
  const users = await UserService.getAll()
  return res.status(HttpStatusCodes.OK).json({ data: users })
}

async function add(req: Request, res: Response) {
  const user = insertUserSchema.parse(req.body)
  const data = await UserService.addOne(user)
  return res.status(HttpStatusCodes.CREATED).json({ data })
}

export default {
  getAll,
  add,
} as const
