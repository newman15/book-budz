import Image from "next/image";
import noImage from '../../public/unavailable_img.jpeg';
import fullStar from '../../public/icons/FullStar.svg';

export default function BookView({bookData}) {

    // Store tailwind utility classes in variables to simplify implementation and
    // provide an easier way to upkeep their behaviors across different screen sizes.
    const desktop = "md:grid md:grid-cols-4 md:w-11/12 md:text-left";
    const mobile = "w-72 xs:w-80 border-8 border-black rounded-xl m-8 text-center hover:shadow-[0_8px_16px_8px_rgba(0,0,0,1)]";

    let starRating = []; // Array to store star images

    // Populates starRating array with star images.
    for (let i = 0; i < 5; i++){
        starRating.push(
            <Image 
                src={fullStar} 
                alt={"Star Image"}
                width={30}
                height={30}
                layout="intrinsic"
            />
        )
    }
    
    return (
        <div className={`${mobile} ${desktop} mx-auto`}>
            <div>
                {bookData.image !== 'None' ? 
                    <Image 
                        src={bookData.image} 
                        alt={"Book Image"}
                        width={350}
                        height={350}
                        layout="intrinsic"
                    />
                    : 
                    <Image 
                        src={noImage} 
                        alt={"No Image Found"}
                        width={350}
                        height={350}
                        layout="intrinsic"
                    />
                }
            </div>

            <div className="m-4">
                <p className="p-4"><b>Title:</b> {bookData.title}</p>
            </div>
            
            <div className="m-4">
                <p className="p-4"><b>Author:</b> {bookData.author}</p>
            </div>

            <div className="m-4">
                <p className="p-4"><b>Community Rating:</b></p><br/>
                <span className="md:ml-4">
                    {starRating}
                </span>
            </div>
        </div>
    )
};
