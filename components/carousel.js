import { useState } from 'react';
import styles from '../styles/Carousel.module.css';

export default function Carousel({newReleases}) {

    const numOfElements = newReleases.length;

    const carousel = {
        transform: "translateZ(-461px)", // Offsets the translateZ value from carousel Element. Keeps size constant
        transformStyle: "preserve-3d", // Sets the tranform style to be 3 Dimensional
        transition: "transform 1s"
    }

    const nextClick = (e) => {
        e.preventDefault();
        let currIndex = counter + 1; // Need this line because setCounter is asynchronous
        setCounter(counter + 1);
        rotateCarousel(currIndex);
    }

    const backClick = (e) => {
        e.preventDefault();
        let currIndex = counter - 1; // Need this line because setCounter is asynchronous
        setCounter(counter - 1);
        rotateCarousel(currIndex);
    }

    const rotateCarousel = (currIndex) => {
        let angle = currIndex / numOfElements * -360;
        const moveView = {
            transform: `translateZ(-461px) rotateY(${angle}deg)`, // First Shrink new element, then rotate. Must be done in this order.
            transformStyle: "preserve-3d", // Sets the tranform style to be 3 Dimensional
            transition: "transform 1s"
        }
        setCarouselState(moveView);
    }

    const [carouselState, setCarouselState] = useState(carousel);
    const [counter, setCounter] = useState(0);

    const carouselData = [];

    for (let i = 0; i < newReleases.length; i++){
        carouselData.push(
            <div className={styles.carouselElement} key={i}> {newReleases[i]} </div>
        )
    }

    return (
        <div>
            <div className={styles.container}>
                <div style={carouselState}>
                    {carouselData}
                </div>
            </div>

            <div style={{textAlign: 'center'}}>
                {/* <p>Carousel View = {counter + 1}</p> */}
                <button onClick={(e) => backClick(e)}>Back</button>
                <button onClick={(e) => nextClick(e)}>Next</button>
            </div>
        </div>
    )
}