import React, { useState } from "react";
import "./_asideTickets.scss";
import { Link, useNavigate } from "react-router-dom";
import Profile from "../../pages/Profile/Profile";
import { useAuth } from "../../context/AuthContext";
import { postTicketReq } from "../../../api/axios/tickets";
import Default from '../../../images/default-user.png';

const AsideTickets = ({ isLogged, setIsLogged }) => {
  const {authState} = useAuth();

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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataObject = Object.fromEntries(formData.entries());
    formDataObject.userId = authState.user._id;
  
    try {
      await postTicketReq(formDataObject);
      e.target.reset();
      alert("¡El ticket se ha enviado correctamente!");
    } catch (error) {
      console.error("Error al enviar el ticket:", error);
      alert("Ha ocurrido un error al enviar el ticket...");
    }
  };
  

  return (
    <>
      {isLogged ? (
        <>
        <img
            src={authState.user.image ? authState.user.image : Default} 
            alt="Imagen de usuario"
            className={`user-image ${showAside ? "hide" : ""}`}
            onClick={handleShowAside}
          />
          <aside className={`user-data ${showAside ? "show" : ""}`}>
            <div className="container-general">
              <button onClick={handleHideAside} className="close-symbol">
                x
              </button>
              <div className="form-user">
                <button onClick={handleHideAside} className="close-symbol">
                  x
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

                  <label htmlFor="screenshot">
                    <span>Captura:</span>
                    <input
                      type="file"
                      name="screenshot"
                      id="screenshot"
                    />
                  </label>

                  <button type="submit">Enviar</button>
                </form>
              </div>
              <div className="separator"></div>
              <Profile />
            </div>

            <div className="container-buttons">
              {isLogged ? (
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              ) : null}
              <Link to="">Mi área</Link>
            </div>
          </aside>
        </>
      ) : null}
    </>
  );
};

export default AsideTickets;
