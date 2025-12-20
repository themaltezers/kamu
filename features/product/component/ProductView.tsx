"use client";

import { useProductStore } from "@/features/product/stores/useProductStore";
import Image from "next/image";
import { Product } from "@/features/product/types/product";

type Props = {
    product: Product;
};

const ProductView = ({ product }: Props) => {
    const active = useProductStore((state) => state.active);

    const views: Record<string, React.JSX.Element> = {
        produits: product.main_image_url ? (
            <div className="">
                <Image
                    src={product.main_image_url}
                    alt={product.name}
                    width={0} // ou omets width/height
                    height={0}
                    style={{ width: "auto", height: "auto" }}
                />
            </div>
        ) : (
            <p>Image non disponible</p>
        ),
        galerie: product.product_image?.length ? (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                    flexWrap: "wrap",
                    padding: "16px 8px",
                }}
            >
                {product.product_image
                    .filter((img) => img.type === "GALLERY") // <-- on ne garde que les images GALLERY
                    .map((img) => (
                        <Image
                            key={img.id}
                            src={img.url}
                            alt={img.alt_text || product.name}
                            width={0}
                            height={0}
                            style={{ width: "100%", height: "auto" }}
                            unoptimized // <-- garde l'image originale telle quelle
                        />
                    ))}
            </div>
        ) : (
            <p>Pas d'images de galerie</p>
        ),

        informations: (
            <ul>
                <li>SKU: {product.sku}</li>
                <li>Type: {product.type}</li>
                <li>Tags: {product.tags.join(", ")}</li>
                <li>Publié: {product.published ? "Oui" : "Non"}</li>
                {/* Ici tu peux ajouter colors, price_cents, variantes, etc. */}
            </ul>
        ),
    };

    return <>{views[active]}</>;
};

export default ProductView;
