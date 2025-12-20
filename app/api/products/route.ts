import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const products = await prisma.product.findMany({
        select: {
            slug: true,
            name: true,
            polaroid_url: true,
            main_image_url: true,
            published: true,
        },
        where: { published: true },
    });
    return NextResponse.json(products);
}
