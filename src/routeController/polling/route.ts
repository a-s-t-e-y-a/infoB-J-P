import express  from "express";
import { verifyToken } from "src/middleware/auth";



const polling = express.Router()

polling.post('/',verifyToken,createpolling)
polling.get('/',verifyToken, getAllpollings)
polling.get('/:id',verifyToken, getpollingById)
polling.put('/:id', verifyToken, editpolling)
polling.delete('/:id', verifyToken, deletepolling)

export default polling