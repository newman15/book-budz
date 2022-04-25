import { useRouter } from 'next/router';
import Image from 'next/image';
import { useState } from 'react';
import noImage from '../../public/unavailable_img.jpeg';

export default function BoardView ({board}){

        // Hook to control the state of the Description modal
        const [modal, setModal] = useState();

        const router = useRouter();
    
        // Stores the JSX Modal to be displayed when the modal btn is clicked
        const modalJSX = (
            <div className="fixed z-10 left-0 top-0 w-full h-full overflow-auto bg-slate-400/95" >
                <div className="bg-white border-4 border-black rounded mx-auto mt-8 w-4/6">

                    {/* close button */}
                    <span className="float-right cursor-pointer text-3xl font-bold" onClick={(e) => {e.preventDefault(); setModal(!modal)}}>&times;</span>
                    
                    <p className="text-left m-4">{board.boardDescription}</p>
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
        <div className="w-72 xs:w-80 border-8 border-black rounded-xl m-8 text-center hover:shadow-[0_8px_16px_8px_rgba(0,0,0,1)]">
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

            <p className="p-4"><b>Board Name:</b> {board.boardName}</p>

            <p className="p-4"><b>Board Genre:</b> {board.boardGenre}</p>

            <div className="m-4">
                <button className="cursor-pointer border-2 border-black rounded m-4 p-1 hover:bg-black hover:text-white"
                    onClick={(e) => showModal(e)}>Board Description
                </button>
                {modal}
            </div>

            <div className="m-4">
                <button className="cursor-pointer border-2 border-black rounded m-4 p-1 hover:bg-black hover:text-white"
                    onClick={(e) => visitBoard(e)}>Visit Board
                </button>
            </div>
        </div>
    )
}