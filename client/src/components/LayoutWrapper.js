"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LayoutWrapper({ children }) {

    const pathname = usePathname();

    const hideNavbarAndFooter = [
        "/problem"
    ].includes(pathname) || pathname.startsWith('/problem/');

    return (
        <>
            {!hideNavbarAndFooter && <Navbar />}
            {children}
            {!hideNavbarAndFooter && <Footer />}
        </>
    );
}