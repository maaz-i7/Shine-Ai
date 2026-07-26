"use client"

import Image from "next/image";
import logo from "../../public/images/logo-no-bg.png";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Navbar() {

    const obj = useSession()
    const data = obj?.data
    const user = data?.user
    const avatar = user?.image

    return (
        <nav className="w-full bg-secondary font-sans z-10 flex items-center justify-between top-0 sticky p-2 border-b border-gray-100/10">
            <div className="ml-2">
                <Link href={"/"}>
                    <Image loading="eager" className="w-12" src={logo} alt="logo" />
                </Link>
            </div>
            <div>
                <ul className="flex w-80 max-[500px]:w-[65vw] max-[600px]:text-sm justify-around items-center">
                    <Link href="/"><li>Home</li></Link>
                    <li>About</li>
                    <li>Contact</li>
                    <Link href={user ? "/dashboard" : "/login"}>
                        {user ? (
                            <Image
                                src={avatar || "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"}
                                alt={user.name || "User"}
                                width={40}
                                height={40}
                                className="rounded-full"
                                loading="eager"
                            />
                        ) : (
                            <span>Sign In</span>
                        )}
                    </Link>
                </ul>
            </div>
        </nav>
    )
}