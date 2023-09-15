import express  from "express";
import { creatUser } from "./controller/create";

const route = express.Router()

route.post('/',creatUser)
route.get('/:id')
route.put('/:id')
route.delete('/:id')

export default route