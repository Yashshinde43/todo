import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        const connection = await mongoose.connect("mongodb+srv://yashshinde4343:60BYkshDQUcjyD72@cluster0.myrs5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log(`MongoDB Connected: ${connection.connection.host}`);
    } catch (error) {
        console.log("Error from database side", error.messasge);
    }
}
export default connectDB;