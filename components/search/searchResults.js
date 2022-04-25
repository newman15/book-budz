import useSWR from 'swr';
import SearchCard from './searchCard';

export default function SearchResults({searchType, searchValue, callFrom, boardName}) {

    // Itinitialize fetcher for api calls to backend using 'useSWR'
    const fetcher = url => fetch(url).then(r => r.json());

    // Use the Next.js 'useSWR' hook to touch the backend API. https://swr.vercel.app/
    // revalidate... set to false to prevent duplicate calls to API when no event has happened.
    const {data, error} = useSWR(`/api/search/${searchType}/${searchValue}`, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    });

    // Display loading message while waiting for data
    if(!data) {
        return <div className="text-center">loading...</div>
    }

    // If error display an error message
    if(error){
        return <div>Failed To Load!</div>
    }

    // Return data if available
    // If image is returned display it, else display default image
    if(data){
        let returnJSX = []; // Array to store the JSX to be sent to the DOM
        
        for (let i = 0; i < data.length; i++){
            returnJSX.push(
                <SearchCard bookData={data[i]} callFrom={callFrom} boardName={boardName} key={i}/>
            )
        }
    }

    return(
        <div>
            {/* <h3 className="text-center mb-4">Showing Results for: <i className="font-bold">{searchValue}</i></h3> */}

            <div className="flex flex-row flex-wrap justify-center">
                {returnJSX}
            </div>
        </div>
    )
}