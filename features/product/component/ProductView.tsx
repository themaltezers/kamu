"use client";

import { useEffect } from "react";
import { useProductStore } from "@/features/product/stores/useProductStore";
import { Product } from "@/features/product/types/product";
import ProductGallery from "@/features/product/component/ProductGallery";
import ProductImage from "@/features/product/component/ProductImage";

type Props = {
    product: Product;
};

const ProductView = ({ product }: Props) => {
    const active = useProductStore((state) => state.active);
    const setActive = useProductStore((state) => state.setActive);

    // Force la vue par défaut sur "produits" au chargement
    useEffect(() => {
        setActive("produits");
    }, [setActive]);

    const views: Record<string, React.JSX.Element> = {
        produits: (
            <ProductImage src={product.main_image_url} alt={product.name} />
        ),
        galerie: <ProductGallery product={product} />,
        informations: (
            <ul>
                <li>SKU: {product.sku}</li>
                <li>Type: {product.type}</li>
                <li>Tags: {product.tags.join(", ")}</li>
                <li>Publié: {product.published ? "Oui" : "Non"}</li>
            </ul>
        ),
    };

    return <>{views[active]}</>;
};

export default ProductView;
