import  express, { urlencoded } from "express";
import dotenv from 'dotenv';
import cors from 'cors'
dotenv.config();
import cookieParser from "cookie-parser";
const port = process.env.PORT || 5000;
import userRoutes from  './routes/userRoutes.js'
import { notFound,errorHandler } from "./middleware/errorMiddlware.js";
import ConnToDB from "./config/DB.js";

ConnToDB();
const app = express();
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(urlencoded({
    extended:true
}))
app.use(cookieParser())
app.use('/api/users',userRoutes)
// anything started with /api/users will be connected to userRoutes




app.get('/',(req,res)=>res.send('server is ready'));

app.use(notFound)
app.use(errorHandler)
app.listen(port,()=>console.log(`Server running on port : ${port}`));