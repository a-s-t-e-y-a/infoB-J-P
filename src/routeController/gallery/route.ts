import express from 'express'
import { verifyToken } from '../../middleware/auth'
import upload from '../../middleware/upload'
import { postGallery } from './controller/create'
import { getGallery } from './controller/get'
import { deleteImage } from './controller/delete'

const gallery = express.Router()


gallery.post('/',verifyToken, upload.single('image'),postGallery)
gallery.get('/',getGallery)
gallery.delete('/:id',deleteImage)

export default gallery
