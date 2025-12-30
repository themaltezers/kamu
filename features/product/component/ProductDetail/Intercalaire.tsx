import styles from "@/styles/pages/product.module.scss";

type IntercalaireVariant = "produits" | "galerie" | "informations";

type IntercalaireProps = {
    title: string;
    variant: IntercalaireVariant;
    isActive: boolean;
    onClick: (variant: IntercalaireVariant) => void;
};

const Intercalaire = ({
    title,
    variant,
    isActive,
    onClick,
}: IntercalaireProps) => {
    return (
        <li
            className={`${styles.intercalaire} ${
                isActive ? styles.intercalaire__active : ""
            }`}
            onClick={() => onClick(variant)}
        >
            <div className={styles.intercalaire__icon} />
            {isActive && (
                <h3 className={styles.intercalaire__title}>{title}</h3>
            )}
        </li>
    );
};

export default Intercalaire;
