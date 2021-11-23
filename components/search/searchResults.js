import useSWR from 'swr';
import Image from 'next/dist/client/image';
import styles from '../../styles/Card.module.css';
import noImage from '../../public/unavailable_img.jpeg'

export default function SearchResults({searchType, searchValue}) {

    let returnJSX = [];

    // Itinitialize fetcher
    const fetcher = url => fetch(url).then(r => r.json());

    // Use the Next.js 'useSWR' hook to touch the backend API. https://swr.vercel.app/
    // revalidate... set to false to prevent duplicate calls to API (not necessary to have)
    const {data, error} = useSWR(`/api/search/${searchType}/${searchValue}`, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    });

    if(!data) {
        console.log("loading...");
        return <div>loading...</div>
    }
    if(error){
        return <div>Failed To Load!</div>
    }
    if(data){
        console.log("Loading COMPLETE");
        console.log(data);

        for (let i = 0; i < data.length; i++){
            returnJSX.push(
                <div className={styles.card} key={"card" + i}>
                    {data[i].image !== 'None' ? 
                        <Image 
                            src={data[i].image} 
                            alt={"Book Image"}
                            width={350}
                            height={350}
                            layout="responsive"
                        />
                        : 
                        <Image 
                            src={noImage} 
                            alt={"No Image Found"}
                            width={350}
                            height={350}
                            layout="responsive"
                        />
                    }
                    <div className={styles.text} key={"cardData" + i}>
                        <h2>{data[i].title}</h2>
                        <p className="text"><b>Author:</b> {data[i].author}</p>
                        <p className="text"><b>Description:</b>{data[i].description}</p>
                        <p className="text"><b>Date Published:</b> {data[i].date}</p>
                        <p className="text"><b>ISBN:</b> {data[i].isbn}</p>
                    </div>
                </div>
            )
        }
    }

    return(
        <div>
            <h3>Search Type Is: <i>{searchType}</i>, Search Value Is: <i>{searchValue}</i></h3>

            <ul>
                {returnJSX}
            </ul>
        </div>
    )
}