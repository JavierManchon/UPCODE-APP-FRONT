import React, { useState, useEffect, useRef } from 'react';
import './_slider.scss';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

const Slider = () => {

    const slides = [
        {
            title: 'Section',
            description: 'Podrás hacer <section> con <article> dentro y editar su texto.',
            picture: 'https://res.cloudinary.com/dtsp1wfry/image/upload/v1711803061/Captura_de_pantalla_2024-03-30_a_las_13.35.56_qjxph7.png',
        },
        {
            title: 'Nav/Footer',
            description: 'Crea tu propio <nav> con una <ul> de elementos y enlaces.',
            picture: 'https://res.cloudinary.com/dtsp1wfry/image/upload/v1711812936/Captura_de_pantalla_2024-03-30_a_las_16.35.10_es74aa.png',
        },
        {
            title: 'Div',
            description: 'Añade tantos <p> como quieras a tu <div> y edita su texto.',
            picture: 'https://res.cloudinary.com/dtsp1wfry/image/upload/v1711803022/Captura_de_pantalla_2024-03-30_a_las_13.32.15_a3uzjm.png',
        },
        {
            title: 'Figure',
            description: 'Añade tu propia url de <img> y tu <figcaption> a una <figure>.',
            picture: 'https://res.cloudinary.com/dtsp1wfry/image/upload/v1711803432/Captura_de_pantalla_2024-03-30_a_las_13.41.57_rjm7hp.png',
        },
        {
            title: 'Form',
            description: 'Crea tu propio <form> con varios <input> y <label>.',
            picture: 'https://res.cloudinary.com/dtsp1wfry/image/upload/v1711803012/Captura_de_pantalla_2024-03-30_a_las_13.29.59_u8ib6i.png',
        }
    ];

    const slideImages = slides.map((slide, index) => (
        <>
            <h3>{slide.title}</h3>
            <p>{slide.description}</p>
            <div className='picture'>
                <img src={slide.picture} alt={`Slide ${index}`} />
            </div>
            
        </>
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

    const animatedHomeRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(
        animatedHomeRef.current,
        { y: 200, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 1.5 }
        );
    }, []);

    return (
        <div className="slider" ref={animatedHomeRef}>
            <button onClick={goToPrevious} className="prev">&#10094;</button>
            <button onClick={goToNext} className="next">&#10095;</button>
            <div className="container-link-img">
                <div className='content-link'>
                    <Link to='/catalogue'>Ir al catálogo de componentes</Link>
                </div>
                <div className='content-pictures'>
                    {slideImages[currentIndex]}
                </div>
            </div>
            
        </div>
    );
};

export default Slider;
