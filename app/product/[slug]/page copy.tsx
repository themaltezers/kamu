import ProductDetail from "@/features/product/component/ProductDetail";
import styles from "@/styles/pages/product.module.scss";

type tParams = Promise<{ slug: string }>;

export default async function Page(props: { params: tParams }) {
    const { slug } = await props.params;

    return (
        <main className={styles.product}>
            <section className={styles.product__tab}>
                <ProductDetail />
            </section>
            <div className="">{slug}</div>
            <div className={styles.product__tab}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Recusandae, voluptate enim provident magnam reiciendis
                accusamus. Repellendus iure ratione hic ea repellat cum dolore
                quo obcaecati qui minima quis beatae sed ullam eaque culpa amet,
                aliquam a neque odio consequatur. Nulla maiores laborum cum
                officia impedit molestiae! Pariatur accusamus excepturi neque
                magnam, voluptas nesciunt optio quaerat porro odit? Voluptate,
                nostrum error dicta dolore quidem iusto, vel quasi esse quo
                sequi velit illum neque. Officiis at deserunt ut distinctio
                facilis odio cupiditate eius alias iusto, voluptatibus quas odit
                eos quos pariatur optio debitis, quisquam corporis temporibus.
                Exercitationem facilis voluptatum cum unde in eligendi mollitia
                nihil, impedit corrupti dolores, voluptatem tempore totam
                aliquam esse ex ad aliquid omnis. Voluptatem neque tempore quam
                tenetur odio. Accusamus adipisci, a voluptate consequuntur autem
                id fugit. Magnam illo vel laborum maiores optio nam expedita
                nihil ullam adipisci nulla laudantium facere quis saepe, culpa
                omnis repellat explicabo blanditiis fuga voluptas perferendis
                eum consequatur vitae itaque. Nesciunt labore nostrum aspernatur
                excepturi nulla, hic doloremque molestiae consectetur odit.
                Corrupti in numquam fuga iusto necessitatibus magni temporibus
                velit nihil nobis ratione sint ut laborum deleniti rem deserunt
                corporis atque doloribus, exercitationem laudantium quidem ipsum
                repellat labore aut eligendi. Quibusdam necessitatibus veritatis
                possimus nisi omnis, unde qui quaerat rem repellat perspiciatis
                placeat expedita voluptatum maiores tempora, enim saepe.
                Molestiae quibusdam blanditiis enim dicta eligendi eum possimus
                est deleniti vel voluptatum reiciendis quos obcaecati esse earum
                harum error porro, quidem sunt aperiam magni non facilis libero
                ipsum reprehenderit! Voluptas, aperiam molestiae! Optio iste
                officia velit earum rem ipsa, odio libero quidem? Voluptate,
                nemo, vitae temporibus doloremque provident cum minima eligendi
                assumenda incidunt quibusdam fuga quo asperiores delectus eos.
                Libero enim laboriosam quod ut fugit vitae nesciunt ex
                aspernatur corporis recusandae accusantium iusto inventore
                aliquam neque tempore dolore dolores, cum impedit molestiae et
                dolorum harum, officia vero hic. Dolore nulla est quaerat
                mollitia provident harum ipsum obcaecati, et eaque, repudiandae
                repellat enim excepturi, at ex neque! Eius animi sequi ratione
                quis quisquam blanditiis sed consequuntur et neque pariatur odio
                esse, officiis consequatur modi. Minima architecto ad quod vitae
                praesentium, neque optio, consequuntur vel maxime iusto aut
                consequatur magnam consectetur quo rerum beatae quia, enim natus
                placeat eos repudiandae recusandae accusamus! Labore fugit
                eveniet accusamus qui excepturi, dolor perspiciatis assumenda,
                delectus, illo iure vel necessitatibus? Illum optio magni
                aperiam explicabo. Similique, nam perferendis nesciunt officia
                pariatur consectetur doloremque aliquid reprehenderit cum? Minus
                vitae pariatur atque nulla neque id eveniet, dolorem quo natus
                impedit ipsam quia dignissimos, nobis necessitatibus, voluptate
                maiores consequuntur veniam. Rerum ducimus corrupti incidunt
                iusto adipisci provident maxime iure modi exercitationem soluta,
                quos voluptatibus quidem est vero?
            </div>
        </main>
    );
}
