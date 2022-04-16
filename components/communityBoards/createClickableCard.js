// Creates a clickable card with the public book board info
import { useState } from "react";
import styles from "../../styles/Board.module.css";

export default function CreateClickableCard({boardName, boardGenre, boardDescription}){

    // Hook to control state of card when selected
    const [selected, setSelected] = useState(false);

    const clickHandler = (e, boardName) => {
        e.preventDefault();
        console.log("Selected " + boardName);
        setSelected(!selected);
    }

    return(
        !selected ? 
            <div className={styles.card} onClick={(e) => {clickHandler(e, boardName)}}>
                <h2>{boardName}</h2>
                <p>{boardGenre}</p>
                <p>{boardDescription}</p>
            </div>
        :
            <div className={styles.selectedCard} onClick={(e) => {clickHandler(e, boardName)}}>
                <h2>{boardName}</h2>
                <p>{boardGenre}</p>
                <p>{boardDescription}</p>
            </div>
    )
}