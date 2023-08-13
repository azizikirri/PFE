import mongoose from 'mongoose'


const {Schema,model} = mongoose


const quizSchema = Schema({

    userId:{
        type:String,
        required:true,
        
    },

    QuizId:{
        type:String,
        required:true,
        
    },

    QuizRes:{
        type:Number,
        required:true
    },
    
    quizTitle:{
        type:String,
        required:true
    }
    
})
const Res = mongoose.model('Res',quizSchema)
export default Res