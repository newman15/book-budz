import { useState } from "react";
import SearchResults from "./searchResults";

export default function SearchForm({callFrom, boardName}){

    // State Hook that displays search results.
    const [results, showResults] = useState(null);

    // Obtains search data and displays search results
    const getSearchResults = () => {
        let searchType = document.querySelector('input[name="searchType"]:checked').value;
        let searchValue = document.getElementById('searchValue').value;
        showResults(
            <SearchResults searchType={searchType} searchValue={searchValue} 
            callFrom={callFrom} boardName={boardName}/>
        );
    }

    return (
        <div className="container">

            <form className="text-center m-6" onSubmit={(e) => {
                e.preventDefault();
                getSearchResults();
            }}>
                <label className="p-2 text-lg">Author
                    <input className="cursor-pointer w-6 h-6 ml-1 align-middle" type="radio" id="searchAuthor" name="searchType" value="searchAuthor" required/>
                </label>

                <label className="p-2 text-lg">Title
                    <input className="cursor-pointer w-6 h-6 ml-1 align-middle" type="radio" id="searchTitle" name="searchType" value="searchTitle" required/>
                </label>

                <label className="p-2 text-lg">ISBN
                    <input className="cursor-pointer w-6 h-6 ml-1 align-middle" type="radio" id="searchISBN" name="searchType" value="searchISBN" required/>
                </label><br/>

                <label>
                    <input className="p-1 border-2 border-black rounded-md outline-black" type="text" id="searchValue" placeholder="Search..." required/>
                </label>

                <input className="p-1 m-2 border-2 border-black bg-blue-500 rounded-md text-white cursor-pointer" type="submit" value="Search" />
            </form>

            {results}
        </div>
    )
}