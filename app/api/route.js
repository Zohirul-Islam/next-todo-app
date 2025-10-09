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
    const { searchParams } = new URL(request.url);
    const page = Math.max(parseInt(searchParams.get("page")) || 1, 1);
    const limit = Math.max(parseInt(searchParams.get("limit")) || 5, 1);
    const skip = (page - 1) * limit;
    /* get total items and current page data */
    const [tatalItems,todos] = await Promise.all([
        TodoModel.countDocuments(),
        TodoModel.find()
        .sort({createdAt:-1})
        .skip(skip)
        .limit(limit)
    ])
    const totalPages = Math.max(Math.ceil(tatalItems / limit), 1);
    return NextResponse.json({
      success: true,
      currentPage: page,
      totalPages,
      tatalItems,
      limit,
      data: todos,
    });
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