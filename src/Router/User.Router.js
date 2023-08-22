import  Express  from "express";
import { getUserById, registerUser, searchUsers, update, } from "../Controllers/User.controllers.js";
import { validID } from "../Middleware/Global.Middleware.js";
import { AuthMiddleware } from "../Middleware/auth.Middleware.js"
import multer, { memoryStorage } from 'multer'
import { uploadImageUser } from '../Service/User.Service.js'
const Multer = multer({
    storage: multer.memoryStorage(),
    limits: 1024 * 1024,
})
const Router = Express.Router();

Router.post('/resgiter', registerUser)
Router.get('/search', searchUsers)
Router.get('/:id', validID, getUserById)
Router.patch('/update', Multer.single("imagem"), uploadImageUser, AuthMiddleware, update)



export default Router
