import express from 'express'
import auth from './routeController/user/route'
import karykarta from './routeController/karyakarta/route'
import sector from './routeController/sector/route'
import polling from './routeController/polling/route'
import mundal from './routeController/madal/route'
import villageRoute from './routeController/village/villageRouter'
import blogRouter from './routeController/blog/route'
const mainRouter = express.Router()

mainRouter.use('/user',auth)
mainRouter.use('/karykarta', karykarta)
mainRouter.use('/sector', sector)
mainRouter.use('/poolingBooth', polling)
mainRouter.use('/mundal',mundal)
mainRouter.use('/village',villageRoute)
mainRouter.use('/blog',blogRouter)

export default mainRouter
