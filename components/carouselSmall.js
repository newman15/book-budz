import { useState } from 'react';

export default function Carousel({newReleases}) {

    const numOfElements = newReleases.length;
    const [counter, setCounter] = useState(0);

    const nextClick = (e) => {
        e.preventDefault();
        let tempCount = counter + 1;
        setCounter(counter + 1);
        console.log("counter = " + tempCount % numOfElements);
        setCarouselState(carouselData[tempCount % numOfElements]);
    }

    const backClick = (e) => {
        e.preventDefault();
        let tempCount = counter - 1;
        setCounter(counter - 1);
        console.log("counter = " + tempCount % numOfElements);
        setCarouselState(carouselData[tempCount % numOfElements]);
    }

    const carouselData = [];

    for (let i = 0; i < newReleases.length; i++){
        carouselData.push(
            <div key={i}> {newReleases[i]} </div>
        )
    }

    const [carouselState, setCarouselState] = useState(carouselData[counter]);
    
    return (
        <div>
            <div>
                {carouselState}
            </div>

            <div className="text-center mb-6">
                {/* <p>Carousel View = {counter + 1}</p> */}
                <button className="p-1 m-2 border-2 border-black bg-blue-500 rounded-md text-white cursor-pointer" onClick={(e) => backClick(e)}>Back</button>
                <button className="p-1 m-2 border-2 border-black bg-blue-500 rounded-md text-white cursor-pointer" onClick={(e) => nextClick(e)}>Next</button>
            </div>
        </div>
    )
}