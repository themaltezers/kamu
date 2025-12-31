"use client";

import Modal from "@/components/Modal";
import { useState, useEffect, useMemo, useRef } from "react";
import { useModalStore } from "@/stores/useModalStore";
import { ProductImage } from "@/features/product/types/product";

type CarouselModalProps = {
    images: ProductImage[];
    startId: string;
    id: string;
};

export function CarouselModal({ images, startId, id }: CarouselModalProps) {
    const sortedImages = useMemo(() => {
        return [...images].sort(
            (a, b) => (a.ordering ?? 0) - (b.ordering ?? 0)
        );
    }, [images]);

    const initialIndex = useMemo(() => {
        return sortedImages.findIndex((img) => img.id === startId);
    }, [startId, sortedImages]);

    const [index, setIndex] = useState(initialIndex);
    const isOpen = useModalStore((s) => s.isOpen(id));

    const thumbnailsRef = useRef<HTMLDivElement>(null);

    // Met à jour l'index si startId change
    useEffect(() => {
        setIndex(initialIndex);
    }, [initialIndex]);

    // Scroll automatique pour centrer la miniature active
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

    if (!isOpen) return null;

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
                        justifyContent: "flex-start",
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
