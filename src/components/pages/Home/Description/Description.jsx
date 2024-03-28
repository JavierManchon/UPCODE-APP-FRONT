import React from "react";
import "./_description.scss"; // Importa el archivo de estilos
import { Link } from "react-router-dom";

const Description = ({ isLogged }) => {
  return (
    <div className="description-container">
      <div className="text-content">
        <h2 className="title">Pensado para los desarrolladores</h2>
        <h2>Creado para la productividad</h2>
        <p>¡Bienvenido a nuestra plataforma diseñada para impulsar tu productividad como desarrollador! Ya sea que estés construyendo una página web, una aplicación móvil o cualquier otro proyecto digital, nuestro conjunto de herramientas está aquí para simplificar tu flujo de trabajo y acelerar tus resultados.</p>
        <h2>Diseña Tu Código HTML y CSS y Ahorra Trabajo</h2>
        <p>Con nuestras herramientas intuitivas y potentes, puedes crear y diseñar tu código HTML y CSS de manera eficiente y efectiva. Desde plantillas predefinidas hasta funciones avanzadas de personalización, te ofrecemos todo lo que necesitas para llevar tus proyectos al siguiente nivel. ¡Ahorra tiempo y esfuerzo mientras alcanzas tus metas de desarrollo!

</p>
        <Link to={isLogged ? "/user-area" : "/register"}>
          {isLogged ? "Mis Diseños" : "Registrate aquí"}
        </Link>
      </div>
      <div className="video-content">
        <video className="video-content" autoPlay muted loop>
          <source src="/src/images/the best app for Developers 2024.mp4" type="video/mp4" />
          Tu navegador no soporta el elemento de video.
        </video>
      </div>
    </div>
  );
};

export default Description;
