import express from 'express';
import { verifyToken } from '../../middleware/auth';
import { createMundal } from './controlller/create';
import { getAllMundals, getMundalById } from './controlller/get';
import { editMundal } from './controlller/edit';
import { deleteMundal } from './controlller/delete';

const mundal = express.Router();

mundal.post('/', createMundal);
mundal.get('/', getAllMundals);
mundal.get('/:id', getMundalById);
mundal.put('/:id', editMundal);
mundal.delete('/:id', deleteMundal);

export default mundal;
