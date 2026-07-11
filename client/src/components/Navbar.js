"use client"

import Image from "next/image";
import logo from "../../public/images/logo-no-bg.png";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {

    const obj = useSession()
    const data = obj?.data
    const user = data?.user
    const avatar = user?.image

    return (
        <nav className="w-screen bg-secondary flex items-center justify-between top-0 sticky">
            <div className="">
                <Image loading="eager" className="w-15" src={logo} alt="logo" />
            </div>
            <div>
                <ul className="flex w-80 justify-around items-center">
                    <Link href="/"><li>Home</li></Link>
                    <li>About</li>
                    <li>Contact</li>
                    <Link href={user ? "/profile" : "/login"}>
                        {user ? (
                            <Image
                                src={avatar || "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"}
                                alt={user.name || "User"}
                                width={40}
                                height={40}
                                className="rounded-full"
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