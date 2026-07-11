"use client"

import Image from "next/image";
import logo from "../../public/images/logo-no-bg.png";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {

    const obj = useSession()
    const data = obj?.data
    const user = data?.user
    console.log(user)

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
                    <Link href="/login"><li>{user ? <Image loading="eager" className="w-10 rounded-[40px]" width={50} height={50} src={user.image} alt="logo" /> : "Sign In"}</li></Link>
                </ul>
            </div>
        </nav>
    )
}