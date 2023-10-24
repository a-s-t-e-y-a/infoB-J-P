import express from 'express'
import { verifyToken } from 'src/middleware/auth'
import { createPost } from './controller/createBlog'
import { getAllPosts } from './controller/getBlogAll'
import { getPostById } from './controller/getBlogById'
import { deletePost } from './controller/deleteBlog'
import { updatePost } from './controller/editBlog'

const blogRouter = express.Router()

blogRouter.post('/', verifyToken ,createPost)
blogRouter.get('/' ,verifyToken , getAllPosts)
blogRouter.get('/:id', verifyToken , getPostById)
blogRouter.delete('/:id'  , verifyToken, deletePost)
blogRouter.patch("/:id" ,verifyToken ,updatePost)

export default blogRouter

