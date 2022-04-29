import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import SearchUser from "../../components/search/searchUser";

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
            <div className="text-center">
                <h2 className="text-red-500 font-bold m-6">You Must Sign In To View A Board!</h2>
                <button className="p-1 m-2 border-2 border-black bg-blue-500 rounded-md text-white cursor-pointer" type="button" onClick={() => router.push('/')} >Return Home</button>
            </div>
        )
    }
}