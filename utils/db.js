import mongoose from 'mongoose';
import  { connect } from 'mongoose';

const dbconnect= async ()=>{
    try{
        const response = await mongoose.connect(process.env.MONGODB_URI)
      
            console.log("DB connected")

        }
       
    
    catch{
        console.log('connection error')
    }
}

export default dbconnect