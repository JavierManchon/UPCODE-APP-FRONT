import React from "react";
import "./_description.scss"; // Importa el archivo de estilos
import { Link } from "react-router-dom";

const Description = ({ isLogged }) => {

  const token = sessionStorage.getItem("token");

  return (
    <div className="description-container">
      <div className="text-content">
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
              {"Templates"}
            </Link>
          </button>
        </div>
      </div>
      <div className="video-content">
        <video className="video-content" autoPlay muted loop>
          <source src="https://res.cloudinary.com/dtsp1wfry/video/upload/v1711904422/Grabaci%C3%B3n_de_pantalla_2024-03-31_a_las_18.56.55_hudqyg.mov" type="video/mp4" />
          Tu navegador no soporta el elemento de video.
        </video>
      </div>
    </div>
  );
};

export default Description;
