import { useSession} from "next-auth/react"
import SearchForm from "../components/search/searchForm";
import styles from '../styles/Home.module.css';

export default function Search(){

    const { data: session} = useSession();

    return (
        <div className={styles.gradient}>
            {!session && (<h4 style={{color: "red", textAlign: 'center'}}>You must be signed in to save a book to your board!</h4>)}
            <SearchForm />
        </div>
    )
}