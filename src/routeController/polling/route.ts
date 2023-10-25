import express  from "express";
import { verifyToken } from "../../middleware/auth";
import { createPoolingBooth } from "./controller/create";

import { getAllPoolingBooths, getPoolingBoothById } from "./controller/get";
import { editPoolingBooth } from "./controller/edit";
import { deletePoolingBooth } from "./controller/delete";
import { Booth } from "./controller/addAdhyksha";




const polling = express.Router()

polling.post('/',verifyToken  ,createPoolingBooth)
polling.get('/', verifyToken,getAllPoolingBooths)
polling.get('/:id',verifyToken, getPoolingBoothById)
polling.put('/:id', verifyToken, editPoolingBooth)
polling.delete('/:id',verifyToken, deletePoolingBooth)
polling.post('/add',verifyToken,Booth)
export default polling
