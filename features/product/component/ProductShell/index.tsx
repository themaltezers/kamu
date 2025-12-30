"use client";

import { Product } from "@/features/product/types/product";
import { useMediaQuery } from "react-responsive";

import ProductTabsMobile from "@/features/product/component/ProductShell/ProductTabsMobile";
import ProductTabsDesktop from "@/features/product/component/ProductShell/ProductTabsDesktop";
import ProductTabsTablet from "@/features/product/component/ProductShell/ProductTabsTablet";

type Props = {
    product: Product;
};

export default function ProductShell({ product }: Props) {
    const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
    const isTablet = useMediaQuery({
        query: "(min-width: 768px) and (max-width: 1023px)",
    });

    if (isDesktop) return <ProductTabsDesktop product={product} />;
    if (isTablet) return <ProductTabsTablet product={product} />;

    return <ProductTabsMobile product={product} />;
}
