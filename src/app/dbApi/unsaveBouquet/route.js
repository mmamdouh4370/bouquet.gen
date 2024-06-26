import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(request){
    try {
        const url = new URL(request.url);
        const userId = url.searchParams.get('userId');
        const bouquetId = url.searchParams.get('bouquetId');
        const result = await prisma.SavedBouquet.delete({
            where : {
                id: parseInt(bouquetId)
            },
        })

        return NextResponse.json({"message": "Bouquet unsaved successfully"}, { status: 200 });
    } catch (error){
        console.error("Error unsaving:", error);
        return NextResponse.json({ status: "error", error: error.message }, { status: 500 });
    }
}