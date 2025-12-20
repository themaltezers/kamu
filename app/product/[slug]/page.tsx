import styles from "@/styles/pages/product.module.scss";
import ProductDetail from "@/features/product/component/ProductDetail";
import ProductView from "@/features/product/component/ProductView";
import { Product } from "@/features/product/types/product";
import { fetchProduct as apiFetchProduct } from "@/features/product/api/product.api";

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
        <main className={styles.product}>
            <section className={styles.product__tab}>
                <ProductDetail product={product} />
            </section>
            <section className={styles.product__tab}>
                <ProductView product={product} />
            </section>
        </main>
    );
}
