export type Product = {
    id: string;
    name: string;
    slug: string;
    short_description?: string | null;
    long_description_mdx?: string | null;
    sku?: string | null;
    type: "PHYSICAL" | "DIGITAL";
    price_cents: number;
    promo_price_cents?: number | null;
    colors: string[];
    polaroid_url?: string | null;
    main_image_url?: string | null;
    category_id?: string | null;
    tags: string[];
    published: boolean;
    created_at: string;
    updated_at: string;

    asset?: unknown[];
    product_variant?: unknown[];
    product_feature?: unknown[];
    product_image?: ProductImage[]; // <-- ici
};

export type ProductSummary = {
    slug: string;
    name: string;
    polaroid_url: string | null;
    main_image_url: string | null;
    published: boolean;
};

export type ProductImage = {
    id: string;
    product_id: string;
    variant_id?: string | null;
    url: string;
    type: "GALLERY" | "OTHER";
    ordering?: number | null;
    alt_text?: string | null;
    size: "SMALL" | "MEDIUM" | "LARGE";
};
