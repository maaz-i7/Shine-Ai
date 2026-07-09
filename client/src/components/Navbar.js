import Image from "next/image";
import logo from "../../public/images/logo-no-bg.png";

export default function Navbar() {
    return (
        <nav className="w-screen bg-black/60 backdrop-blur-md border-b border-white/10 flex items-center justify-between top-0 sticky p-5">
            <div className="">
                <Image loading="eager" className="w-10" src={logo} alt="logo" />
            </div>
            <div>
                <ul className="flex w-80 justify-around items-center">
                    <li>Home</li>
                    <li>About</li>
                    <li>Contact</li>
                    <li>Sign In</li>
                </ul>
            </div>
        </nav>
    )
}