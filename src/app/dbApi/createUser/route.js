import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";


export async function POST(request){
    try {
        console.log("hit!");
        const res = await request.json();
        const {id} = res;
        const isAlreadyUser = await prisma.user.findUnique({
            where: {
                id: id,
            }
        })
        
        if (isAlreadyUser != null){
            console.log(isAlreadyUser);
            return NextResponse.json({status: "User ID already exists"});
        }

        const result = await prisma.user.create({
            data : {
                id : id,
            },
        })

        return NextResponse.json({result});
    } catch (error){
        console.error("Error creating user:", error);
    return NextResponse.json({ status: "error", error: error.message }, { status: 500 });
    }
}