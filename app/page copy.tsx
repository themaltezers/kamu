"use client";

import { useEffect, useState } from "react";
import styles from "@/styles/pages/home.module.scss";
import Polaroid from "@/components/Card/Polaroid";
import { ProductThumbnail } from "@/features/product/types/product";

export default function Home() {
    const [products, setProducts] = useState<ProductThumbnail[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/products", { cache: "no-store" })
            .then((res) => {
                if (!res.ok) throw new Error(`Erreur ${res.status}`);
                return res.json();
            })
            .then((data: ProductThumbnail[]) =>
                setProducts(
                    data.map((p) => ({
                        slug: p.slug,
                        name: p.name,
                        thumbnail: p.polaroid_url || p.main_image_url || null,
                    }))
                )
            )
            .catch((err) => console.error("Erreur fetch produits:", err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Chargement des produits...</p>;

    return (
        <main className={styles.home}>
            {products.map((product) => (
                <Polaroid
                    key={product.slug}
                    slug={product.slug}
                    name={product.name}
                    thumbnail={product.thumbnail}
                />
            ))}
        </main>
    );
}
