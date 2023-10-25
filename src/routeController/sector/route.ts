import express  from "express";
import { verifyToken } from "../../middleware/auth";
import { createSector } from "./controller/create";
import { getAllSectors, getSectorById } from "./controller/get";
import { editSector } from "./controller/edit";
import { deleteSector } from "./controller/delete";
import { addRole } from "./controller/sectorAdd";



const sector = express.Router()

sector.post('/',verifyToken,createSector)
sector.get('/', verifyToken,getAllSectors)
sector.get('/:id', verifyToken, getSectorById)
sector.put('/:id',verifyToken, editSector)
sector.delete('/:id', verifyToken,deleteSector)
sector.post('/add',addRole)


export default sector
