import { useSession} from "next-auth/react"
import SearchForm from "../components/search/searchForm";
import styles from '../styles/Home.module.css';

export default function Search(){

    const { data: session} = useSession();

    return (
        <div className="container">
            <h1 className="text-center m-6">Search Page</h1>
            {!session && (<h4 className="text-center text-red-500 font-bold">You must be signed in to save a book to your board!</h4>)}
            <SearchForm callFrom={"search"} boardName={"N/A"}/>
        </div>
    )
}