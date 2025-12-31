"use client";

import Modal from "@/components/Modal";
import { useState, useEffect, useMemo, useRef } from "react";
import { useProductStore } from "@/features/product/stores/useProductStore";
import { useModalStore } from "@/stores/useModalStore";
import { ProductImage } from "@/features/product/types/product";

type CarouselModalProps = {
    productSlug: string;
    startId?: string; // id de l'image cliquée
    id: string;
};

export function CarouselModal({
    productSlug,
    startId,
    id,
}: CarouselModalProps) {
    const product = useProductStore((s) => s.getProduct(productSlug));
    const isOpen = useModalStore((s) => s.isOpen(id));

    const sortedImages: ProductImage[] = useMemo(() => {
        if (!product?.product_image) return [];
        return [...product.product_image].sort(
            (a, b) => (a.ordering ?? 0) - (b.ordering ?? 0)
        );
    }, [product?.product_image]);

    const [index, setIndex] = useState(0);
    const thumbnailsRef = useRef<HTMLDivElement>(null);

    // Met à jour l'index dès que startId ou sortedImages changent
    useEffect(() => {
        if (!sortedImages.length) return;
        const newIndex = startId
            ? sortedImages.findIndex((img) => img.id === startId)
            : 0;
        setIndex(newIndex >= 0 ? newIndex : 0);
    }, [startId, sortedImages]);

    // Scroll automatique miniature active
    useEffect(() => {
        if (!thumbnailsRef.current) return;
        const activeThumb = thumbnailsRef.current.children[
            index
        ] as HTMLElement;
        if (!activeThumb) return;

        const containerWidth = thumbnailsRef.current.clientWidth;
        const thumbOffset = activeThumb.offsetLeft;
        const thumbWidth = activeThumb.offsetWidth;

        thumbnailsRef.current.scrollTo({
            left: thumbOffset - containerWidth / 2 + thumbWidth / 2,
            behavior: "smooth",
        });
    }, [index]);

    const prev = () =>
        setIndex((i) => (i - 1 + sortedImages.length) % sortedImages.length);
    const next = () => setIndex((i) => (i + 1) % sortedImages.length);

    if (!isOpen || !product || sortedImages.length === 0) return null;

    return (
        <Modal id={id}>
            <div style={{ textAlign: "center" }}>
                <button onClick={prev}>‹</button>
                <img
                    src={sortedImages[index].url}
                    alt={sortedImages[index].alt_text || ""}
                    style={{
                        maxWidth: "100%",
                        maxHeight: "60vh",
                        margin: "0 auto",
                    }}
                />
                <button onClick={next}>›</button>

                {/* Barre de miniatures scrollable */}
                <div
                    ref={thumbnailsRef}
                    style={{
                        display: "flex",
                        overflowX: "auto",
                        gap: "0.5rem",
                        marginTop: "1rem",
                        paddingBottom: "0.5rem",
                    }}
                >
                    {sortedImages.map((img, i) => (
                        <img
                            key={img.id}
                            src={img.url}
                            alt={img.alt_text || ""}
                            style={{
                                width: 60,
                                height: 60,
                                objectFit: "cover",
                                border:
                                    i === index
                                        ? "2px solid #000"
                                        : "1px solid #ccc",
                                cursor: "pointer",
                                flexShrink: 0,
                            }}
                            onClick={() => setIndex(i)}
                        />
                    ))}
                </div>
            </div>
        </Modal>
    );
}
