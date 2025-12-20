import type { Metadata } from "next";
import "@/styles/globals.scss";
import { Playfair_Display, Libertinus_Serif } from "next/font/google";

// Import Google Fonts
const playfair = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "600", "700"], // Regular, Semi-bold, Bold
    display: "swap",
});

const libertinus = Libertinus_Serif({
    subsets: ["latin"],
    weight: ["400", "600", "700"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "kamu no",
    description: "le ciel.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="fr"
            className={`${playfair.className} ${libertinus.className}`}
        >
            <body>{children}</body>
        </html>
    );
}
