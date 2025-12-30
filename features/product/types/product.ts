// features/product/types/product.ts
export type DefinitionPart = {
    text: string;
    bold?: boolean;
    italic?: boolean;
    color?: string;
};

export type Definition = DefinitionPart[];

export type Product = {
    id: string;
    name: string;
    slug: string;
    definitions?: Definition[]; // <- nouveau champ
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

    // nouvelles propriétés
    bg_color?: string | null;
    text_color?: string | null;

    asset?: unknown[];
    product_variant?: unknown[];
    product_feature?: unknown[];
    product_image?: ProductImage[];
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
    type: "GALLERY" | "PACKSHOT" | "MANNEQUIN" | "OTHER"; // ajout des types manquants
    ordering?: number | null;
    alt_text?: string | null;
    size: "SMALL" | "MEDIUM" | "LARGE";
};
