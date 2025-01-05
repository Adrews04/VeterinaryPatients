import express from 'express'
import Joi from 'joi'

import {
    addPatient_Cont,
    getPatients_Cont,
    getPatient_Cont,
    updatePatient_Cont,
    deletePatient_Cont
} from '../Controllers/PatientControllers.js'

const patientsRouter = express.Router()

const patientSchema = Joi.object({
    name: Joi.string().max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    phone: Joi.string().min(10).max(15).optional()
})

const validatePatient = (req:express.Request, res:express.Response, next:express.NextFunction) => {
    const{ error} = patientSchema.validate(req.body, {abortEarly: false})

    if(error){
        res.status(400).json ({
            message: "Validation error",
            details: error.details.map((detail) => detail.message)
        })
        return
    }
    next()
}

patientsRouter.post('/pacientes', validatePatient, addPatient_Cont)
patientsRouter.get('/pacientes', getPatients_Cont)
patientsRouter.get('/pacientes/:id', getPatient_Cont)
patientsRouter.put('/pacientes/:id', validatePatient, updatePatient_Cont)
patientsRouter.delete('/pacientes/:id', deletePatient_Cont)   

export default patientsRouter