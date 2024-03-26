import React, { useState, useEffect } from "react";
import "./_infoTicketArea.scss";
import { useAuth } from "../../context/AuthContext";
import { getOneUserReq } from "../../../api/axios/auth";
import { postTicketReq } from "../../../api/axios/tickets";

const InfoTicketArea = () => {
  const { authState } = useAuth();
  const [user, setUser] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getOneUserReq(authState.user._id);
        console.log(response.data);
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
      alert("¡El ticket se ha enviado correctamente!");
    } catch (error) {
      console.error("Error al enviar el ticket:", error);
      alert("Ha ocurrido un error al enviar el ticket...");
    }
  };

  const handleTicketClick = (ticket) => {
    if (selectedTicket && selectedTicket._id === ticket._id) {
      setSelectedTicket(null); // Si el ticket seleccionado ya está abierto, ciérralo
    } else {
      setSelectedTicket(ticket); // De lo contrario, abre el ticket seleccionado
    }
  };

  return (
    <>
      <div className="container-infoticket">
        <form action="" className="infoticket" onSubmit={handleFormSubmit}>
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
            <input type="file" name="screenshot" id="screenshot" />
          </label>
          <button type="submit">Enviar</button>
        </form>
        <div className="ticket-list">
          <h2>Tickets del Usuario</h2>
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
                    <span>
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
                      <h3>Detalles del Ticket</h3>
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
                        {ticket.status === "Enviado" ? "Enviado" : "En Proceso"}
                      </p>
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
    </>
  );
};

export default InfoTicketArea;
