import Card from "@/components/Card";
import Link from "next/link";

interface PolaroidProps {
    slug: string;
    name: string;
    thumbnail: string | null;
}

const Polaroid = ({ slug, name, thumbnail }: PolaroidProps) => {
    return (
        <Link href={`/product/${slug}`}>
            <Card>
                {thumbnail && <img src={thumbnail} alt={name} />}
                <h3>{name}</h3>
            </Card>
        </Link>
    );
};

export default Polaroid;
