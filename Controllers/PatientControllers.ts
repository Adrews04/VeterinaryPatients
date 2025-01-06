import express from 'express'

import {
    addPatient_Ser,
    getPatients_Ser,
    getPatient_Ser,
    updatePatient_Ser,
    deletePatient_Ser
} from "../Services/PatinetServices.js"

import {
    AlreadyInDatabaseError,
    NotFoundError,
    ReadingError,
    NonInDatabaseError,
    ServerError
} from '../Errors/Errors.js'


const addPatient_Cont = async (req: express.Request, res: express.Response) => {
    try {
        addPatient_Ser(req.body)
        res.status(201).json({ message: "Patient added successflly" })
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

const getPatients_Cont = async (_req: express.Request, res: express.Response) => {
    try {
        const patients = await getPatients_Ser()
        res.status(200).json(patients)

    } catch (error) {
        if (error instanceof NotFoundError) {
            res.status(404).send(error.message)
        }
        else if (error instanceof ReadingError) {
            res.status(503).send(error.message)
        }
        else if (error instanceof Error) {
            res.status(500).send(error.message)
        }
    }
}

const getPatient_Cont = async (req: express.Request, res: express.Response) => {
    try {
        const patient = await getPatient_Ser(req.params.id)
        res.status(200).send(patient)

    } catch (error) {
        if (error instanceof NonInDatabaseError) {
            res.status(404).send(error.message)
        }
        else if (error instanceof ReadingError) {
            res.status(503).send(error.message)
        }
        else if (error instanceof Error) {
            res.status(500).send(error.message)
        }
    }
}

const updatePatient_Cont = async (req: express.Request, res: express.Response) => {
    try {
        await updatePatient_Ser(req.params.id, req.body)
        res.status(204).send()

    } catch (error) {
        if (error instanceof NotFoundError) {
            res.status(404).send(error.message)
        }
        else if (error instanceof ServerError) {
            res.status(500).send(error.message)
        }
        else if (error instanceof Error) {
            res.status(500).send(error.message)
        }
    }
}

const deletePatient_Cont = async (req: express.Request, res: express.Response) => {
    try {
        await deletePatient_Ser(req.params.id)
        res.status(204).send()

    } catch (error) {
        if (error instanceof NotFoundError) {
            res.status(404).send(error.message)
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
    addPatient_Cont,
    getPatients_Cont,
    getPatient_Cont,
    updatePatient_Cont,
    deletePatient_Cont
}
