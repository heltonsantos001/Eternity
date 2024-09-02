import Express from "express";
import UserRouter from "./src/Router/User.Router.js";
import AuthRouter from "./src/Router/Auth.Router.js";
import PostRouter from "./src/Router/Post.Router.js";
import multer from "multer"

const IMG_BB_API_KEY = 'b8a8b0cc6c40fa877dee7732d1d3f2a2'

import { connectMongoDb } from "./src/DataBase/DB.js";
import Dotenv from "dotenv";
import cors from 'cors'

const App = Express();
const PORT = process.env.PORT || 3008

Dotenv.config();
App.use(Express.json());

App.use(cors())
App.use('/User', UserRouter);
App.use('/auth', AuthRouter);
App.use('/Post', PostRouter);

connectMongoDb().then(() => {
    App.listen(PORT,'0.0.0.0', () => console.log('servidor rodando e banco de dados conectado'));
}).catch((error) => console.error(error));


