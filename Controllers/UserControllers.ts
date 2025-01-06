import express from 'express'

import {
    registerUser_Serv,
    loginUser_Serv
} from '../Services/UserServices.js'

import {
    AlreadyInDatabaseError,
    NotFoundError,
    ServerError,
    IncorrectPasswordError
} from '../Errors/Errors.js'


const registerUser_Cont = async (req: express.Request, res: express.Response) => {
    try {
        await registerUser_Serv(req.body)

        res.status(201).send("Successfully registered")

    } catch (error) {
        if (error instanceof AlreadyInDatabaseError) {
            res.status(409).send(error.message)
        }
        else if (error instanceof ServerError) {
            res.status(500).send(error.message)
        }
        else if (error instanceof Error) {
            res.status(500).send(error.message)
        }
    }
}

const loginUser_Cont = async (req: express.Request, res: express.Response) => {
    try {
        await loginUser_Serv(req.body)

        res.status(200).send("Successfully logged in")

    } catch (error) {
        if (error instanceof NotFoundError) {
            res.status(404).send(error.message)
        }

        else if (error instanceof IncorrectPasswordError) {
            res.status(401).send(error.message)
        }
        else if (error instanceof ServerError) {
            res.status(500).send(error.message)
        }
        else if (error instanceof Error) {
            res.status(500).send(error.message)
        }
    }
}

export {
    registerUser_Cont,
    loginUser_Cont
}
