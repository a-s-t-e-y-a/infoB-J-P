import express  from "express";
import { createKarykarta } from "./controlller/create";
import { verifyToken } from "src/middleware/auth";
import { editKarykarta } from "./controlller/edit";
import { deleteKarykarta } from "./controlller/delete";
import { getKarykarta } from "./controlller/get";
import { getKarykartaById } from "./controlller/getById";


const karykarta = express.Router()

karykarta.post('/',verifyToken,createKarykarta)
karykarta.get('/',verifyToken, getKarykarta)
karykarta.get('/:id',verifyToken, getKarykartaById)
karykarta.put('/:id', verifyToken, editKarykarta)
karykarta.delete('/:id', verifyToken, deleteKarykarta)

export default karykarta