import express from 'express'
import { AuthMiddleware } from '../Middleware/auth.Middleware.js'
import { PostId, create, deletePost, updatePost, ByUser } from '../Controllers/Post.controllers.js'
import { validID } from '../Middleware/Global.Middleware.js'

const Router = express.Router()

Router.post('/postagem', AuthMiddleware, create)
Router.patch('/update/:id',validID, AuthMiddleware, updatePost)
Router.get('/:id', PostId)
Router.delete('/delete/:id', validID, AuthMiddleware, deletePost)
Router.get('/', AuthMiddleware, ByUser)

export default Router

