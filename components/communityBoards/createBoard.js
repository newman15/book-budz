// This will be how the board author creates a new public book board

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from '../../styles/Board.module.css'

export default function CreateBoard(){

    // Use 'useSession' to obtain the userId to pass to backend
    const { data: session} = useSession();

    // Create router instance
    const router = useRouter();

    // Error message hook
    const [errorMessage, setErrorMessage] = useState(<div></div>);
    const errorCreatingBoard = false; // Error flag

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
        if (errorCreatingBoard) {setErrorMessage(<h2 style={{color: 'red'}}>Error: Board Already Exists</h2>)}
        else {router.push('/boards/editBoard')} // After successful board creation, take user to '/editBoard' page
        console.log("Error Creating Board = " + errorCreatingBoard);
    }

    return (
        <div className={`${styles.container}`}>

            {errorMessage}

            <h2>Create a new public book board</h2>

            <form className={styles.flexColumn} onSubmit={(e) => {
                e.preventDefault();
                let boardName = document.getElementById("boardName").value;
                let boardGenre = document.getElementById("boardGenre").value;
                let boardDescription = document.getElementById("boardDescription").value;
                saveNewPublicBoard(boardName, boardGenre, boardDescription);
            }}>
                <label className={styles.spaceBetween}>Board Name:
                    <input type="text" id="boardName" placeholder="NewBoard"  required/>
                </label>
            
                <label className={styles.spaceBetween}>Board Genre:
                    <input type="text" id="boardGenre" placeholder="Science Fiction"  required/>
                </label>


                <label className={styles.spaceBetween}>Board Description:
                    <textarea className={styles.textArea} type="text" id="boardDescription" name="boardDescription" 
                        placeholder="ie: This board is for fans of the DOOM series." 
                    required/>
                </label>

                <input className={`${styles.btnSaveBoard} ${styles.spaceBetween}`} type="submit" value="Save Board" />

            </form>
        </div>
    )
}