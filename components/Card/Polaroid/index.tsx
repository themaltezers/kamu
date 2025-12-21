import styles from "@/styles/components/polaroid.module.scss";
import Card from "@/components/Card";
import Link from "next/link";
import Image from "next/image";

interface PolaroidProps {
    slug: string;
    name: string;
    thumbnail: string | null;
}

const Polaroid = ({ slug, name, thumbnail }: PolaroidProps) => {
    return (
        <Card>
            <Link href={`/product/${slug}`} className={styles.polaroid}>
                {thumbnail && (
                    <Image
                        className={styles.polaroid__photo}
                        width={0}
                        height={0}
                        src={thumbnail}
                        alt={name}
                        style={{
                            width: "auto",
                            height: "100%",
                            objectFit: "cover",
                        }}
                        unoptimized
                    />
                )}
                <h2>{name}</h2>
            </Link>
        </Card>
    );
};

export default Polaroid;
