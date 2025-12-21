"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import styles from "@/features/product/styles/productFeatures.module.scss";

const ProductDefinition = () => {
    const [expanded, setExpanded] = useState(false);
    const listRef = useRef<HTMLOListElement>(null);

    const handleClick = () => {
        setExpanded(!expanded);
    };

    const definitions = [
        "Large bande d'étoffe tissée ou tricotée qu'on porte autour du cou ; cache-nez.",
        "Bandage porté en bandoulière servant à soutenir une main ou un bras blessés.",
        "Draperie retenue à ses deux extrémités et retombant en courbe.",
        "Traverse diagonale disposée dans un pan de bois ou de fer (synonyme décharge), dans un panneau de menuiserie, dans un parquet, ou encore sous les poutres d'un plancher, pour prévenir la déformation de l'ouvrage.",
        "Cordage utilisé par les maçons pour guider la montée d'une charge.",
    ];

    useEffect(() => {
        if (!listRef.current) return;

        const items = Array.from(listRef.current.children) as HTMLElement[];

        if (expanded) {
            // Animation ouverture
            gsap.to(items, {
                height: "auto",
                opacity: 1,
                duration: 0.3,
                stagger: 0.1,
                ease: "power2.out",
            });
        } else {
            // Animation fermeture : cache tous sauf le premier
            items.forEach((li, index) => {
                if (index === 0) return;
                gsap.to(li, {
                    height: 0,
                    opacity: 0,
                    duration: 0.3,
                    ease: "power2.in",
                });
            });
        }
    }, [expanded]);

    return (
        <div
            className={styles.product__definition}
            onClick={handleClick}
            style={{ cursor: "pointer" }}
        >
            <p className={styles.product__definition__title}>def n.f</p>
            <ol ref={listRef}>
                {definitions.map((text, index) => (
                    <li
                        key={index}
                        style={{
                            overflow: "hidden",
                            height: index === 0 ? "auto" : 0,
                            opacity: index === 0 ? 1 : 0,
                        }}
                    >
                        <p>
                            <b>{index + 1}.</b> {text}
                        </p>
                    </li>
                ))}
            </ol>
        </div>
    );
};

export default ProductDefinition;
