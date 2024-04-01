import React, { useState, useEffect } from "react";
import "./_infoTicketArea.scss";
import { useAuth } from "../../context/AuthContext";
import { getOneUserReq } from "../../../api/axios/auth";
import { postTicketReq, patchTicketReq } from "../../../api/axios/tickets";

const InfoTicketArea = () => {
  const { authState } = useAuth();
  const [user, setUser] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const [showTicketAlert, setShowTicketAlert] = useState(false);
  const [ticketAlertMessage, setTicketAlertMessage] = useState('');


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getOneUserReq(authState.user._id);
        setUser(response.data);
      } catch (error) {
        console.error("Error al obtener la información del usuario:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataObject = Object.fromEntries(formData.entries());
    formDataObject.userId = authState.user._id;

    try {
      const response = await postTicketReq(formDataObject);
      setUser((prevUser) => {
        return {
          ...prevUser,
          tickets: [...(prevUser.tickets || []), response.data],
        };
      });
      e.target.reset();
      setTicketAlertMessage("Ticket enviado con éxito!");
      setShowTicketAlert(true);
    } catch (error) {
      setTicketAlertMessage("Ha ocurrido un error al enviar el ticket...");
      setShowTicketAlert(true);
    }
  };

  const handleTicketClick = (ticket) => {
    if (selectedTicket && selectedTicket._id === ticket._id) {
      setSelectedTicket(null);
    } else {
      setSelectedTicket(ticket);
    }
  };

  const handleStatusChange = async (ticket) => {
    if (ticket.status === "En proceso") {
      try {
        await patchTicketReq(ticket._id, { status: "Completado" });
        const updatedUserResponse = await getOneUserReq(user._id);
        setUser(updatedUserResponse.data);
      } catch (error) {
        console.error("Error actualizando el estado:", error);
      }
    }
  };
  const handleCloseAlert = () => {
    setShowTicketAlert(false);
  };

  return (
    <>
      <div className="container-infoticket">
        <h4>¿Podemos ayudarte?</h4>
        <form action="" className="infoticket" onSubmit={handleFormSubmit}>

          <label htmlFor="title" className="ticket-title">
            <span>Título</span>
            <input
              type="text"
              name="title"
              id="title"

              maxLength={20}
              placeholder=" Máximo 20 caracteres"
            />
          </label>

          <label htmlFor="screenshot" className="ticket-screenshot">
            <span>Captura:</span>
            <input type="file" name="screenshot" id="screenshot" />
          </label>

          <label htmlFor="description" className="ticket-description">
            <span>Descripción:</span>
            <textarea
              name="description"
              id="description"
              cols="30"
              rows="10"
              placeholder=" Máximo 300 caracteres"
            ></textarea>
          </label>

          <button type="submit">Enviar</button>
        </form>
        <div className="ticket-list">
          <ul className="ticket-list__list">
            {user?.tickets?.length ? (
              user.tickets.map((ticket) => (
                <li
                  className="ticket-list__item"
                  key={ticket._id}
                  onClick={() => handleTicketClick(ticket)}
                >
                  <div className="ticket-list_item-resume">
                    <span>{ticket.title}</span>
                    <span className="item-resume-date">
                      {new Date(ticket.createdAt).toLocaleDateString()}
                    </span>
                    <div
                      className={`status-indicator ${ticket.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    ></div>
                  </div>
                  {selectedTicket && selectedTicket._id === ticket._id && (
                    <div className="ticket-details">
                      <p>
                        <strong>Título:</strong> {ticket.title}
                      </p>
                      <p>
                        <strong>Descripción:</strong> {ticket.description}
                      </p>
                      {ticket.screenshot && (
                        <img
                          src={ticket.screenshot}
                          alt="Captura de pantalla"
                          className="ticket-screenshot"
                        />
                      )}
                      <p>
                        <strong>Fecha de Creación:</strong>{" "}
                        {new Date(ticket.createdAt).toLocaleDateString()}
                      </p>
                      <p>
                        <strong>Estado:</strong>{" "}
                        {ticket.status}
                      </p>
                      {ticket.status === "En proceso" && (
                        <button
                          onClick={() => handleStatusChange(ticket)}
                          className="complete-button"
                        >
                          Resuelto
                        </button>
                      )}
                    </div>
                  )}
                </li>
              ))
            ) : (
              <div>No hay tickets activos</div>
            )}
          </ul>
        </div>
      </div>
      {showTicketAlert && (
        <div className="ticket-alert-overlay">
          {ticketAlertMessage}
          <button onClick={handleCloseAlert} className="close-alert">x</button>
        </div>
      )}
    </>
  );
};

export default InfoTicketArea;
