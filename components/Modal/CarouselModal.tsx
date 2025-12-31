"use client";

import Modal from "@/components/Modal";
import { useModalStore } from "@/stores/useModalStore";
import { useMemo } from "react";
import { useShallow } from "zustand/react/shallow";
import type { ProductImage } from "@/features/product/types/product";

type CarouselModalProps = {
    id: string;
    productImages?: ProductImage[];
};

export function CarouselModal({ id, productImages = [] }: CarouselModalProps) {
    const { isOpen, ordering, setOrdering } = useModalStore(
        useShallow((s) => ({
            isOpen: s.activeModal === id,
            ordering: s.ordering,
            setOrdering: s.setOrdering,
        }))
    );

    // 🔑 conversion ordering -> index
    const index = useMemo(() => {
        if (ordering == null) return 0;
        const i = productImages.findIndex((img) => img.ordering === ordering);
        return i >= 0 ? i : 0;
    }, [ordering, productImages]);

    const prev = () => {
        const prevIndex =
            (index - 1 + productImages.length) % productImages.length;
        setOrdering(productImages[prevIndex].ordering);
    };

    const next = () => {
        const nextIndex = (index + 1) % productImages.length;
        setOrdering(productImages[nextIndex].ordering);
    };

    if (!isOpen || !productImages.length) return null;

    return (
        <Modal id={id}>
            <div>
                <button onClick={prev}>‹</button>

                <img
                    src={productImages[index].url}
                    alt=""
                    style={{
                        maxWidth: "100%",
                        maxHeight: "60vh",
                        margin: "0 auto",
                    }}
                />

                <button onClick={next}>›</button>
            </div>
        </Modal>
    );
}
