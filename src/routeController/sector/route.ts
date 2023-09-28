import express  from "express";
import { verifyToken } from "../../middleware/auth";
import { createSector } from "./controller/create";
import { getAllSectors, getSectorById } from "./controller/get";
import { editSector } from "./controller/edit";
import { deleteSector } from "./controller/delete";



const sector = express.Router()

sector.post('/',createSector)
sector.get('/', getAllSectors)
sector.get('/:id', getSectorById)
sector.put('/:id', editSector)
sector.delete('/:id', deleteSector)

export default sector