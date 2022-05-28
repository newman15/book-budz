import { useState } from 'react';

export default function Carousel({newReleases}) {

    const numOfElements = newReleases.length;
    const [counter, setCounter] = useState(0);

    const nextClick = (e) => {
        e.preventDefault();
        let tempCount = counter + 1;
        setCounter(counter + 1);
        let nextCard = Math.abs((tempCount + numOfElements) % numOfElements);
        console.log("counter = " + nextCard);
        setCarouselState(carouselData[nextCard]);
    }

    const backClick = (e) => {
        e.preventDefault();
        let tempCount = counter - 1;
        setCounter(counter - 1);
        let prevCard = Math.abs((tempCount + numOfElements) % numOfElements);
        console.log("counter = " + prevCard);
        setCarouselState(carouselData[prevCard]);
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
            <div className='m-6'>
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