import express  from "express";
import { verifyToken } from "../../middleware/auth";
import { createPoolingBooth } from "./controller/create";

import { getAllPoolingBooths, getPoolingBoothById } from "./controller/get";
import { editPoolingBooth } from "./controller/edit";
import { deletePoolingBooth } from "./controller/delete";




const polling = express.Router()

polling.post('/',createPoolingBooth)
polling.get('/', getAllPoolingBooths)
polling.get('/:id', getPoolingBoothById)
polling.put('/:id', editPoolingBooth)
polling.delete('/:id', deletePoolingBooth)

export default polling