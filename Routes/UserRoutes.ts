import express from 'express'
import Joi from 'joi'

import {
    registerUser_Cont,
    loginUser_Cont
} from '../Controllers/UserControllers.js'

const UsersRouter = express.Router()

const userSchema = Joi.object({
    name: Joi.string().max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    phone: Joi.string().min(10).max(15).optional()
})

const userToLoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
})

const validateUser = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { error } = userSchema.validate(req.body, { abortEarly: false })

    if (error) {
        res.status(400).json({
            message: "Validation error",
            details: error.details.map((detail) => detail.message)
        })
        return
    }
    next()
}

const validateLoginUser = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { error } = userToLoginSchema.validate(req.body, { abortEarly: false })

    if (error) {
        res.status(400).json({
            message: "Validation error",
            details: error.details.map((detail) => detail.message)
        })
        return
    }
    next()
}

UsersRouter.post('/register', validateUser, registerUser_Cont)
UsersRouter.post('/login', validateLoginUser, loginUser_Cont)

export default UsersRouter
