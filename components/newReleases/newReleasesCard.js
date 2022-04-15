import Image from "next/image";
import noImage from '../../public/unavailable_img.jpeg';

export default function NewReleasesCard({newReleases}) {

    const card = {
        backgroundColor: 'grey',
        fontSize: 'medium',
        margin: '1rem 1rem',
        padding: '1rem 1rem',
        border: 'black solid',
        borderRadius: '10px'
    }

    return (
        <div style={card}>
            {newReleases.image !== 'None' ? 
                <Image 
                    src={newReleases.image} 
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

            <p>Title: {newReleases.title}</p>
            <p>Author: {newReleases.author}</p>
        </div>
    )
}