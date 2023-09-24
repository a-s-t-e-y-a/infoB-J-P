import express  from "express";
import { verifyToken } from "src/middleware/auth";
import { createMundal } from "./controlller/create";
import { getAllMundals, getMundalById } from "./controlller/get";
import { editMundal } from "./controlller/edit";
import { deleteMundal } from "./controlller/delete";



const mundal = express.Router()

mundal.post('/',verifyToken,createMundal)
mundal.get('/',verifyToken, getAllMundals)
mundal.get('/:id',verifyToken, getMundalById)
mundal.put('/:id', verifyToken, editMundal)
mundal.delete('/:id', verifyToken, deleteMundal)

export default mundal