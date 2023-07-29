import express from 'express'
import { login } from '../Controllers/Auth.controllers.js'
const Router = express.Router()

Router.post("/login", login)

export default Router