import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const userSchema = mongoose.Schema({
    nom:{
        type:String,
        required:true
    },
    prenom:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
},{
    timestamps:true
})

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next()
    }
    
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

// return true or false if password matchs
userSchema.methods.matchPassword = async function(passEntered){
    return await bcrypt.compare(passEntered, this.password)
}




const User = mongoose.model('User',userSchema);
export default User;