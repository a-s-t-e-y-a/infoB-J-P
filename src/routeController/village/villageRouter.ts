import express from 'express'
import { verifyToken } from 'src/middleware/auth'
import { getVillageById, getVillages } from './controller/get'
import { createVillage } from './controller/create'
import { updateVillage } from './controller/edit'
import { deleteVillage } from './controller/delete'

const villageRoute = express.Router()

villageRoute.get('/', verifyToken,getVillages)
villageRoute.post('/', verifyToken,createVillage)
villageRoute.put('/:id', verifyToken,updateVillage)
villageRoute.get('/:id', verifyToken,getVillageById)
villageRoute.delete('/:id' , verifyToken,deleteVillage)

export default villageRoute
