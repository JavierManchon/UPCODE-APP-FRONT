import React, { useState } from "react";
import "./_asideTickets.scss";
import { Link, useNavigate } from "react-router-dom";

const AsideTickets = ({ isLogged, setIsLogged }) => {
  const [userName, setUserName] = useState("Context Enjoyers");
  const [email, setEmail] = useState("context@enjoyers.com");
  const [userImage, setUserImage] = useState(
    "https://res.cloudinary.com/do0s2lutu/image/upload/v1701777805/owonnexnscmi56bbdomz.png"
  );
  const navigate = useNavigate();

  const [showAside, setShowAside] = useState(false);
  const handleShowAside = () => {
    setShowAside(true);
  };
  const handleHideAside = () => {
    setShowAside(false);
  };

  const handleLogout = () => {
    navigate("/");
    sessionStorage.clear();
    setIsLogged(false);
  };

  // Estado para controlar si el elemento se está arrastrando
  const [isDragging, setIsDragging] = useState(false);

  // Estado para almacenar la posición actual del elemento
  const [position, setPosition] = useState({ x: 200, y: 100 }); // Posición inicial predeterminada

  // Almacenar la posición inicial del ratón y del elemento cuando se inicia el arrastre
  const [dragStart, setDragStart] = useState({
    mouseX: 0,
    mouseY: 0,
    elemX: 0,
    elemY: 0,
  });

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({
      mouseX: e.clientX,
      mouseY: e.clientY,
      elemX: position.x,
      elemY: position.y,
    });
    e.preventDefault(); // Previene la selección de texto
  };

  const handleMouseMove = (e) => {
  if (isDragging) {
    const dx = e.clientX - dragStart.mouseX;
    const dy = e.clientY - dragStart.mouseY;
    let newY = dragStart.elemY + dy;

    // Limitar la posición y para que no sea menor que 80px
    if (newY < 80) {
      newY = 80;
    }

    setPosition({
      x: dragStart.elemX + dx,
      y: newY,
    });
  }
};


  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataObject = Object.fromEntries(formData.entries());
    console.log("Formulario enviado:", formDataObject);
  };

  return (
    <div className={`container-aside ${showAside ? 'show' : ''}`}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp} // Agregado para manejar el caso en que el mouse salga del componente mientras arrastra
          style={{
            position: "absolute",
            left: `${position.x}px`,
            top: `${position.y}px`,
            cursor: isDragging ? "grabbing" : "grab",
          }}>
      {!showAside ? (
        <img
            src={userImage}
            alt="Imagen de usuario"
            className="user-image"
            onClick={handleShowAside}
        />
        
      ) : null}
      {showAside ? (
        <aside className="user-data">
          <div className="wrapper">
            <button onClick={handleHideAside} className="close-symbol">✖️</button>
            <button className="drag-symbol">⇅</button>
          </div>
          
          <div className="container-user" onMouseDown={handleMouseDown}>
              <h3>{userName}</h3>
              <p>{email}</p>
          </div>

          <form action="" className="ticket" onSubmit={handleFormSubmit}>
            <span>¿Tienes alguna duda?</span>

            <label htmlFor="title">
                <span>Título</span>
                <input type="text" name="title" id="title" maxLength={10} placeholder="Máximo 10 caracteres"/>
            </label>

            <label htmlFor="description">
                <span>Descripción:</span>
                <textarea name="description" id="description" cols="30" rows="10" placeholder="Máximo 300 caracteres"></textarea>
            </label>
            
            <button type="submit">Enviar</button>
          </form>

          <div className="container-buttons">
          {isLogged
            ? <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
            : null
          }
            <Link to="">Mi área</Link>
            <Link to="">Área Premium</Link>
          </div>
        </aside>
      ) : null}
    </div>
  );
};

export default AsideTickets;
