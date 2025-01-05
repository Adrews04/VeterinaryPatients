import PatientModel from '../models/Patients.js'
import {
    AlreadyInDatabaseError,
    NotFoundError,
    ReadingError,
    NonInDatabaseError,
    ServerError
} from '../Errors/Errors.js'


const addPatient_Ser = async (patient: object) => {
    try {
        const newPatient = new PatientModel(patient)
        const existingPatient = await PatientModel.findOne({ name: newPatient.name}).lean()
        if (existingPatient){
            throw new AlreadyInDatabaseError('Patient')
        }
    }catch(error){
        if(error instanceof Error){
            throw error
        }
        throw new ServerError()
    }
}

const getPatients_Ser = async () => {
    try {
        const patients = await PatientModel.find({veterinaryID: 'current'})

        if(patients.length === 0){
            throw new NotFoundError('veterinary','Patients')
        }
        return patients

    }catch(error){
        if(error instanceof Error){
            throw error
        }
        throw new ReadingError('Patients')
    }
}

const getPatient_Ser = async (id: string) =>{
    try{
        const patient = await PatientModel.findById(id).lean()

        if(!patient){
            throw new NonInDatabaseError('Patient')
        }
        return patient

    }catch(error){
        if(error instanceof Error){
            throw error
        }
        throw new ReadingError('Patients')
    }
}

const updatePatient_Ser = async( id: String, patient: object) =>{
    try{
        const patientToUpdate = await PatientModel.findByIdAndUpdate(id, patient, {new: true}).lean()

        if(!patientToUpdate){
            throw new NotFoundError('Patient', "id")
        }

    }catch(error){
        if(error instanceof Error){
            throw error
        }
        throw new ServerError()
    }
}

const deletePatient_Ser = async (id: String) =>{
    try{
        const patientToDelete = await PatientModel.findByIdAndDelete(id).lean()
        if(!patientToDelete){
            throw new NotFoundError('Patient', 'id')
        }

    }catch(error){
        if(error instanceof Error){
            throw error
        }
        throw new ServerError()
    }
}

export {
    addPatient_Ser,
    getPatients_Ser,
    getPatient_Ser,
    updatePatient_Ser,
    deletePatient_Ser
}