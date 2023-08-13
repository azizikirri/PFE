import mongoose from 'mongoose'
const ConnToDB = async () =>{
    try{
        const conn = await mongoose.connect(process.env.DB_MONGO_LOCAL)
        console.log(`connected to mongodb in the host : ${conn.connection.host}`);
    }catch(err){
        console.error(`Error : ${error.message}`);
        process.exit(1)
    }
}

export default ConnToDB