import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import SearchUser from "../../components/search/searchUser";
import styles from "../../styles/Home.module.css";

export default function UserBoard() {

    // Get session status. User must be signed in to edit a public board.
    const {data: session, status} = useSession();

    const router = useRouter(); // Create router instance

    if (status === "authenticated"){
        return (
            <SearchUser userId={session.userId} />
        )
    }

    else if(status === "loading"){
        console.log("Authenticating User...");
        return (
            <></>
        )
    }

    else{
        return (
            <div className={styles.center}>
                <h2 className={styles.errorMessage}>You Must Sign In To View A Board!</h2>
                <button type="button" onClick={() => router.push('/')} >Return Home</button>
            </div>
        )
    }
}