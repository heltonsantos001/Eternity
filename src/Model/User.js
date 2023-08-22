import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    fotoPerfil: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    verified: {
        type: String,
        required: true,
    },
    founder: {
        type: String,
        required: true,
    }

})

userSchema.pre('save', async function (next) {

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

export const User = mongoose.model("User", userSchema)
