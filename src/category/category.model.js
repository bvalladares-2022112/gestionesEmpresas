import { Schema, model } from 'mongoose';

const categorySchema = Schema({
    category: {
        type: String,
        uppercase: true,
        enum: ['EDUCACION', 'ENTRETENIMIENTO','TECNOLOGIA','AGRICOLA','TRANSPORTE'],
        required: true
    },
    description: {
        type: String,
        required: true
    },
}, {
    versionKey: false 
})

export default model('category', categorySchema)