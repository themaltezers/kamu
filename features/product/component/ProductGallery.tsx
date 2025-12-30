"use client";
import { memo, useMemo } from "react";
import styles from "@/features/product/styles/productFeatures.module.scss";
import Image from "next/image";
import { Product, ProductImage } from "@/features/product/types/product";

type Props = {
    product: Product;
    type?: ProductImage["type"]; // facultatif, filtrage par type d'image
};

const ProductGallery = ({ product, type }: Props) => {
    const images = useMemo(() => {
        if (!product.product_image || product.product_image.length === 0)
            return [];
        const filtered = type
            ? product.product_image.filter((img) => img.type === type)
            : product.product_image;
        return filtered.sort((a, b) => (a.ordering ?? 0) - (b.ordering ?? 0));
    }, [product.product_image, type]);
    if (!product.product_image || product.product_image.length === 0) {
        return <p>Pas d`&apos;`images disponibles </p>;
    }

    if (images.length === 0) {
        return <p>Pas d`&apos;`images {type ? `(${type})` : ""}</p>;
    }

    return (
        <div className={styles.product__gallery}>
            {images.map((img) => {
                const isLarge = (img.size ?? "SMALL").toUpperCase() === "LARGE";

                return (
                    <div
                        key={img.id}
                        className={
                            isLarge
                                ? styles.product__gallery__photo__large
                                : styles.product__gallery__photo__small
                        }
                    >
                        <Image
                            src={img.url}
                            alt={img.alt_text || product.name}
                            width={0}
                            height={0}
                            style={{
                                width: "100%",
                                height: "auto",
                                display: "block",
                            }}
                            unoptimized
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default ProductGallery;
