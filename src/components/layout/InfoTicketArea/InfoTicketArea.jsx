import React, { useState, useEffect } from "react";
import "./_infoTicketArea.scss";
import { useAuth } from "../../context/AuthContext";
import { postTicketReq, getTicketsByUserReq } from "../../../api/axios/tickets";

const InfoTicketArea = () => {
  const {authState} = useAuth();
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchUserTickets = async () => {
        try {
            //No usar esta, hay que usar el getOneUser que hay en el back
          const response = await getTicketsByUserReq(authState.user._id);
          console.log(response.data)
          setTickets(response.data);
        } catch (error) {
          console.error("Error al obtener los tickets del usuario:", error);
        }
      };

    fetchUserTickets();
  }, []);


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataObject = Object.fromEntries(formData.entries());
    formDataObject.userId = authState.user._id;
  
    try {
      const response = await postTicketReq(formDataObject);
      setTickets([...tickets, response.data]);
      e.target.reset();
      alert("¡El ticket se ha enviado correctamente!");
    } catch (error) {
      console.error("Error al enviar el ticket:", error);
      alert("Ha ocurrido un error al enviar el ticket...");
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
                <input
                    type="file"
                    name="screenshot"
                    id="screenshot"
                />
                </label>
                <button type="submit">Enviar</button>
            </form>
            <div className="ticket-list">
                <h2>Tickets del Usuario</h2>
                <ul>
                {tickets.map((ticket) => (
                    <li key={ticket._id}>
                    <span>{ticket.title}</span>
                    <span>{new Date(ticket.createdAt).toLocaleDateString()}</span>
                    <div className={`status-indicator ${ticket.status.toLowerCase()}`}></div>
                    </li>
                ))}
                </ul>
                {tickets.length === 0 && <div>No hay tickets activos</div>}
            </div>
        </div>
    </>
  );
};

export default InfoTicketArea;
