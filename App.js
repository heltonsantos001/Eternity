import Express from "express";
import UserRouter from "./src/Router/User.Router.js";
import { connectMongoDb } from "./src/DataBase/DB.js";
import Dotenv from "dotenv";

const App = Express();
const PORT = 4000

Dotenv.config()
App.use(Express.json())

App.use('/User', UserRouter);

connectMongoDb().then(() => {
    App.listen(PORT, () => console.log('servidor rodando e banco de dados conectado'))
}).catch((error) => console.error(error))


