import mongoose from 'mongoose'

const sessionSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isActive: {
        type: Boolean,
        default: false
    },
    deviceID: {
        type: String,
        required: true
    }
},{timestamps:true});

const Session = mongoose.model('Session', sessionSchema)

export {Session};