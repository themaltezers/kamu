import styles from "@/styles/pages/product.module.scss";

import { Product } from "@/features/product/types/product";
import { fetchProduct as apiFetchProduct } from "@/features/product/api/product.api";
import ProductShell from "@/features/product/component/ProductShell";

type Props = {
    params: { slug: string };
};

export default async function Page({ params }: Props) {
    const { slug } = await params;

    // On utilise l'API centrale
    const product: Product | null = await apiFetchProduct(slug);

    if (!product) {
        return <p>Produit introuvable</p>;
    }

    return (
        <main
            className={styles.product}
            style={{
                backgroundColor: product.bg_color ?? "#ffffff",
                color: product.text_color ?? "#000000",
                minHeight: "100%",
            }}
        >
            <ProductShell product={product} />
        </main>
    );
}
