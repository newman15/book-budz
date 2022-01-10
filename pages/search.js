import { useSession, signIn, signOut } from "next-auth/react"
import SearchForm from "../components/search/searchForm";
import styles from '../styles/Home.module.css';

export default function Search(){

    const { data: session } = useSession();

    // If user is signed in, display the search page
    if (session) {
        return (
        <>
            <button onClick={() => signOut()}>Sign out</button>

            <div className={styles.gradient}>
                <SearchForm />
            </div>
        </>
        )
    }

    // If user is not signed in, deny seach page and prompt for sign in.
    return (
        <>
        Not signed in <br />
        <button onClick={() => signIn()}>Sign in</button>
        </>
    )
}