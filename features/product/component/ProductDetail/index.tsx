"use client";

import styles from "@/features/product/styles/productDetails.module.scss";
import { useEffect, useRef, memo } from "react";
import { Product } from "@/features/product/types/product";
import ProductDefinition from "@/features/product/component/ProductDetail/ProductDefinition";
import ProductSelector from "@/features/product/component/ProductDetail/ProductSelector";

type Props = {
    product: Product;
};

// Memoized components pour éviter les rerenders inutiles
const MemoizedSelector = memo(ProductSelector);
const MemoizedDefinition = memo(ProductDefinition);

const ProductDetail = ({ product }: Props) => {
    const ref = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (!ref.current) return;
        const height = ref.current.offsetHeight;
        document.documentElement.style.setProperty(
            "--product-detail-height",
            `${height}px`
        );
    }, []);

    return (
        <section
            ref={ref}
            className={styles.product__details}
            style={{
                backgroundColor: product.bg_color ?? "#ffffff",
                color: product.text_color ?? "#000000",
            }}
        >
            <MemoizedSelector />
            <div className={styles.product__details__container}>
                <div className={styles.product__details__header}>
                    <h1>{product.name}</h1>
                    <ul className={styles.product__colors}>
                        {product.colors.map((color: string, index: number) => (
                            <li
                                key={index}
                                className={styles.product__colors__circle}
                                style={{ backgroundColor: color }}
                                title={`Couleur ${color}`}
                                aria-label={`Couleur ${color}`}
                            />
                        ))}
                    </ul>
                </div>

                <MemoizedDefinition definitions={product.definitions || []} />

                <div className={styles.product__details__purchase}>
                    <h1 className={styles.product__price}>
                        {product.price_cents} €
                    </h1>
                    <button type="button" className={styles.product__cta}>
                        acheter.
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ProductDetail;
