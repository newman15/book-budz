import { useState } from "react";
import SearchResults from "./searchResults";
import styles from '../../styles/searchStyles/Form.module.css'

export default function SearchForm(){

    // State Hook that displays search results.
    const [results, showResults] = useState(null);

    // Obtains search data and displays search results
    const getSearchResults = () => {
        let searchType = document.querySelector('input[name="searchType"]:checked').value;
        let searchValue = document.getElementById('searchValue').value;
        showResults(<SearchResults searchType={searchType} searchValue={searchValue} />);
    }

    return (
        <div className={styles.center}>
            <h1>Search Page</h1>

            <form onSubmit={(e) => {
                e.preventDefault();
                getSearchResults();
            }}>
                <label>Author
                    <input className={styles.input} type="radio" id="searchAuthor" name="searchType" value="searchAuthor" required/>
                </label>

                <label>Title
                    <input className={styles.input} type="radio" id="searchTitle" name="searchType" value="searchTitle" required/>
                </label>

                {/* <label>Title and Author
                    <input className={styles.input} type="radio" id="searchTitleAndAuthor" name="searchType" value="searchTitleAndAuthor" disabled/>
                </label> */}

                <label>ISBN
                    <input className={styles.input} type="radio" id="searchISBN" name="searchType" value="searchISBN" required/>
                </label><br/>

                <label>
                    <input className={styles.input} type="text" className={styles.textInput} id="searchValue" placeholder="Search..." required/>
                </label>

                <input type="submit" value="Search" />
            </form>

            {results}
        </div>
    )
}