"use client";

import { useMemo, useState } from "react";
import styles from "@/features/product/styles/productFeatures.module.scss";
import Image from "next/image";
import { Product, ProductImage } from "@/features/product/types/product";
import { CarouselModal } from "@/components/Modal/CarouselModal";
import { useModalStore } from "@/stores/useModalStore";

type Props = {
    product: Product;
    type?: ProductImage["type"];
};

export default function ProductGallery({ product, type }: Props) {
    const images = useMemo(() => {
        if (!product.product_image) return [];
        const filtered = type
            ? product.product_image.filter((img) => img.type === type)
            : product.product_image;
        return filtered.sort((a, b) => (a.ordering ?? 0) - (b.ordering ?? 0));
    }, [product.product_image, type]);

    const openModal = useModalStore((s) => s.openModal);

    // id de l'image sur laquelle on a cliqué
    const [startId, setStartId] = useState<string | undefined>(undefined);

    if (!images.length)
        return <p>Pas d&apos;images {type ? `(${type})` : ""}</p>;

    return (
        <>
            <div className={styles.product__gallery}>
                {images.map((img) => {
                    const isLarge =
                        (img.size ?? "SMALL").toUpperCase() === "LARGE";

                    return (
                        <div
                            key={img.id}
                            className={
                                isLarge
                                    ? styles.product__gallery__photo__large
                                    : styles.product__gallery__photo__small
                            }
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                                setStartId(img.id); // on stocke l'image cliquée
                                openModal("image-carousel"); // puis on ouvre la modal
                                console.log("click", img.ordering);
                            }}
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

            {/* Modal qui récupère toutes les images du store */}

            <CarouselModal
                productSlug={product.slug}
                id="image-carousel"
                startId={startId}
            />
        </>
    );
}
