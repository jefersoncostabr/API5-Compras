import dotenv from "dotenv"
import mongoose from "mongoose";

async function conectaNaDataBase(){    
    // mongoose.connect("mongodb+srv://jefersonb88:wEljiOB6kAraQiBC@cluster0.ue0yro8.mongodb.net/livraria?retryWrites=true&w=majority&appName=Cluster0")    
    mongoose.connect(process.env.DB_CONNECTION_STRING)    
    return mongoose.connection
} 

export default conectaNaDataBase

