import  Express  from "express";
import { getUserById, registerUser, searchUsers, update } from "../Controllers/User.controllers.js";
import { validID } from "../Middleware/Global.Middleware.js";
import { AuthMiddleware } from "../Middleware/auth.Middleware.js"
const Router = Express.Router();

Router.post('/resgiter', registerUser)
Router.get('/search', searchUsers)
Router.get('/:id', validID, getUserById)
Router.patch('/update', AuthMiddleware, update)



export default Router
