import Image from "next/image";
import styles from '../../styles/Board.module.css';
import noImage from '../../public/unavailable_img.jpeg';

export default function BookView({bookData}) {
    
    return (
        <div className={`${styles.gridContainer}`}>
            <div className={`${styles.padding}`}>
                {bookData.image !== 'None' ? 
                    <Image 
                        src={bookData.image} 
                        alt={"Book Image"}
                        width={120}
                        height={120}
                        layout="intrinsic"
                    />
                    : 
                    <Image 
                        src={noImage} 
                        alt={"No Image Found"}
                        width={120}
                        height={120}
                        layout="intrinsic"
                    />
                }
            </div>
            
            <div className={`${styles.margin}`}>
                <p>Title: {bookData.title}</p>
                <p>Author: {bookData.author}</p>
            </div>

            <div className={`${styles.margin}`}>
                <p>Community Rating: * * * * *</p>
            </div>
        </div>
    )
};
