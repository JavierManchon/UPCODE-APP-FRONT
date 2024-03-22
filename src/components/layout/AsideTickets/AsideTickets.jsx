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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataObject = Object.fromEntries(formData.entries());
    console.log("Formulario enviado:", formDataObject);
  };

  return (
    <>
      <img
        src={userImage}
        alt="Imagen de usuario"
        className={`user-image ${showAside ? "hide" : ""}`}
        onClick={handleShowAside}
      />
      <aside className={`user-data ${showAside ? "show" : ""}`}>
        <div className="container-general">
        <div className="form-user">
          <button onClick={handleHideAside} className="close-symbol">
            ✖️
          </button>

          <form action="" className="ticket" onSubmit={handleFormSubmit}>
            <span>¿Tienes alguna duda?</span>

            <label htmlFor="title">
              <span>Título</span>
              <input
                type="text"
                name="title"
                id="title"
                maxLength={10}
                placeholder="Máximo 10 caracteres"
              />
            </label>

            <label htmlFor="description">
              <span>Descripción:</span>
              <textarea
                name="description"
                id="description"
                cols="30"
                rows="10"
                placeholder="Máximo 300 caracteres"
              ></textarea>
            </label>

            <button type="submit">Enviar</button>
          </form>
        </div>
        <div className="separator"></div>
        {/* <Etiqueta de Javi></Etiqueta> */}
        </div>

        
        <div className="container-buttons">
            {isLogged ? (
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            ) : null}
            <Link to="">Mi área</Link>
            <Link to="">Área Premium</Link>
          </div>
      </aside>
    </>
  );
};

export default AsideTickets;
