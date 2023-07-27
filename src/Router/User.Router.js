import  Express  from "express";
import { getUserById, registerUser, searchUsers} from "../Controllers/User.controllers.js";
import { validID } from "../Middleware/Global.Middleware.js";
const Router = Express.Router();

Router.post('/resgiter', registerUser)
Router.get('/search', searchUsers)
Router.get('/:id', validID, getUserById)



export default Router
