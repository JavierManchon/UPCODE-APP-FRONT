import React from 'react';
import './_description.scss'; // Importa el archivo de estilos
import { Link } from 'react-router-dom';

const Description = ({isLogged}) => {
  return (
    <div className="description-container">
      <div className="text-content">
        <h2>Pensado para los desarrolladores</h2>
        <h2>Creado para la productividad</h2>
        <p>Diseña tu código HTML y CSS y ahorra trabajo.</p>
        <Link to={isLogged ? '/user-area' : '/register'}>{isLogged ? 'Mis Diseños' : 'Registrate aquí'}</Link>
      </div>
      <div className="video-content">
        {/* Asumiendo que quieres insertar un GIF. Cambia la src por tu URL de video o GIF */}
        <img src="https://via.placeholder.com/400x300" alt="Video o GIF" />
      </div>
    </div>
  );
};

export default Description;
