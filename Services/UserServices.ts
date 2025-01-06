import UserModel from '../models/Users.js'
import UserLoginModel from '../models/UserLogin.js'
import {
    AlreadyInDatabaseError,
    NotFoundError,
    ServerError,
    IncorrectPasswordError
} from '../Errors/Errors.js'
import bcrypt from 'bcrypt'


const registerUser_Serv = async (user: object) => {
    try {
        const newUser = new UserModel(user)
        const existingUser = await UserModel.findOne({ name: newUser.name }).lean()
        if (existingUser) {
            throw new AlreadyInDatabaseError('User')
        }
        newUser.password = await bcrypt.hash(newUser.password, 10)
        await newUser.save()
    } catch (error) {
        if (error instanceof Error) {
            throw error
        }
        throw new ServerError()
    }
}

const loginUser_Serv = async (user: object) => {
    try {
        const userToLogin = new UserLoginModel(user)
        const existingEmail = await UserModel.findOne({ email: userToLogin.email }).lean()

        if (!existingEmail) {
            throw new NotFoundError('User', 'email')
        }

        const correctPassword = await bcrypt.compare(userToLogin.password, existingEmail.password)

        if (!correctPassword) {
            throw new IncorrectPasswordError()
        }
    } catch (error) {
        if (error instanceof Error) {
            throw error
        }
        throw new ServerError()
    }
}

export {
    registerUser_Serv,
    loginUser_Serv
}