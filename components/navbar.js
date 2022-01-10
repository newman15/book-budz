import Link from "next/link"
import styles from "../styles/Nav.module.css"
import { useSession } from "next-auth/react"

export default function Navbar() {
    
    const { data: session} = useSession();

    return (
        <div className={styles.topNav}>
            
            <nav>
                <ul className={styles.floatLeft}>
                
                    <li className={styles.inlineListItem}>
                        <Link href="/">
                            <a>Home</a>
                        </Link>
                    </li>

                    <li className={styles.inlineListItem}>
                        <Link href="/search">
                            <a>Search</a>
                        </Link>
                    </li>

                    {session && (
                        <li className={styles.inlineListItem}>
                            {/* Do not use '<Link></Link>' in order force a page reload when clicking */}
                            <a href={`/userBoard/${encodeURI(session.userId)}`}>Book Board</a>
                        </li>
                    )}

                    
                </ul>

                {!session && (<span className={styles.floatRight}>You are not signed in</span>)}

                {session && (<span className={styles.floatRight}>You are signed in as {session.user.email} </span>)}
            </nav>
            
        </div>
    )
}