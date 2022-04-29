import Link from "next/link"
import Image from 'next/image'
import navMenu from '../public/icons/NavMenu.svg'
import { useSession, signIn, signOut } from "next-auth/react"
import { useState } from "react";

export default function Navbar() {
    
    const { data: session} = useSession();

    const [navbarOpen, setNavbarOpen] = useState(false);

    const closeMenu = (e) => {
        e.preventDefault();
        setNavbarOpen(false);
    }

    const navController = (e) => {
        e.preventDefault();
        setNavbarOpen(!navbarOpen);
    }

    return (
        <div className="bg-[#333] p-4 sticky top-0 z-10">

            <button className="md:hidden" onClick={(e) => {navController(e)}}>
                <Image src={navMenu} alt="Nav Icon" width={50} height={50} />
            </button>

            {/* <div className="mb-10"> */}
            <div className={
                `mb-10 md:block ${navbarOpen ? "block" : "hidden"}`
            }>
                <ul className="inline text-3xl text-white">
                
                    <li className="md:float-left ml-6">
                        <Link href="/">
                            <a>Home</a>
                        </Link>
                    </li>

                    <li className="md:float-left ml-6">
                        <Link href="/search">
                            <a>Search</a>
                        </Link>
                    </li>

                    <div className="group cursor-pointer md:float-left ml-6">
                        Boards
                        <div className="hidden absolute p-6 bg-[#333] group-hover:block">
                            <li>
                                <Link href="/boards/viewAllBoards">
                                    <a>View Boards</a>
                                </Link>
                            </li>

                            {session && (
                                <li>
                                    {/* Do not use '<Link></Link>' in order force a page reload when clicking */}
                                    <a href="/boards/userBoard">Book Board</a>
                                </li>
                            )}

                            {session && (
                                <li>
                                    <Link href="/boards/newBoard">Create Public Board</Link>
                                </li>
                            )}
                        </div>
                    </div>
                    
                    {!session && (<li className="md:inline md:float-right md:mr-6 ml-6"><span><button className="button" onClick={() => signIn()}>Sign in</button></span></li>)}

                    {session && (<li className="md:inline md:float-right md:mr-6 ml-6"><span><button className="button" onClick={() => signOut()}>Sign out</button></span></li>)}

                </ul>
            </div>
            
        </div>
        
    )
}