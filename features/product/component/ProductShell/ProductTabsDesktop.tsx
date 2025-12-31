import styles from "@/styles/pages/product.module.scss";
import { Product } from "@/features/product/types/product";
import ProductDetail from "@/features/product/component/ProductDetail";
import ProductImage from "@/features/product/component/ProductImage";
import ProductGallery from "@/features/product/component/ProductGallery";

export default function ProductTabsDesktop({ product }: { product: Product }) {
    console.log(product.product_image, "images desktop");

    return (
        <>
            {" "}
            <section
                className={styles.product__tab}
                style={{
                    backgroundColor: product.bg_color ?? "#ffffff",
                    color: product.text_color ?? "#000000",
                }}
            >
                <ProductDetail product={product} />
                <ProductGallery product={product} type="GALLERY" />
            </section>
            <section className={styles.product__tab}>
                {" "}
                <ProductImage src={product.main_image_url} alt={product.name} />
            </section>
            <section className={styles.product__tab}>
                <ProductGallery product={product} type="MANNEQUIN" />
            </section>
        </>
    );
}
