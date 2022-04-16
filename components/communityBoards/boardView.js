import { useRouter } from 'next/router';
import Image from 'next/image';
import { useState } from 'react';
import noImage from '../../public/unavailable_img.jpeg';
import styles from '../../styles/Card.module.css';

export default function BoardView ({board}){

        // Hook to control the state of the Description modal
        const [modal, setModal] = useState();

        const router = useRouter();
    
        // Stores the JSX Modal to be displayed when the modal btn is clicked
        const modalJSX = (
            <div className={styles.modal} >
                <div className={styles.content}>
                    <span className={styles.close} onClick={(e) => {e.preventDefault(); setModal(!modal)}}>&times;</span>
                    <p className={styles.descriptionContent}>{board.boardDescription}</p>
                </div>
            </div>
        );
    
        // Function that shows the modal when clicked
        const showModal = (e) => {
            e.preventDefault();
            setModal(modalJSX);
        }

        // Function that takes user to the viewBoard page
        const visitBoard = (e) => {
            e.preventDefault();
            router.push(`/boards/viewBoard/${board.boardName}`);
        }

    return (
        <div className={styles.card}>
            {board.boardImage !== 'None' ? 
                <Image 
                    src={board.boardImage} 
                    alt={"Book Image"}
                    width={350}
                    height={350}
                    layout="responsive"
                />
                : 
                <Image 
                    src={noImage} 
                    alt={"No Image Found"}
                    width={350}
                    height={350}
                    layout="responsive"
                />
            }

            <p>Board Name: {board.boardName}</p>

            <p>Board Genre: {board.boardGenre}</p>

            <div className={styles.cushion}>
                <button className={styles.modalBtn}
                    onClick={(e) => showModal(e)}>Board Description
                </button>
                {modal}
            </div>

            <div className={styles.cushion}>
                <button className={styles.modalBtn}
                    onClick={(e) => visitBoard(e)}>Visit Board
                </button>
            </div>
        </div>
    )
}