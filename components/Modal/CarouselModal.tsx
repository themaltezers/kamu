"use client";

import styles from "@/styles/components/modal.module.scss";
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
            ordering: s.ordering ?? 0,
            setOrdering: s.setOrdering,
        }))
    );

    // ✅ tableau trié par ordering
    const sortedImages = useMemo(
        () =>
            [...productImages].sort(
                (a, b) => (a.ordering ?? 0) - (b.ordering ?? 0)
            ),
        [productImages]
    );

    if (!isOpen || !sortedImages.length) return null;

    // 🔄 trouver l'index de l'image actuelle dans le tableau trié
    const currentIndex = sortedImages.findIndex(
        (img) => img.ordering === ordering
    );
    const currentImage = sortedImages[currentIndex] ?? sortedImages[0];

    const prev = () => {
        const prevIndex =
            (currentIndex - 1 + sortedImages.length) % sortedImages.length;
        setOrdering(sortedImages[prevIndex].ordering ?? 0);
    };

    const next = () => {
        const nextIndex = (currentIndex + 1) % sortedImages.length;
        setOrdering(sortedImages[nextIndex].ordering ?? 0);
    };

    return (
        <Modal id={id}>
            <div className={styles.modal__carousel__image}>
                {/* <button onClick={prev} className={styles.modal__carousel__btn}>
                    ‹
                </button> */}
                <img
                    src={currentImage.url}
                    alt={currentImage.alt_text || ""}
                    style={{
                        maxWidth: "100%",
                        maxHeight: "100dvw",
                        margin: "0 auto",
                    }}
                />
                {/* <button onClick={next} className={styles.modal__carousel__btn}>
                    ›
                </button> */}
            </div>
            <div className={styles.modal__carousel__indicator}>
                {sortedImages.map((img) => {
                    const isLarge =
                        (img.size ?? "SMALL").toUpperCase() === "LARGE";
                    return (
                        <img
                            key={img.id}
                            src={img.url}
                            alt={img.alt_text || ""}
                            onClick={() => setOrdering(img.ordering ?? 0)}
                            style={{
                                aspectRatio: isLarge ? "16 / 9" : "1 / 1",
                                width: 70, // largeur fixe pour que 5 soient visibles
                                flexShrink: 0, // empêche l'image de rétrécir
                                objectFit: "cover",
                                cursor: "pointer",
                                border:
                                    img.ordering === ordering
                                        ? "2px solid blue"
                                        : "1px solid #ccc",
                                marginRight: 8,
                            }}
                        />
                    );
                })}
            </div>
        </Modal>
    );
}
