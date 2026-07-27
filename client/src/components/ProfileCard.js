"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function ProfileCard({
    session,
    user,
    handleLogout,
    onClose,
    avatarRef,
}) {
    const cardRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(e) {
            if (cardRef.current?.contains(e.target)) return;
            if (avatarRef.current?.contains(e.target)) return;

            onClose();
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [avatarRef, onClose]);

    return (
        <div
            ref={cardRef}
            className="
                absolute right-0 top-14 z-50
                w-60 sm:w-70
                max-w-[calc(100vw-1rem)]
                origin-top-right
                rounded-2xl border border-[#2b2b2b]
                bg-secondary
                transition-all duration-150 ease-out
                shadow-[0_8px_24px_rgba(0,0,0,0.5)]"
        >
            <div className="p-4 sm:p-6">
                <div className="flex items-center gap-3 sm:gap-4">
                    <Image
                        src={
                            session?.user?.image
                                ? session.user.image.replace(/=s\d+-c$/, "=s400-c")
                                : "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
                        }
                        alt={user?.name || "User"}
                        width={500}
                        height={500}
                        className="w-14 h-14 sm:w-15 sm:h-15 rounded-full object-cover shrink-0"
                    />

                    <div className="flex flex-1 flex-col min-w-0">
                        <h2 className="text-base sm:text-lg font-semibold wrap-break-words">
                            {user?.name}
                        </h2>

                        <p className="text-xs sm:text-sm text-gray-400 break-all">
                            @{user?.username}
                        </p>
                    </div>
                </div>

                <div className="mt-4 sm:mt-5 flex flex-col gap-2">
                    <Link
                        href="/dashboard"
                        onClick={onClose}
                        className="rounded-lg bg-blue-600 py-2 text-center text-sm font-medium hover:bg-blue-500 transition-colors"
                    >
                        Dashboard
                    </Link>

                    <button
                        onClick={handleLogout}
                        className="rounded-lg bg-red-700 py-2 text-sm font-medium text-white hover:bg-red-800 transition-colors cursor-pointer"
                    >
                        Sign Out
                    </button>
                </div>
            </div>
        </div>
    );
}