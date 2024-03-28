import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOneUserReq, patchUserReq } from "../../../../api/axios/auth";
import "./_ticketsManagement.scss";
import { patchTicketReq } from "../../../../api/axios/tickets";

function TicketsManagement() {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImageUrl, setLightboxImageUrl] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getOneUserReq(userId);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [userId]);

  const openLightbox = (imageUrl) => {
    setLightboxImageUrl(imageUrl);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxImageUrl("");
    setLightboxOpen(false);
  };

  const handleStatusChange = async (ticketId, newStatus) => {
    try {
      await patchTicketReq(ticketId, { status: newStatus });
      const updatedUserResponse = await getOneUserReq(userId);
      setUserData(updatedUserResponse.data);
    } catch (error) {
      console.error("Error updating ticket status:", error);
    }
  };

  const handleDeleteTicket = async (ticketId) => {
    try {
      const updatedTickets = userData.tickets.filter(
        (ticket) => ticket._id !== ticketId
      );
      const updatedUserData = { ...userData, tickets: updatedTickets };
      await patchUserReq(userId, { tickets: updatedTickets });
      setUserData(updatedUserData);
    } catch (error) {
      console.error("Error deleting ticket:", error);
    }
  };

  return (
    <div className="tickets-title-container">
      <h1 className="tickets-title-management">Tickets</h1>
      {userData ? (
        <div className="tickets-containerAll">
          <h2 className="username">Username: {userData.username}</h2>
          <p className="user_id">User_ID: {userData._id}</p>
          <p className="email">Email: {userData.email}</p>
          <table className="tickets-table">
            <thead className="tickets-table__head">
              <tr className="tickets-table__head__tr">
                <th className="table-header">Title</th>
                <th className="table-header">Description</th>
                <th className="table-header-img">Screenshot</th>
                <th className="table-header">Created At</th>
                <th className="table-header">Status</th>
                <th className="table-header">Action</th>
              </tr>
            </thead>
            <tbody>
              {userData.tickets.map((ticket) => (
                <tr key={ticket._id}>
                  <td className="table-data">{ticket.title}</td>
                  <td className="table-data">{ticket.description}</td>
                  <td className="table-data">
                    {ticket.screenshot ? (
                      <img
                        className="ticket-Img-data"
                        src={ticket.screenshot}
                        alt="screenshot"
                        onClick={() => openLightbox(ticket.screenshot)}
                      />
                    ) : (
                      <span className="no-image">No se adjunto una captura del problema</span>
                    )}
                  </td>
                  {lightboxOpen && (
                    <div className="lightbox" onClick={closeLightbox}>
                      <img
                        className="lightboxImg"
                        src={lightboxImageUrl}
                        alt="screenshot"
                      />
                    </div>
                  )}

                  <td className="table-data">
                    {new Date(ticket.createdAt).toLocaleString()}
                  </td>
                  <td className="table-data">
                    <div
                      className={`status-indicator ${ticket.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      <span className="sr-only">{ticket.status}</span>{" "}
                    </div>
                  </td>

                  <td className="table-data">
                    {ticket.status === "En proceso" && (
                      <button
                        className="send-button"
                        onClick={() =>
                          handleStatusChange(ticket._id, "Enviado")
                        }
                      >
                        Marcar como Enviado
                      </button>
                    )}
                    {ticket.status === "Enviado" && (
                      <button
                        className="in-process-button"
                        onClick={() =>
                          handleStatusChange(ticket._id, "En proceso")
                        }
                      >
                        Marcar como En proceso
                      </button>
                    )}
                    {ticket.status === "Completado" && (
                      <button onClick={() => handleDeleteTicket(ticket._id)}>
                        Eliminar
                      </button>
                    )}
                    <a
                      href={`mailto:${userData.email}?subject=Up_Code_Support%20:%20${ticket.title}`}
                    >
                      <button className="email-button">
                        <div>✉️</div>
                      </button>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}

export default TicketsManagement;
