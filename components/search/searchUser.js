import useSWR from "swr";
import Image from 'next/dist/client/image';
import styles from '../../styles/Card.module.css'
import noImage from '../../public/unavailable_img.jpeg';
import liked from '../../public/liked.svg';

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
                <div className={styles.card} key={"card" + i} id={"cardId" + i}>
                    {data[i].image !== 'None' ? 
                        <Image 
                            src={data[i].image} 
                            alt={"Book Image"}
                            width={350}
                            height={350}
                            layout="responsive"
                            priority
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

                        <div className={styles.imgLikedSavedBook} id={'imgLiked' + i} 
                            onClick={() => {
                                // On click remove the book that was selected
                                document.getElementById('cardId' + i).style.display = 'none';
                                
                                // Book data to be sent to API route
                                let bookData = {
                                    userId: userId,
                                    title: data[i].title,
                                    author: data[i].author,
                                    date: data[i].date,
                                    isbn: data[i].isbn,
                                    description: data[i].description,
                                    image: data[i].image
                                }

                                // Send the book data to the backend API to be deleted
                                fetch('/api/db/deleteBook', 
                                    {
                                        method: 'POST',
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                        body: JSON.stringify(bookData),
                                    }
                                );
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
            <div className={styles.cardContainer}>
                {returnJSX}
            </div>
        </div>
    )
}