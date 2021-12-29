import useSWR from 'swr';
import Image from 'next/dist/client/image';
import styles from '../../styles/Card.module.css';
import noImage from '../../public/unavailable_img.jpeg';
import liked from '../../public/liked.svg';
import notLiked from '../../public/not_liked.svg';

export default function SearchResults({searchType, searchValue}) {

    // Array to store the JSX to be sent to the DOM
    let returnJSX = [];

    // Itinitialize fetcher for api calls to backend
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

                        {/* Modal */}
                        <button className={styles.modalBtn}
                            onClick={() => {
                                document.getElementById('modal' + i).style.display = 'block';
                            }}>Show Description +/-
                        </button>

                        <div className={styles.modal} id={'modal' + i} >

                            <div className={styles.content} >
                                
                                <span className={styles.close} 
                                    onClick={() => {
                                        document.getElementById('modal' + i).style.display = 'none';
                                    }}>&times;
                                </span>

                                <p className={styles.descriptionContent}>{data[i].description}</p>

                            </div>

                        </div>
                        {/* End Modal */}
                        
                        <p><b>Published:</b> {data[i].date}</p>

                        <p><b>ISBN:</b> {data[i].isbn}</p>

                        <div className={styles.imgNotLiked} id={'imgNotLiked' + i} 
                            onClick={() => {
                                document.getElementById('imgLiked' + i).style.display = 'block';
                                document.getElementById('imgNotLiked' + i).style.display = 'none';
                            }}>

                            <Image 
                                src={notLiked} 
                                alt={"not liked"}
                                width={50}
                                height={50}
                                layout="intrinsic"
                            />

                        </div>

                        <div className={styles.imgLiked} id={'imgLiked' + i} 
                            onClick={() => {
                                document.getElementById('imgLiked' + i).style.display = 'none';
                                document.getElementById('imgNotLiked' + i).style.display = 'block';
                            }}>

                            <Image 
                                src={liked} 
                                alt={"liked img"}
                                width={50}
                                height={50}
                                layout="intrinsic"
                            />

                        </div>

                    </div>
                </div>
            )
        }
    }

    return(
        <div>
            <h3>Search Type Is: <i>{searchType}</i>, Search Value Is: <i>{searchValue}</i></h3>

            <div className={styles.cardContainer}>
                {returnJSX}
            </div>
        </div>
    )
}