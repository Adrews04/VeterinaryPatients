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
    specie: Joi.string().max(50).required(),
    race: Joi.string().max(50).required(),
    age: Joi.number().min(0).required(),
    ownerName: Joi.string().max(50).required(),
    phone: Joi.string().min(10).max(15).required()
})

const validatePatient = (req:express.Request, res:express.Response, next:express.NextFunction) => {
    const{error} = patientSchema.validate(req.body, {abortEarly: false})

    if(error){
        res.status(400).json ({
            message: "Validation error",
            details: error.details.map((detail) => detail.message)
        })
        return
    }
    next()
}

patientsRouter.post('/patients', validatePatient, addPatient_Cont)
patientsRouter.get('/patients', getPatients_Cont)
patientsRouter.get('/patients/:id', getPatient_Cont)
patientsRouter.put('/patients/:id', updatePatient_Cont)
patientsRouter.delete('/patients/:id', deletePatient_Cont)   

export default patientsRouter