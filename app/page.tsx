"use client";

import { useEffect } from "react";
import styles from "@/styles/pages/home.module.scss";
import Polaroid from "@/components/Card/Polaroid";
import { useProductStore } from "@/features/product/stores/useProductStore";

export default function Home() {
    const { allProducts, fetchProducts, loading } = useProductStore();

    useEffect(() => {
        fetchProducts(); // fetch si le store est vide
    }, [fetchProducts]);

    if (loading) return <p>Chargement des produits...</p>;
    if (!allProducts.length) return <p>Aucun produit disponible.</p>;

    return (
        <main className={styles.home}>
            <div className={styles.grid}>
                {allProducts.map((product) => (
                    <Polaroid
                        key={product.slug}
                        slug={product.slug}
                        name={product.name}
                        thumbnail={product.polaroid_url || null} // <-- ici
                    />
                ))}
            </div>
        </main>
    );
}
