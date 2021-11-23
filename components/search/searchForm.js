import { useState } from "react";
import SearchResults from "./searchResults";
import styles from '../../styles/Home.module.css'

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
                    <input type="radio" id="searchAuthor" name="searchType" value="searchAuthor" />
                </label>

                <label>Title
                    <input type="radio" id="searchTitle" name="searchType" value="searchTitle" />
                </label>

                <label>Title and Author
                    <input type="radio" id="searchTitleAndAuthor" name="searchType" value="searchTitleAndAuthor" disabled/>
                </label>

                <label>ISBN
                    <input type="radio" id="searchISBN" name="searchType" value="searchISBN" />
                </label><br/>

                <label>
                    Search:
                    <input type="text" id="searchValue" />
                </label>

                <input type="submit" value="Search" />
            </form>

            {results}
        </div>
    )
}