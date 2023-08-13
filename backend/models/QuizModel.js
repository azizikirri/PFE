import mongoose from 'mongoose'


const { Schema,  model } = mongoose


const quizSchema = Schema({


    quizTitle:{
        type:String,
        required:true
    },

    quizCreatorEmail:{
        type:String,
        required:true
    },

    quizCode:{
        type:Number,
        required:true
    },

    questions:{
        type:Array,
        required:true
    },

    time:{
        type:Number,
        required:true
    },
 
    
})


const Quiz = mongoose.model('Quiz',quizSchema)


export default Quiz