import express  from "express";
import { createKarykarta } from "./controlller/create";
import { verifyToken } from "../../middleware/auth";
import { editKarykarta } from "./controlller/edit";
import { deleteKarykarta } from "./controlller/delete";
import { getKarykarta } from "./controlller/get";
import { getKarykartaById } from "./controlller/getById";


const karykarta = express.Router()

karykarta.post('/',createKarykarta)
karykarta.get('/', getKarykarta)
karykarta.get('/:id', getKarykartaById)
karykarta.put('/:id', editKarykarta)
karykarta.delete('/:id', deleteKarykarta)

export default karykarta