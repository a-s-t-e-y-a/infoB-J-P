import express from 'express'

const blogRouter = express.Router()

blogRouter.post('/')
blogRouter.get('/')
blogRouter.get('/:id')
blogRouter.delete('/:id')
blogRouter.patch("/:id")

export default blogRouter

