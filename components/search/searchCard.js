import { useSession } from 'next-auth/react';
import { useState } from 'react';
import Image from 'next/image';
import styles from '../../styles/Card.module.css';
import noImage from '../../public/unavailable_img.jpeg';
import liked from '../../public/liked.svg';
import notLiked from '../../public/not_liked.svg';

export default function SearchCard({bookData, callFrom, boardName}){

    // Use 'useSession' to control whether the user sees the like button
    const { data: session} = useSession();

    // Hook to control the state of the Description modal
    const [modal, setModal] = useState();

    // Hook to control the state of the likedImage icon
    const [saveBook, setSaveBook] = useState(false);

    // Stores the JSX Modal to be displayed when the modal btn is clicked
    const modalJSX = (
        <div className={styles.modal} >
            <div className={styles.content}>
                <span className={styles.close} onClick={(e) => {e.preventDefault(); setModal(!modal)}}>&times;</span>
                <p className={styles.descriptionContent}>{bookData.description}</p>
            </div>
        </div>
    );

    // Function that shows the modal when clicked
    const showModal = (e) => {
        e.preventDefault();
        setModal(modalJSX);
    }

    // Function that switches the liked image when clicked, and calls
    // the dbHandler() function to handle the save/delete functionality.
    const saveBookHandler = (e) => {
        e.preventDefault();

        // If savebook is currently false, then the user's "Save" btn click triggered this.
        // Else, the user has "Unsaved" this book. Set the status accordingly.
        const saveStatus = !saveBook ? "saveBook" : "deleteBook";
        setSaveBook(!saveBook); // Call state hook to change liked image
        dbHandler(saveStatus); // Pass status to the dbHandler
    }

    // Function that calls the Backend API route and dynamically
    // sets the correct save/delete route.
    const dbHandler = (saveStatus) => {
        bookData.userId = session.userId; // Add userId to bookData for backend purposes

        let saveType = ""; // String to store the saveType when sending to the DB

        // Sets the saveType to dynamically set the correct DB route for saving a book.
        // This functionlity makes the SearchForm component reusable.
        switch (callFrom){
            case "search":
                saveType = `/api/db/${saveStatus}`;
                break;
            case "editBoard":
                saveType = `/api/db/publicBoard/${saveStatus}`;
                bookData.boardName = boardName;
                break;
            default:
                console.log("Error saving the book due to invalid \'callFrom\' passed from parent component.");
        }

        // Send the book data to the backend API to be deleted
        fetch(saveType, 
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(bookData),
            }
        );
    }

    return (
        <div className={styles.card}>
            {bookData.image !== 'None' ? 
                <Image 
                    src={bookData.image} 
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

            <div className={styles.text}>

                <h2>{bookData.title}</h2>

                <p><b>Author:</b> {bookData.author}</p>
                
                <p><b>Published:</b> {bookData.date}</p>

                <p><b>ISBN:</b> {bookData.isbn}</p>

                <button className={styles.modalBtn}
                    onClick={(e) => showModal(e)}>Show Description +/-
                </button>
                {modal}

                {session && (
                    <div className={styles.heartImage} onClick={(e) => saveBookHandler(e)}>
                        {saveBook ? 
                            <Image 
                                src={liked} 
                                alt={"not liked"}
                                width={50}
                                height={50}
                                layout="intrinsic"
                            /> 
                            : 
                            <Image 
                                src={notLiked} 
                                alt={"not liked"}
                                width={50}
                                height={50}
                                layout="intrinsic"
                            /> 
                        }
                    </div>
                )}
                
            </div>
        </div>
    )
}