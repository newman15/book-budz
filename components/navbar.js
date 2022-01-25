import Link from "next/link"
import styles from "../styles/Nav.module.css"
import Image from 'next/image'
import { useSession, signIn, signOut } from "next-auth/react"
import { useEffect, useState } from "react";

export default function Navbar() {
    
    const { data: session} = useSession();

    let desktopNav = (
        <div className={styles.topNav}>
            
            <nav>
                <ul className={styles.inlineListItem} id="menuItems">
                
                    <li className={styles.floatLeft}>
                        <Link href="/">
                            <a>Home</a>
                        </Link>
                    </li>

                    <li className={styles.floatLeft}>
                        <Link href="/search">
                            <a>Search</a>
                        </Link>
                    </li>

                    {session && (
                        <li className={styles.floatLeft}>
                            {/* Do not use '<Link></Link>' in order force a page reload when clicking */}
                            <a href={`/userBoard/${encodeURI(session.userId)}`}>Book Board</a>
                        </li>
                    )}

                    {!session && (<li className={styles.floatRight}><span><button className={styles.button} onClick={() => signIn()}>Sign in</button></span></li>)}

                    {session && (<li className={styles.floatRight}><span><button className={styles.button} onClick={() => signOut()}>Sign out</button></span></li>)}

                </ul>
                
            </nav>
            
        </div>
    )

    let mobileNav = (
        <div className={styles.mobileTopNav}>
            
            <nav>
                <ul className={styles.inlineListItem} id="menuItems">

                    <div>
                        <li className={styles.menuBarExpanded}>
                            <Link href="/">
                                <a>Home</a>
                            </Link>
                        </li>

                        <li className={styles.menuBarExpanded}>
                            <Link href="/search">
                                <a>Search</a>
                            </Link>
                        </li>

                        {session && (
                            <li className={styles.menuBarExpanded}>
                                {/* Do not use '<Link></Link>' in order force a page reload when clicking */}
                                <a href={`/userBoard/${encodeURI(session.userId)}`}>Book Board</a>
                            </li>
                        )}

                        {!session && (<li className={styles.menuBarExpanded}><span><button className={styles.button} onClick={() => signIn()}>Sign in</button></span></li>)}

                        {session && (<li className={styles.menuBarExpanded}><span><button className={styles.button} onClick={() => signOut()}>Sign out</button></span></li>)}
                    </div>
                
                </ul>
                
            </nav>
        
        </div>
    )

    return (
        <div>

            <div>
                {desktopNav}
                {mobileNav}
            </div>
            
        </div>
        
    )
}