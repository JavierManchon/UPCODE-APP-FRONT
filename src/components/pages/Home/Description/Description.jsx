import React, { useEffect, useRef } from "react";
import "./_description.scss";
import { Link } from "react-router-dom";
import gsap from 'gsap';

const Description = ({ isLogged }) => {

  const token = sessionStorage.getItem("token");

  const animatedHomeBottom = useRef(null);
  const animatedHomeLeft = useRef(null);
  const animatedHomeRight = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      animatedHomeBottom.current,
      { y: 200, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );
  }, []);

  useEffect(() => {
    gsap.fromTo(
      animatedHomeLeft.current,
      { x: 2000, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 }
    );
  }, []);

  useEffect(() => {
    gsap.fromTo(
      animatedHomeRight.current,
      { x: -2000, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 }
    );
  }, []);

  return (
    <div className="description-container" ref={animatedHomeBottom}>
      <div className="text-content" ref={animatedHomeRight}>
        <h2>Pensado para developers</h2>
        <h2 className="highlight">Creado para la productividad</h2>
        <p>¡Te damos al bienvenida a nuestra plataforma diseñada para impulsar tu productividad como desarrollador! Ya sea que estés construyendo una página web, una aplicación móvil o cualquier otro proyecto digital, nuestro conjunto de herramientas está aquí para simplificar tu flujo de trabajo y acelerar tus resultados.</p>
        <div className="home-button-area">
          <button className="button-user">
            <Link to={token ? "/user-area" : "/register"}>
              {token ? "Mis Diseños" : "Registrate aquí"}
            </Link>
          </button>
          <button className="button-catalogue">
            <Link to={"/catalogue"}>
              {"Catálogo"}
            </Link>
          </button>
        </div>
      </div>
      <div className="video-content" ref={animatedHomeLeft}>
        <video className="video-content" autoPlay muted loop>
          <source src="https://res.cloudinary.com/dtsp1wfry/video/upload/v1711904422/Grabaci%C3%B3n_de_pantalla_2024-03-31_a_las_18.56.55_hudqyg.mov" type="video/mp4" />
          Tu navegador no soporta el elemento de video.
        </video>
      </div>
    </div>
  );
};

export default Description;
