import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request){
    try {
        const res = await request.json();
        const {userId, bouquet} = res;
        const result = await prisma.SavedBouquet.create({
            data : {
                bouquet: bouquet,
                userId: userId
            },
        })
        console.log("hit!");
        return NextResponse.json({result})
    } catch (error){
        console.error("Error creating user:", error);
        return NextResponse.json({ status: "error", error: error.message }, { status: 500 });
    }
}