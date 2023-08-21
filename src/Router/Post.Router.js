import express from 'express'
import { AuthMiddleware } from '../Middleware/auth.Middleware.js'
import { PostId, create, deletePost, updatePost, ByUser, likes, addcomments, deleteComments, findAll } from '../Controllers/Post.controllers.js'
import { validID } from '../Middleware/Global.Middleware.js'
import multer, { memoryStorage } from 'multer'
import { uploadImage } from '../Service/Post.Service.js'
const Multer = multer({
    storage: multer.memoryStorage(),
    limits: 1024*1024,
})
const Router = express.Router()

Router.get('/feed', findAll)
Router.post('/postagem', Multer.single("imagem"), uploadImage,AuthMiddleware, create)
Router.patch('/update/:id',validID, AuthMiddleware, updatePost)
Router.get('/:id', validID, PostId)
Router.delete('/delete/:id', validID, AuthMiddleware, deletePost)
Router.get('/', ByUser)
Router.patch('/like/:id', validID, AuthMiddleware, likes)
Router.patch('/comments/:id', validID, AuthMiddleware, addcomments)
Router.patch('/comments/:id/:idComment', validID, AuthMiddleware, deleteComments)



export default Router

