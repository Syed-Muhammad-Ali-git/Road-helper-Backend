import mongoose from "mongoose";

export const conectMongoDB = () =>  mongoose
.connect(process.env.MONGODB_URL)
.then(()=> console.log("MongoDB Connected"))
.catch((e)=> console.log("Err while mongodb connection: ",e))