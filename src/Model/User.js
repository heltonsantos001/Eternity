import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        require: true,
        select: false,
    }

})
    
userSchema.pre('save', async function (next) {

    this.userSchema = await bcrypt.hash(this.password, 10)
    next()
})

export const User = mongoose.model("User", userSchema)
