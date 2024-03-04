import { Schema, model } from 'mongoose';

const companySchema = Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'category',
        required: true
    },
    impact: {
        type: String,
        uppercase: true,
        enum: ['HIGH', 'MEDIUM','LOW'],
        required: true      
    }
}, {
    versionKey: false 
})

export default model('company', companySchema)