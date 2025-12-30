import styles from "@/features/product/styles/productFeatures.module.scss";
import Image from "next/image";

type Props = {
    src?: string | null;
    alt?: string;

    style?: React.CSSProperties;
};

const ProductImage = ({ src, alt = "", style }: Props) => {
    if (!src) {
        return <p>Image non disponible</p>;
    }

    return (
        <div className={styles.product__image} style={style}>
            <Image
                src={src}
                alt={alt}
                width={0}
                height={0}
                style={{ width: "auto", height: "auto", display: "block" }}
                unoptimized
            />
        </div>
    );
};

export default ProductImage;
