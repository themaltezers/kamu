import styles from "@/styles/pages/product.module.scss";
import ProductDetail from "@/features/product/component/ProductDetail/index";
import ProductImage from "@/features/product/component/ProductImage";
import ProductGallery from "@/features/product/component/ProductGallery";
import { Product } from "@/features/product/types/product";

export default function ProductTabsMobile({ product }: { product: Product }) {
    return (
        <>
            <section
                className={styles.product__tab}
                style={{
                    backgroundColor: product.bg_color ?? "#ffffff",
                    color: product.text_color ?? "#000000",
                }}
            >
                <ProductDetail product={product} />
                <ProductGallery product={product} />
            </section>
            <section className={styles.product__tab}>
                <ProductImage src={product.main_image_url} alt={product.name} />
            </section>
        </>
    );
}
