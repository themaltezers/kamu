import styles from "@/styles/components/card.module.scss";

const Card = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return <div className={styles.card}>{children}</div>;
};

export default Card;
