import mongoose, { Schema } from 'mongoose'

const UserSchema = new Schema({
    name: { type:String, required: true, trim: true},
    email: {type: String, required: true, trim: true},
    password: { type: String, required: true, trim: true, unique: true},
    phone: { type: String, required: false, trim: true}
})

const UserModel = mongoose.model('User', UserSchema)

export default UserModel