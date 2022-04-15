// This will be how board authors can edit their existing public boards

import { useSession } from "next-auth/react";
import { useState } from "react";
import useSWR from "swr";
import styles from '../../styles/Board.module.css';
import SearchForm from "../search/searchForm";
import CreateClickableCard from "./createClickableCard";

export default function EditExistingBoard() {

    const [selectedBoard, setSelectedBoard] = useState(null);
    const [currSelection, setCurrSelection] = useState(null);

    // Get session information
    const {data: session} = useSession();

    // Itinitialize fetcher for api calls to backend using 'useSWR'
    const fetcher = url => fetch(url).then(r => r.json());

    // Use the Next.js 'useSWR' hook to touch the backend API. https://swr.vercel.app/
    const {data, error} = useSWR(`/api/db/publicBoard/getBoardsByAuthor/${session.userId}`, fetcher);

    // Display loading message while waiting for data
    if(!data) {
        return <div>loading...</div>
    }

    // If error display an error message
    if(error){
        return <div>Failed To Load!</div>
    }

    // Return data if available
    // If image is returned display it, else display default image
    if(data){
        // Display all boards that the user is currently the author of
        // User selects the board they want to edit
            // User can now edit all fields (BoardName, BoardGenre, Description)
            // User can now search and add books to their public book board
            // User saves page and page is redirected to the 'viewBoard' page

        let returnJSX = [];

        const clickHandler = (e, boardName) => {
            e.preventDefault();
            console.log("Clicked " + boardName + " from the editExistingBoard component");
            setCurrSelection(<p>Now Editing Board: <i>{boardName}</i> </p>);
            setSelectedBoard(<SearchForm callFrom={"editBoard"} boardName={boardName}/>);
        }

        for (let i = 0; i < data.length; i++){
            returnJSX.push(
                <div key={i} onClick={(e) => {clickHandler(e, data[i].boardName)}}>
                    <CreateClickableCard boardName={data[i].boardName} boardGenre={data[i].boardGenre} boardDescription={data[i].boardDescription} />
                </div>
            )
        }
    }

    return (
        <div className={styles.centerText}>
            <h2>Choose The Board You&apos;d Like To Edit</h2>
            <h4>{currSelection}</h4>

            <div className={styles.flexRow}>
                {returnJSX}
            </div>

            <div style={{marginTop: "5rem"}}>{selectedBoard}</div>
        </div>
    )
}