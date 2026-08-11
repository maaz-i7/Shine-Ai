"use client"

import Image from "next/image";
import logo from "../../public/images/logo-no-bg.png";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState, useRef } from "react";
import ProfileCard from "./ProfileCard";
import { signOut } from "next-auth/react";

export default function Navbar() {

    const { data: session } = useSession();
    const user = session?.user
    const [showProfile, setShowProfile] = useState(false)
    const avatarRef = useRef(null);

    const handleLogout = () => {
        signOut({
            callbackUrl: '/',
            redirect: true
        });
    };

    return (
        <nav className="w-full bg-secondary font-sans z-100 flex items-center justify-between top-0 sticky p-2 border-b border-gray-100/10">
            <div className="ml-2">
                <Link href={"/"}>
                    <Image loading="eager" className="w-12" src={logo} alt="logo" />
                </Link>
            </div>
            <div>
                <ul className="flex gap-4 max-[600px]:text-sm justify-around items-center">
                    <Link href="/" scroll={true}><li className="text-gray-300 hover:text-white">Home</li></Link>
                    <Link href="/dashboard"><li className="text-gray-300 hover:text-white">Problems</li></Link>
                    <Link href="/problems/new"><li className="text-gray-300 hover:text-white">Canvas</li></Link>
                    <Link href="/#demo"><li className="text-gray-300 hidden min-[500px]:block hover:text-white">About</li></Link>
                    <li className="text-gray-300 hidden min-[500px]:block hover:text-white">
                        <a
                            href="https://mail.google.com/mail/?view=cm&fs=1&to=maaz.khan.sdr@gmail.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Contact
                        </a>
                    </li>

                    <li className="relative">
                        {user ? (
                            <>
                                <Image
                                    ref={avatarRef}
                                    src={user?.image || "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"}
                                    alt={user?.name || "User"}
                                    width={40}
                                    height={40}
                                    className="rounded-full cursor-pointer"
                                    loading="eager"
                                    onClick={() => setShowProfile(!showProfile)}
                                />

                                {showProfile && (
                                    <ProfileCard
                                        session={session}
                                        user={user}
                                        handleLogout={handleLogout}
                                        onClose={() => setShowProfile(false)}
                                        avatarRef={avatarRef}
                                    />
                                )}
                            </>
                        ) : (
                            <Link href={"/login"}>
                                <span className="text-gray-300 hover:text-white">Sign In</span>
                            </Link>
                        )}
                    </li>
                </ul>
            </div>
        </nav>
    )
}