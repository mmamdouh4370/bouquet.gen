import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";


export async function POST(request){
    // const res = await request.json();
    // const {id} = res;
    // const result = await prisma.user.create({
    //     data : {
    //         id : id,
    //     },
    // })
    console.log("hit!");
    return ({"status": "success", "message": "Integrate Flask Framework with Next.js"});
}