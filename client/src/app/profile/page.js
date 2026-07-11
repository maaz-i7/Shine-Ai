"use client"

import { signOut } from "next-auth/react";

export default function Page() {
    const handleLogout = () => {
        signOut({
            callbackUrl: '/',
            redirect: true     
        });
    };
    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <button onClick={handleLogout} className="text-white bg-red-700 px-3 p-1 rounded-2xl cursor-pointer">
                Sign Out
            </button>
        </div>
    )
}