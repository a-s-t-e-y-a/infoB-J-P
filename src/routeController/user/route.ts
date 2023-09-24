import express  from "express";
import { creatUser } from "./controller/create";
import { loginUser } from "./auth/login";

const auth = express.Router()

auth.post('/',creatUser)
auth.post('/login',loginUser)
auth.put('/:id')
auth.delete('/:id')

export default auth