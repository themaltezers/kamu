"use client";

import Modal from "@/components/Modal";
import { useState, useEffect } from "react";
import { useModalStore } from "@/stores/useModalStore";

type CarouselModalProps = {
    images: string[];
    startIndex?: number;
    id: string;
};

export function CarouselModal({
    images,
    startIndex = 0,
    id,
}: CarouselModalProps) {
    const [index, setIndex] = useState(startIndex);
    const isOpen = useModalStore((s) => s.isOpen(id));

    // Mettre à jour l'index si startIndex change
    useEffect(() => {
        setIndex(startIndex);
    }, [startIndex]);

    const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
    const next = () => setIndex((i) => (i + 1) % images.length);

    if (!isOpen) return null;

    return (
        <Modal id={id}>
            <div style={{ textAlign: "center" }}>
                <button onClick={prev}>‹</button>
                <img
                    src={images[index]}
                    alt=""
                    style={{
                        maxWidth: "100%",
                        maxHeight: "60vh",
                        margin: "0 auto",
                    }}
                />
                <button onClick={next}>›</button>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "1rem",
                        gap: "0.5rem",
                        flexWrap: "wrap",
                    }}
                >
                    {images.map((img, i) => (
                        <img
                            key={i}
                            src={img}
                            alt=""
                            style={{
                                width: 60,
                                height: 60,
                                objectFit: "cover",
                                border:
                                    i === index
                                        ? "2px solid #000"
                                        : "1px solid #ccc",
                                cursor: "pointer",
                            }}
                            onClick={() => setIndex(i)}
                        />
                    ))}
                </div>
            </div>
        </Modal>
    );
}
