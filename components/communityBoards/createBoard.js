// This will be how the board author creates a new public book board

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function CreateBoard(){

    // Use 'useSession' to obtain the userId to pass to backend
    const { data: session} = useSession();

    // Create router instance
    const router = useRouter();

    // Error message hook
    const [errorMessage, setErrorMessage] = useState(<div></div>);
    const errorCreatingBoard = false; // Error flag

    // Input field hooks
    const [boardName, setBoardName] = useState("Name Of Board");
    const [boardGenre, setBoardGenre] = useState("Board Genre");
    const [boardDescription, setBoardDescription] = useState("ie: This board is for fans of the DOOM series...");

    // Save New Board to the DB only if the new board does not yet exist.
    const saveNewPublicBoard = async (boardName, boardGenre, boardDescription) => {

        // Create the board info to be stored in the DB
        const newBoardInfo = {
            boardAuthor: session.userId,
            boardName: boardName,
            boardGenre: boardGenre,
            boardDescription: boardDescription,
            books: []
        }

        // Send the book data to the backend API to be saved
        const fetchResponse = await fetch('/api/db/publicBoard/createBoard', 
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newBoardInfo),
            }
        );
        
        // Store response data containing errorMessage from backend
        const responseData = await fetchResponse.json();

        // Set flag equal the response error passed back from the backend.
        errorCreatingBoard = responseData.error;

        // If error set the erorr message, else remove error message
        if (errorCreatingBoard) {setErrorMessage(<h2 className="m-6 text-red-500">Error: Board Already Exists</h2>)}
        else {router.push('/boards/editBoard')} // After successful board creation, take user to '/editBoard' page
        console.log("Error Creating Board = " + errorCreatingBoard);
    }

    return (
        <div className="text-center">

            {errorMessage}

            <h1 className="m-6">Create a new public book board</h1>

            <form className="flex flex-col" onSubmit={(e) => {
                e.preventDefault();
                saveNewPublicBoard(boardName, boardGenre, boardDescription);
            }}>
                <label className="mb-4">Board Name:
                    <input className="ml-10 pl-2 border border-black rounded-lg"
                        type="text" 
                        placeholder={boardName}
                        onChange={e => setBoardName(e.target.value)}  
                        required
                    />
                </label>
            
                <label className="mb-4">Board Genre:
                    <input className="ml-10 pl-2 border border-black rounded-lg" 
                        type="text"
                        placeholder={boardGenre}
                        onChange={e => setBoardGenre(e.target.value)}
                        required
                    />
                </label>


                <label className="mb-4">Board Description:
                    <textarea  className="ml-2 pl-2 align-middle border border-black rounded-lg" 
                        type="text"
                        placeholder={boardDescription}
                        onChange={e => setBoardDescription(e.target.value)}
                    required/>
                </label>

                <input className="p-1 m-6 w-fit mx-auto border-2 border-black bg-blue-500 rounded-md text-white cursor-pointer" type="submit" value="Save Board" />

            </form>
        </div>
    )
}