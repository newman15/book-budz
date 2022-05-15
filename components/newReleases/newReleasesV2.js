import useSWR from "swr";
import NewReleasesCard from "./newReleasesCard";
import Carousel from "../carousel";
import CarouselSmall from "../carouselSmall";

export default function NewReleasesV2(){

    // Array to store the JSX to be sent to the DOM
    let newReleases = [];

    // Itinitialize fetcher for api calls to backend using 'useSWR'
    const fetcher = url => fetch(url).then(r => r.json());

    // Use the Next.js 'useSWR' hook to touch the backend API. https://swr.vercel.app/
    // revalidate... set to false to prevent duplicate calls to API when no event has happened.
    const {data, error} = useSWR(`/api/search/newestReleases`, fetcher, {
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
        return <div>Failed To Load!</div>
    }

    // Return data if available
    // If image is returned display it, else display default image
    if(data){
        for (let i = 0; i < data.length; i++){
            newReleases.push(
               <NewReleasesCard newReleases={data[i]} key={i}/>
            )
        }
    }

    return (
        <div>
            <div className="hidden carouselWidth:block" >
                <Carousel newReleases={newReleases}/>
            </div>

            <div className="carouselWidth:hidden">
                <CarouselSmall newReleases={newReleases} />
            </div>
        </div>
    )
}