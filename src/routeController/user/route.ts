import express  from "express";
import { creatUser } from "./controller/create";
import { loginUser } from "./auth/login";
import { getUser } from "./controller/get"
import { deleteUser } from "./controller/delete";
import { updateUser } from "./controller/update";
const auth = express.Router()

auth.post('/',creatUser)
auth.post('/login',loginUser)
auth.put('/:id', updateUser)
auth.delete('/:id',deleteUser)
auth.get('/',getUser)

export default auth
