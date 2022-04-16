// Page to display when a user is creating a new board

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import EditExistingBoard from "../../components/communityBoards/editExistingBoard";
import styles from "../../styles/Board.module.css";

export default function EditBoard() {

    // Get session status. User must be signed in to edit a public board.
    const {status} = useSession();

    const router = useRouter(); // Create router instance

    if (status === "authenticated"){
        return (
            <EditExistingBoard />
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
            <div className={styles.centerText}>
                <h2 className={styles.errorMessage}>You Must Sign In To Edit A Board!</h2>
                <button type="button" onClick={() => router.push('/')} >Return Home</button>
            </div>
        )
    }
}