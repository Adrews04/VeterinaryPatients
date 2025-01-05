import mongoose, { Schema} from 'mongoose';

const PatientSchema = new Schema({
    name: { type: String, required: true, trim: true},
    specie: { type: String, required: true, trim: true},
    race: { type: String, required: true, trim: true},
    age: { type: Number, required: true, min: 0},
    ownerName: { type: String, required: true, trim: true},
    veterinaryID: { type: String, required: true, trim: true}
})

const PatientModel = mongoose.model('Patient', PatientSchema)

export default PatientModel