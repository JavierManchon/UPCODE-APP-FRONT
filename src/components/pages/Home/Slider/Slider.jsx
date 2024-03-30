import React, { useState, useEffect } from 'react';
import './_slider.scss';

const Slider = () => {

    const slides = [
        'https://images.pexels.com/photos/6272/wood-free-wooden-home.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/19035715/pexels-photo-19035715/free-photo-of-francia-campo-verano-jardin.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/10434596/pexels-photo-10434596.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/18874829/pexels-photo-18874829/free-photo-of-ciudad-cielo-punto-de-referencia-calle.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://res.cloudinary.com/dtsp1wfry/image/upload/v1711110900/lmconhq5hl1t9efxcqaz.jpg',
      ];
    
      const slideImages = slides.map((url, index) => (
        <img key={index} src={url} alt={`Slide ${index}`} style={{ width: '30%', height: '300px' }} />
    ));

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(current => (current + 1) % slideImages.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [currentIndex, slideImages.length]);

    const goToNext = () => {
        setCurrentIndex((currentIndex + 1) % slideImages.length);
    };

    const goToPrevious = () => {
        setCurrentIndex((currentIndex - 1 + slides.length) % slideImages.length);
    };

    return (
        <div className="slider">
            <button onClick={goToPrevious} className="prev">&#10094;</button>
            <button onClick={goToNext} className="next">&#10095;</button>
            {slideImages[currentIndex]}
        </div>
    );
};

export default Slider;
