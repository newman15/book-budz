import useSWR from "swr";
import BoardView from "./boardView";
import styles from '../../styles/Card.module.css';

export default function ShowAllBoards() {

    // Itinitialize fetcher for api calls to backend using 'useSWR'
    const fetcher = url => fetch(url).then(r => r.json());

    // Use the Next.js 'useSWR' hook to touch the backend API. https://swr.vercel.app/
    const {data, error} = useSWR(`/api/db/publicBoard/viewAllBoards`, fetcher);

    if (!data){
        return (<div>Loading...</div>)
    }

    if (error){
        return (<div>Error occured. Could not complete the request</div>)
    }

    let allBoards = [];

    if (data){
        if (data.error){
            return (<div>{data.error}</div>)
        }
        else {
            for (let i = 0; i < data.length; i++){
                allBoards.push(
                    <BoardView board={data[i]} key={i}/>
                )
            }
        }
    }

    return (
        <div className={styles.cardContainer}>
            {allBoards}
        </div>
    )
}