import { join } from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    sassOptions: {
        includePaths: [join(process.cwd(), "styles")],
        prependData: `
      @use "@/styles/mixins.scss";
      @use "@/styles/vars.scss";
    `,
    },

    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
                pathname: "/**",
            },
            { protocol: "https", hostname: "www.alter-a.com", pathname: "/**" },
            {
                protocol: "https",
                hostname: "encrypted-tbn0.gstatic.com",
                pathname: "/**",
            },
        ],
    },

    // Config vide pour Turbopack pour éviter les erreurs
    turbopack: {},
};

export default nextConfig;
