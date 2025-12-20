export type Product = {
    id: string;
    name: string;
    slug: string;

    short_description?: string | null;
    long_description_mdx?: string | null;

    sku?: string | null;
    type: "PHYSICAL" | "DIGITAL";

    // 💰 PRIX
    price_cents: number;
    promo_price_cents?: number | null;

    // 🎨 COULEURS (hex)
    colors: string[];

    // 🖼️ IMAGES
    polaroid_url?: string | null;
    main_image_url?: string | null;

    // 🗂️ META
    category_id?: string | null;
    tags: string[];
    published: boolean;

    // 🕒 TIMESTAMPS
    created_at: string;
    updated_at: string;

    // 🔗 RELATIONS (si utilisées côté front)
    asset?: unknown[];
    product_variant?: unknown[];
    product_feature?: unknown[];
    product_image?: unknown[];
};

export type ProductSummary = {
    slug: string;
    name: string;
    polaroid_url: string | null;
    main_image_url: string | null;
    published: boolean;
};
