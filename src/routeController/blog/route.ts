import express from 'express'
import { verifyToken } from '../../middleware/auth'
import { createPost } from './controller/createBlog'
import { getAllPosts } from './controller/getBlogAll'
import { getPostById } from './controller/getBlogById'
import { deletePost } from './controller/deleteBlog'
import { updatePost } from './controller/editBlog'
import upload from '../../middleware/upload'

const blogRouter = express.Router()

blogRouter.post('/', verifyToken ,upload.single('image'),createPost)
blogRouter.get('/' , getAllPosts)
blogRouter.get('/:id', getPostById)
blogRouter.delete('/:id'  , verifyToken, deletePost)
blogRouter.patch("/:id" ,verifyToken ,updatePost)

export default blogRouter

