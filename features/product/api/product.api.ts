import { ProductSummary, Product } from "@/features/product/types/product";
import { useProductStore } from "@/features/product/stores/useProductStore";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

/* PUBLIC — liste des produits publiés */
export async function fetchProducts(): Promise<ProductSummary[]> {
    const res = await fetch(`${API_BASE}/api/products`, { cache: "no-store" });
    if (!res.ok) throw new Error(`Erreur ${res.status}`);

    const data = (await res.json()) as ProductSummary[];
    useProductStore.getState().setProducts(data);
    return data;
}

/* PUBLIC — détail produit par slug */
export async function fetchProduct(slug: string): Promise<Product | null> {
    const { productsBySlug } = useProductStore.getState();
    if (productsBySlug[slug]) return productsBySlug[slug]; // déjà en cache

    try {
        const res = await fetch(
            `${API_BASE}/api/products/${encodeURIComponent(slug)}`,
            { cache: "no-store" }
        );

        if (!res.ok) return null;

        const product = (await res.json()) as Product;

        // hydrate le store dans productsBySlug, PAS allProducts
        useProductStore.setState({
            productsBySlug: { ...productsBySlug, [slug]: product },
        });

        return product;
    } catch (err) {
        console.error(`Erreur fetch produit ${slug}:`, err);
        return null;
    }
}
