"use client";

import styles from "@/features/product/styles/productFeatures.module.scss";
import Image from "next/image";
import { Product, ProductImage } from "@/features/product/types/product";

type Props = {
    product: Product;
};

const ProductGallery = ({ product }: Props) => {
    const images = product.product_image
        ?.filter((img: ProductImage) => img.type === "GALLERY")
        ?.sort((a, b) => (a.ordering ?? 0) - (b.ordering ?? 0));

    if (!images || images.length === 0) {
        return <p>Pas d'images de galerie</p>;
    }

    return (
        <div className={styles.product__gallery}>
            {images.map((img: ProductImage) => {
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
