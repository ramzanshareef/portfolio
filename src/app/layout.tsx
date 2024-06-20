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
import NextTopLoader from "nextjs-toploader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SubscribeModal from "@/components/modals/SubscribeModal";
import { getSession } from "../utils/session";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const urbanist = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Ramzan Shareef's Portfolio",
    description: "Ramzan Shareef's Portfolio",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    let session = await getSession() as { isSub?: string };
    let showSubModal = process.env.SHOW_SUB_MODAL_ON_HOME === "true";
    return (
        <html lang="en" className="bg-slate-900 text-slate-100">
            <body className={clsx(urbanist.className, "relative min-h-screen")}>
                {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS && (
                    <GoogleAnalytics ga_id={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
                )}
                <NextTopLoader
                    color="#000fff"
                    showSpinner={false}
                />
                <Header />
                <ToastContainer className="z-9999" />
                {children}
                <div className="background-gradient absolute inset-0 -z-50 max-h-screen" />
                <div className="pointer-events-none absolute inset-0 -z-40 h-full opacity-20 mix-blend-soft-light"></div>
                <Footer />
                <PrismicPreview repositoryName={repositoryName} />
                <Analytics />
                <SpeedInsights />
                {showSubModal &&
                    <SubscribeModal
                        isOpen={session?.isSub === "true" ? false : true}
                        hideOnClose={true}
                        onClose={{}}
                    />
                }
            </body>
        </html>
    );
}
