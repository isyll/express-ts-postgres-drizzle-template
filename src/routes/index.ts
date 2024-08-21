import { Router } from 'express'

import Paths from '../common/Paths'
import UserRoutes from './UserRoutes'

const apiRouter = Router()

const userRouter = Router()

userRouter.get(Paths.Users.Get, UserRoutes.getAll)
userRouter.post(Paths.Users.Add, UserRoutes.add)

apiRouter.use(Paths.Users.Base, userRouter)

export default apiRouter
