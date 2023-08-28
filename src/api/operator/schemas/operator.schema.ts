import * as mongoose from 'mongoose';
import { TransferServiceEnum } from 'src/utils/enums/transferService.enum';


export const OperatorSchema = new mongoose.Schema({
    label: {
        type: String,
        enum :TransferServiceEnum,
        required : true,
        index: true
    },
    comissionIn: {
        type: String,
        required : true
    },
    comissionOut: {
        type: String,
        required : true
    },
    logo: String,
    active: {
        type: Boolean,
        default: true
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
})