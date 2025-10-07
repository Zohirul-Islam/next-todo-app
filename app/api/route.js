import { connectDb } from "@/lib/config/db";
import TodoModel from "@/lib/config/models/todoModel";
import { NextResponse } from "next/server";

/* db connection */
const db = async()=>{
    await connectDb();
}
db();
/* getting all todos */
export async function GET(request){

    const todos = await TodoModel.find({});
   return NextResponse.json({todos:todos})
}
/* sending all todos on database  */
export async function POST(request){
    const {title,description} = await request.json();

    await TodoModel.create({
        title,
        description
    })
        
   return NextResponse.json({message:"Todo created"})
}
/* todos deleted */
export async function DELETE(request){
    const mongoId = await request.nextUrl.searchParams.get("mongoId");
    await TodoModel.findByIdAndDelete(mongoId)
        
   return NextResponse.json({message:"Todo deleted"})
}
export async function PUT(request){
    const mongoId = await request.nextUrl.searchParams.get("mongoId");
    await TodoModel.findByIdAndUpdate(mongoId,{
        $set:{
            isCompleted:true
        }
    })
        
   return NextResponse.json({message:"Todo Updated"})
}