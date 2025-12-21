"use client";

import { useLayoutEffect, useRef, useEffect } from "react";
import styles from "@/styles/pages/product.module.scss";
import Intercalaire from "./Intercalaire";
import { Product } from "@/features/product/types/product";
import { useProductStore } from "@/features/product/stores/useProductStore";
import { useRouter, useSearchParams } from "next/navigation";
import ProductDefinition from "./ProductDefinition";

type Props = {
    product: Product;
};

const ProductDetail = ({ product }: Props) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const active = useProductStore((state) => state.active);
    const setActive = useProductStore((state) => state.setActive);

    const ref = useRef<HTMLElement | null>(null);

    // Met à jour la hauteur CSS
    useLayoutEffect(() => {
        if (!ref.current) return;
        const height = ref.current.offsetHeight;
        document.documentElement.style.setProperty(
            "--product-detail-height",
            `${height}px`
        );
    }, []);

    // Sync store avec param ?views=
    useEffect(() => {
        const view = searchParams.get("views");
        if (view && view !== active) {
            setActive(view as typeof active);
        }
    }, [searchParams, active, setActive]);

    const handleClick = (variant: typeof active) => {
        setActive(variant);
        router.replace(`?views=${variant}`); // change l'URL sans reload
    };

    const intercalaires = [
        { title: "produit.", variant: "produits" },
        { title: "galerie.", variant: "galerie" },
        { title: "informations.", variant: "informations" },
    ] as const;

    return (
        <section ref={ref} className={styles.product__details}>
            <ul className={styles.product__selector}>
                <p style={{ width: "48px", borderTop: "1px solid black" }}>r</p>
                {intercalaires.map((item) => (
                    <Intercalaire
                        key={item.variant}
                        title={item.title}
                        variant={item.variant}
                        isActive={active === item.variant}
                        onClick={handleClick}
                    />
                ))}
            </ul>

            <div className={styles.product__details__container}>
                <div className={styles.product__details__header}>
                    <h1>{product.name}</h1>
                    <ul>
                        <li>color</li>
                    </ul>
                </div>
                <ProductDefinition />
                <div className={styles.product__details__purchase}>
                    <h1 className={styles.product__price}>
                        {product.price_cents} €
                    </h1>
                    <button className={styles.product__cta}>acheter.</button>
                </div>
            </div>
        </section>
    );
};

export default ProductDetail;
