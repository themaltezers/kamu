"use client";

import styles from "@/features/product/styles/productDetails.module.scss";

import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import Intercalaire from "@/features/product/component/ProductDetail/Intercalaire";
import { useProductStore } from "@/features/product/stores/useProductStore";

const intercalaires = [
    { title: "produit.", variant: "produits" },
    { title: "galerie.", variant: "galerie" },
    { title: "informations.", variant: "informations" },
] as const;

export default function ProductSelector() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const active = useProductStore((state) => state.active);
    const setActive = useProductStore((state) => state.setActive);

    // sync store ↔ URL
    useEffect(() => {
        const view = searchParams.get("views");
        if (view && view !== active) {
            setActive(view as typeof active);
        }
    }, [searchParams, active, setActive]);

    const handleClick = (variant: typeof active) => {
        setActive(variant);
        router.replace(`?views=${variant}`);
    };

    return (
        <ul className={styles.product__selector}>
            <Link href="/" className={styles.product__selector__return}>
                <Image
                    src="/icons/return.svg"
                    alt="retour"
                    width={24}
                    height={24}
                />
            </Link>

            {intercalaires.map((item) => (
                <Intercalaire
                    key={item.variant}
                    title={item.title}
                    variant={item.variant}
                    isActive={active === item.variant}
                    onClick={handleClick}
                />
            ))}
        </ul>
    );
}
