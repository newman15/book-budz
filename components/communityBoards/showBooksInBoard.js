import useSWR from "swr";
import BookView from "./bookView";

export default function ShowBooksInBoard({boardName}) {

    // Itinitialize fetcher for api calls to backend using 'useSWR'
    const fetcher = url => fetch(url).then(r => r.json());

    // Use the Next.js 'useSWR' hook to touch the backend API. https://swr.vercel.app/
    // revalidate... set to false to prevent duplicate calls to API when no event has happened.
    const {data, error} = useSWR(`/api/db/publicBoard/viewBoard/${boardName}`, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    });

    // Display loading message while waiting for data
    if(!data) {
        return <div>loading...</div>
    }

    // If error display an error message
    if(error){
        return <div>Failed To Load!</div>;
    }

    let booksInBoard = [];
    
    // Return data if available
    // If image is returned display it, else display default image
    if(data){
        if (data.error){
            return(<h1>{data.error}</h1>)
        }
        else {
            for (let i = 0; i < data.books.length; i++){
                booksInBoard.push(
                    <BookView bookData={data.books[i]} key={i}/>
                )
            }
        }
    }
    
    return (
        <div>
            <h1 style={{textAlign: 'center'}}>Showing Board Results For: {boardName}</h1>
            {booksInBoard}
        </div>
    )
};
