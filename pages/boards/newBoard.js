// Page to display when a user is creating a new board

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import CreateBoard from "../../components/communityBoards/createBoard";
import styles from "../../styles/Board.module.css";

export default function NewBoard() {

    // Get session data. User must be signed in to create a public board.
    const { data: session} = useSession();

    const router = useRouter(); // Create router instance

    return (
        <div>
            {!session ? (
                <div className={styles.centerText}>
                    <h2 className={styles.errorMessage}>You Must Sign In To Create A Board!</h2>
                    <button type="button" onClick={() => router.push('/')} >Return Home</button>
                </div>
            ) : (<CreateBoard />)}
        </div>
    )
}