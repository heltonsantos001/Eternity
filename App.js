import Express from "express";
import UserRouter from "./src/Router/User.Router.js";
import AuthRouter from "./src/Router/Auth.Router.js";
import PostRouter from "./src/Router/Post.Router.js";
import { connectMongoDb } from "./src/DataBase/DB.js";
import Dotenv from "dotenv";

const App = Express();
const PORT = 3008

Dotenv.config();
App.use(Express.json());

App.use('/User', UserRouter);
App.use('/auth', AuthRouter);
App.use('/Post', PostRouter);

connectMongoDb().then(() => {
    App.listen(PORT, () => console.log('servidor rodando e banco de dados conectado'));
}).catch((error) => console.error(error));


