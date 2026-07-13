"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LayoutWrapper({ children }) {

    const pathname = usePathname();

    const hideNavbar = [
        "/canvas",
    ].includes(pathname);

    return (
        <>
            {!hideNavbar && <Navbar />}
            {children}
            {!hideNavbar && <Footer />}
        </>
    );
}