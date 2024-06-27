import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request){
    try {
        const res = await request.json();
        const {id} = res;
        console.log(id);
        const isAlreadyUser = await prisma.user.findUnique({
            where: {
                id: id,
            }
        })
        console.log(id);
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
        return NextResponse.json({"message": "Bouquet unsaved successfully"}, { status: 200 });
    } catch (error){
        console.error("Error creating user:", error);
        return NextResponse.json({ status: "error", error: error.message }, { status: 500 });
    }
}