import {User} from '../Model/User.js'

export const createService = (body) => User.create(body)