import * as mongoose from 'mongoose';


export const AirQualitySchema = new mongoose.Schema({
    ts: {
        type: String,
        required: true
    },
    aqius: {
        type: Number,
        required: true
    },
    mainus: {
        type: String,
        required: true
    },
    aqicn: {
        type: Number,
        required: true
    },
    maincn: {
        type: String,
        required: true
    },
    city: String,
    date: String,
    time: String,
    active: {
        type: Boolean,
        default: true
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
})