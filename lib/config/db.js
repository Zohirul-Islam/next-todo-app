import mongoose from "mongoose"

export const connectDb =async()=>{
      await  mongoose.connect('mongodb+srv://bijoy123:bijoy123@cluster0.0r7ob7x.mongodb.net/todo');
      console.log("db connected")
}