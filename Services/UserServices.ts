import UserModel from '../models/Users.js'
import UserLoginModel from '../models/UserLogin.js'
import {
    AlreadyInDatabaseError,
    NotFoundError,
    ServerError,
    IncorrectPasswordError
} from '../Errors/Errors.js'


const registerUser_Serv = async (user: object) => {
    try {
        const newUser = new UserModel(user)
        const existingUser = await UserModel.findOne({ name: newUser.name }).lean()
        if (existingUser) {
            throw new AlreadyInDatabaseError('User')
        }
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

        const correctPassword = existingEmail.password === userToLogin.password

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