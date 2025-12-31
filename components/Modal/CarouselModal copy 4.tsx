"use client";

import Modal from "@/components/Modal";
import { useState, useEffect } from "react";
import { useModalStore } from "@/stores/useModalStore";
import type { ProductImage } from "@/features/product/types/product";

type CarouselModalProps = {
    id: string;
    ordering?: number; // index de l'image cliquée
    productImages?: ProductImage[];
};

export function CarouselModal({
    id,
    ordering,
    productImages = [],
}: CarouselModalProps) {
    const isOpen = useModalStore((s) => s.isOpen(id));
    const [index, setIndex] = useState(ordering ?? 0);

    // Met à jour l'index dès qu'on change l'image cliquée
    useEffect(() => {
        if (
            ordering !== undefined &&
            ordering >= 0 &&
            ordering < productImages.length
        ) {
            setIndex(ordering);
        }
    }, [ordering, productImages.length]);

    const prev = () =>
        setIndex((i) => (i - 1 + productImages.length) % productImages.length);
    const next = () => setIndex((i) => (i + 1) % productImages.length);

    if (!isOpen || productImages.length === 0) return null;

    return (
        <Modal id={id}>
            <div style={{ textAlign: "center" }}>
                <button onClick={prev}>‹</button>
                <img
                    src={productImages[index]?.url}
                    alt={productImages[index]?.alt_text || ""}
                    style={{
                        maxWidth: "100%",
                        maxHeight: "60vh",
                        margin: "0 auto",
                        display: "block",
                    }}
                />
                <button onClick={next}>›</button>
            </div>
        </Modal>
    );
}
