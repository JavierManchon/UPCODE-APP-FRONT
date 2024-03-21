import React, { useState } from "react";
import "./_asideUser.scss";
import { Link, useNavigate } from "react-router-dom";

const AsideUser = ({ setIsLogged }) => {
  const [userName, setUserName] = useState("Nombre Apellido");
  const [email, setEmail] = useState("email@example.com");
  const [userImage, setUserImage] = useState(
    "https://res.cloudinary.com/do0s2lutu/image/upload/v1701777805/owonnexnscmi56bbdomz.png"
  );
  const navigate = useNavigate();

  // Estado para controlar si el elemento se está arrastrando
  const [isDragging, setIsDragging] = useState(false);

  // Estado para almacenar la posición actual del elemento
  const [position, setPosition] = useState({ x: 1200, y: 0 }); // Posición inicial predeterminada

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
      setPosition({
        x: dragStart.elemX + dx,
        y: dragStart.elemY + dy,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleLogout = () => {
    navigate("/");
    sessionStorage.clear();
    setIsLogged(false);
  };

  return (
    <aside
      className="user-data"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp} // Agregado para manejar el caso en que el mouse salga del componente mientras arrastra
      style={{
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: isDragging ? "grabbing" : "grab",
      }}
    >
      <div className="container-user" onMouseDown={handleMouseDown}>
        <div className="user-image-container">
          <img src={userImage} alt="Imagen de usuario" className="user-image" />
          <Link to="">✏️</Link>
        </div>
        <div className="user-info">
          <h3>{userName}</h3>
          <p>{email}</p>
        </div>
      </div>
      <div className="container-button">
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
        <Link to="">Mi área</Link>
        <button className="premium-btn">Premium</button>
      </div>
    </aside>
  );
};

export default AsideUser;
