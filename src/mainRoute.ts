import express from 'express'
import auth from './routeController/user/route'
import karykarta from './routeController/karyakarta/route'
import sector from './routeController/sector/route'
import polling from './routeController/polling/route'
const mainRouter = express.Router()

mainRouter.use('/user',auth)
mainRouter.use('/karykarta', karykarta)
mainRouter.use('/sector', sector)
mainRouter.use('/poolingBooth', polling)

export default mainRouter