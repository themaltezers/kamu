"use client";

import Image from "next/image";
import { useProductStore } from "@/features/product/stores/useProductStore";
import { Product } from "@/features/product/types/product";

const views: Record<string, React.JSX.Element> = {
    produits: (
        <Image
            src="/echarpe.svg"
            alt="Produits"
            width={0} // ou omets width/height
            height={0}
            style={{ width: "auto", height: "auto" }}
        />
    ),
    inspiration: <p>inspiration</p>,
    galerie: <p>galerie</p>,
    informations: <p>informations</p>,
};

type Props = {
    product: Product;
};

const ProductView = ({ product }: Props) => {
    const active = useProductStore((state) => state.active);
    return <div>{views[active]}</div>;
};

export default ProductView;
