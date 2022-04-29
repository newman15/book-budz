import useSWR from "swr";
import SearchCard from "./searchCard";

export default function SearchUser({userId}) {

    // Itinitialize fetcher for api calls to backend using 'useSWR'
    const fetcher = url => fetch(url).then(r => r.json());
    const {data, error} = useSWR(`/api/db/userBoard/${userId}`, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    });

    // Array to store the JSX to be sent to the DOM
    let returnJSX = [];

    // Display loading message while waiting for data
    if(!data) {
        return <div>loading...</div>
    }

    // If error display an error message
    if(error){
        return <div>Failed To Load!</div>
    }

    if (data === ''){
        returnJSX = <h2>No User Found</h2>
    }

    // If data... Do Something
    if(data){
        for (let i = 0; i < data.length; i++){
            returnJSX.push(
                <SearchCard bookData={data[i]} callFrom={"userBoard"} boardName={"userBoard"} key={i}/>
            )
        }
    }

    return(
        <div>
            <div className="flex flex-row flex-wrap justify-center">
                {returnJSX}
            </div>
        </div>
    )
}