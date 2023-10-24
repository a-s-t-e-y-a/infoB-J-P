import express  from "express";
import { creatUser } from "./controller/create";
import { loginUser } from "./auth/login";
import { getUser } from "./controller/get"
import { deleteUser } from "./controller/delete";
const auth = express.Router()

auth.post('/',creatUser)
auth.post('/login',loginUser)
auth.put('/:id')
auth.delete('/:id',deleteUser)
auth.get('/',getUser)

export default auth
