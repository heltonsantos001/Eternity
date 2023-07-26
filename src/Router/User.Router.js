import  Express  from "express";
import { create } from "../Controllers/User.controllers.js";
const Router = Express.Router();

Router.post('/', create)

export default Router
