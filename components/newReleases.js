import useSWR from "swr";
import Image from 'next/image'
import noImage from '../public/unavailable_img.jpeg';
import styles from '../styles/Card.module.css'

export default function NewReleases(){

    // Array to store the JSX to be sent to the DOM
    let returnJSX = [];

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
            returnJSX.push(
                <div className={styles.carouselCard} key={"card" + i} id={"cardId" + i}>
                    {data[i].image !== 'None' ? 
                        <Image 
                            src={data[i].image} 
                            alt={"Book Image"}
                            width={250}
                            height={250}
                            layout="fixed"
                            priority
                        />
                        : 
                        <Image 
                            src={noImage} 
                            alt={"No Image Found"}
                            width={250}
                            height={250}
                            layout="fixed"
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

                        <p style={{overflowX: "hidden"}}><b>ISBN:</b> {data[i].isbn}</p>

                    </div>
                </div>
            )
        }
    }

    // let finalReturnJSX = (
    //     <div className={styles.carousel} id={"carouselScroll"}>
    //         {returnJSX}
    //     </div>
    // )

    // let element = document.getElementById("carouselCard");
    // var rect = element.getBoundingClientRect();
    // console.log(rect.top, rect.right, rect.bottom, rect.left);

    return (
        <div className={styles.carousel} id={"carouselScroll"}>
            {returnJSX}
        </div>
    )
}