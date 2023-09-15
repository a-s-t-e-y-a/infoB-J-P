import express from 'express'
import route from './routeController/user/route'
const mainRouter = express.Router()

mainRouter.use('/user',route)

export default mainRouter