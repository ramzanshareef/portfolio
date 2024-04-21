import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import clsx from "clsx";
import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const urbanist = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="bg-slate-900 text-slate-100">
            <body className={clsx(urbanist.className, "relative min-h-screen")}>
                <Header />
                {children}
                <div className="background-gradient absolute inset-0 -z-50 max-h-screen" />
                <div className="pointer-events-none absolute inset-0 -z-40 h-full opacity-20 mix-blend-soft-light"></div>
                <Footer />
                <PrismicPreview repositoryName={repositoryName} />
                <Analytics />
                <SpeedInsights />
            </body>
        </html>
    );
}
