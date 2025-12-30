import { create } from "zustand";
import { ProductSummary, Product } from "@/features/product/types/product";
import {
    fetchProducts as apiFetchProducts,
    fetchProduct as apiFetchProduct,
} from "@/features/product/api/product.api";

export type IntercalaireVariant = "produits" | "galerie" | "informations";

type ProductStore = {
    active: IntercalaireVariant;
    setActive: (variant: IntercalaireVariant) => void;

    allProducts: ProductSummary[];
    setProducts: (products: ProductSummary[]) => void;
    fetchProducts: () => Promise<void>;
    loading: boolean;

    productsBySlug: Record<string, Product>;
    loadingBySlug: Record<string, boolean>;
    getProduct: (slug: string) => Product | undefined;
    fetchProduct: (slug: string) => Promise<Product | null>;
};

export const useProductStore = create<ProductStore>((set, get) => ({
    active: "produits",
    setActive: (variant) => set({ active: variant }),

    allProducts: [],
    setProducts: (products) => set({ allProducts: products }),
    loading: false,

    fetchProducts: async () => {
        const { allProducts } = get();
        if (allProducts.length > 0) return;

        set({ loading: true });
        try {
            const data = await apiFetchProducts();
            set({ allProducts: data });
        } catch (err) {
            console.error("Erreur fetch produits:", err);
        } finally {
            set({ loading: false });
        }
    },

    productsBySlug: {},
    loadingBySlug: {},

    getProduct: (slug: string) => get().productsBySlug[slug],

    fetchProduct: async (slug: string) => {
        const { productsBySlug, loadingBySlug } = get();

        if (productsBySlug[slug]) return productsBySlug[slug];
        if (loadingBySlug[slug]) return null; // déjà en cours de fetch

        set({ loadingBySlug: { ...loadingBySlug, [slug]: true } });

        try {
            const product = await apiFetchProduct(slug);
            if (product) {
                set({
                    productsBySlug: {
                        ...get().productsBySlug,
                        [slug]: product,
                    },
                });
            }
            return product;
        } catch (err) {
            console.error("Erreur fetch product:", err);
            return null;
        } finally {
            set({ loadingBySlug: { ...get().loadingBySlug, [slug]: false } });
        }
    },
}));
