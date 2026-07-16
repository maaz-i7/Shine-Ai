"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LayoutWrapper({ children }) {

    const pathname = usePathname();

    const hideNavbarAndFooter = [
        "/canvas",
        "/problem"
    ].includes(pathname);

    return (
        <>
            {!hideNavbarAndFooter && <Navbar />}
            {children}
            {!hideNavbarAndFooter && <Footer />}
        </>
    );
}