// Page to display when a user is creating a new board

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import CreateBoard from "../../components/communityBoards/createBoard";

export default function NewBoard() {

    // Get session data. User must be signed in to create a public board.
    const { data: session} = useSession();

    const router = useRouter(); // Create router instance

    return (
        <div>
            {!session ? (
                <div className="text-center">
                    <h2 className="text-red-500 font-bold m-6">You Must Sign In To Create A Board!</h2>
                    <button className="p-1 m-2 border-2 border-black bg-blue-500 rounded-md text-white cursor-pointer" type="button" onClick={() => router.push('/')} >Return Home</button>
                </div>
            ) : (<CreateBoard />)}
        </div>
    )
}