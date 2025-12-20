import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface Params {
    params: { slug: string };
}

export async function GET(req: Request, { params }: Params) {
    const { slug } = await params;

    try {
        const product = await prisma.product.findUnique({
            where: { slug },
            include: {
                asset: true, // images / fichiers principaux
                product_variant: true, // variantes (couleur, dimension, matière, prix)
                product_feature: true, // caractéristiques
                product_image: true, // autres images du produit
            },
        });

        if (!product) {
            return NextResponse.json(
                { error: "Produit non trouvé" },
                { status: 404 }
            );
        }

        return NextResponse.json(product);
    } catch (err) {
        console.error("Erreur GET /api/products/[slug]:", err);
        return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
}
