import Image from "next/image";

const Gallery = () => {
    return (
        <div>
            <Image
                src="/echarpe.svg"
                alt="Produits"
                width={0} // ou omets width/height
                height={300}
                style={{ width: "auto" }}
            />
        </div>
    );
};

export default Gallery;
