"use client";

import { useState, useRef, useEffect, memo } from "react";
import { gsap } from "gsap";
import styles from "@/features/product/styles/productDetails.module.scss";
import { Definition } from "@/features/product/types/product";

type Props = {
    definitions: Definition[];
};

const ProductDefinition = ({ definitions }: Props) => {
    const [expanded, setExpanded] = useState(false);
    const textRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        if (!textRef.current) return;

        const lines =
            textRef.current.querySelectorAll<HTMLElement>(".definition-line");

        if (expanded) {
            gsap.to(lines, {
                display: "contents",
                height: "auto",
                opacity: 1,
                duration: 0.3,
                stagger: 0.08,
                ease: "power2.out",
            });
        } else {
            lines.forEach((line: HTMLElement, index: number) => {
                if (index === 0) return; // toujours afficher la première ligne
                gsap.to(line, {
                    height: 0,
                    opacity: 0,
                    duration: 0.25,
                    ease: "power2.in",
                    onComplete: () => {
                        gsap.set(line, { display: "none" });
                    },
                });
            });
        }
    }, [expanded]);

    if (!definitions?.length) return null;

    return (
        <div
            className={styles.product__details__definition}
            onClick={() => setExpanded((v) => !v)}
            style={{ cursor: "pointer" }}
        >
            <p className={styles.product__details__definition__title}>
                def. n.f.
            </p>

            <p ref={textRef}>
                {definitions.map((definition, idx) => (
                    <span
                        key={idx}
                        className="definition-line"
                        style={{
                            overflow: "hidden",
                            height: idx === 0 ? "auto" : 0,
                            opacity: idx === 0 ? 1 : 0,
                            display: idx === 0 ? "contents" : "none",
                        }}
                    >
                        {definition.map((part, i) => (
                            <span
                                key={i}
                                style={{
                                    fontWeight: part.bold ? 700 : 400,
                                    fontStyle: part.italic
                                        ? "italic"
                                        : "normal",
                                    color: part.color ?? "inherit",
                                }}
                            >
                                {part.text}
                            </span>
                        ))}
                    </span>
                ))}
            </p>
        </div>
    );
};

// Memo pour éviter de rerender inutilement si les définitions ne changent pas
export default memo(ProductDefinition);
