"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LayoutWrapper({ children }) {

    const pathname = usePathname();

    const hideNavbar = [
    ].includes(pathname) || pathname.startsWith('/problem/');

    const hideFooter = [
        "/dashboard",
    ].includes(pathname) || pathname.startsWith('/problem/');

    return (
        <div className={hideFooter ? "flex flex-col h-screen w-full" : "flex flex-col w-full"}>
            {!hideNavbar && <Navbar />}

            <main className={hideFooter ? "flex-1 flex overflow-hidden" : ""}>
                {children}
            </main>

            {!hideFooter && <Footer />}
        </div>
    );
}