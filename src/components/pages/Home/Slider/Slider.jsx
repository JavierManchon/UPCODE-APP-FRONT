import React, { useState, useEffect } from 'react';
import './_slider.scss';

const Slider = ({ slides }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(current => (current + 1) % slides.length);
        }, 3000); // Cambia cada 3 segundos

        return () => clearInterval(interval);
    }, [currentIndex, slides.length]);

    const goToNext = () => {
        setCurrentIndex((currentIndex + 1) % slides.length);
    };

    const goToPrevious = () => {
        setCurrentIndex((currentIndex - 1 + slides.length) % slides.length);
    };

    return (
        <div className="slider">
            <button onClick={goToPrevious} className="prev">&#10094;</button>
            <button onClick={goToNext} className="next">&#10095;</button>
            {slides[currentIndex]}
        </div>
    );
};

export default Slider;
