import express from 'express'
import auth from './routeController/user/route'
import karykarta from './routeController/karyakarta/route'
const mainRouter = express.Router()

mainRouter.use('/user',auth)
mainRouter.use('/karykarta', karykarta)

export default mainRouter