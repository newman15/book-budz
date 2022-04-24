import { useSession } from 'next-auth/react';
import { useState } from 'react';
import Image from 'next/image';
import styles from '../../styles/Card.module.css';
import noImage from '../../public/unavailable_img.jpeg';
import liked from '../../public/liked.svg';
import notLiked from '../../public/not_liked.svg';

export default function SearchCard({bookData, callFrom, boardName}){

    // Reusable tyle object variable for the <p> tag
    const noWrap = {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        fontSize: "1rem",
        padding: "1rem"
    }

    // Use 'useSession' to control whether the user sees the like button
    const { data: session} = useSession();

    // Hook to control the state of the Description modal
    const [modal, setModal] = useState();

    // Hook to control the state of the likedImage icon
    const [saveBook, setSaveBook] = useState(false);

    // // Stores the JSX Modal to be displayed when the modal btn is clicked
    // const modalJSX = (
    //     <div className={styles.modal} >
    //         <div className={styles.content}>
    //             <span className={styles.close} onClick={(e) => {e.preventDefault(); setModal(!modal)}}>&times;</span>
    //             <p className={styles.descriptionContent}>{bookData.description}</p>
    //         </div>
    //     </div>
    // );

    // Stores the JSX Modal to be displayed when the modal btn is clicked
    const modalJSX = (
        <div className="fixed z-10 left-0 top-0 w-full h-full overflow-auto bg-slate-400/95">
            <div className="bg-white border-4 border-black rounded w-5/6 mx-auto mt-4">
                <span className="float-right cursor-pointer text-3xl font-bold" onClick={(e) => {e.preventDefault(); setModal(!modal)}}>&times;</span>
                <p className="text-left">{bookData.description}</p>
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
        <div className="w-72 xs:w-80 border-8 border-black rounded-xl mb-8 text-center hover:shadow-[0_8px_16px_8px_rgba(0,0,0,1)]">
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

            <div className="m-4">

                <div className="group relative">
                    <h2 className="overflow-hidden overflow-ellipsis whitespace-nowrap cursor-help">
                        {bookData.title}
                    </h2>
                    <span className="hidden absolute -top-12 left-0 right-0 m-auto 
                        border-2 border-black bg-slate-400 group-hover:block">
                        {bookData.title}
                    </span>
                </div>

                <p style={noWrap}><b>Author:</b> {bookData.author}</p>
                
                <p style={noWrap}><b>Published:</b> {bookData.date}</p>

                <p style={noWrap}><b>ISBN:</b> {bookData.isbn}</p>

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