import express from "express"
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
dotenv.config();
import cors from "cors"
import  dbconnect  from "./utils/db.js"
import router from "./routes/index.js";

const app= express()
const port =3000

app.use(cors(
    {
         origin: ["http://localhost:5173","https://frntend-e-50-touchmenot.vercel.app"],
          credentials: true,
          methods:["GET","PUT","POST","DELETE","OPTION"]

    }
))
app.use(express.json())
app.use(cookieParser())

dbconnect()

app.get('/',(req,res)=>{
    res.send('this is a welcome msg ')
})

app.use('/api',router)

app.listen(port,()=>{
    console.log(`port listening to http://localhost:${port}`)
})