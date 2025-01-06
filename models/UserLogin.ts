import mongoose, { Schema } from 'mongoose'

const UserLoginSchema = new Schema({
    email: {type: String, required: true, trim: true},
    password: { type: String, required: true, trim: true, unique: true}
})

const UserLoginModel = mongoose.model('UserLogin', UserLoginSchema)

export default UserLoginModel
