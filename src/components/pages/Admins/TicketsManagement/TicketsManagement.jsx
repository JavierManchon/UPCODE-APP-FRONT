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
    <div>
      <h1>Admin Tickets Management</h1>
      {userData ? (
        <div>
          <h2>User ID: {userData._id}</h2>
          <p>User Name: {userData.name}</p>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Screenshot</th>
                <th>Created At</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {userData.tickets.map((ticket) => (
                <tr key={ticket._id}>
                  <td>{ticket.title}</td>
                  <td>{ticket.description}</td>
                  <td>
                    <img
                      className="ticketImg"
                      src={ticket.screenshot}
                      alt="screenshot"
                      onClick={() => openLightbox(ticket.screenshot)}
                    />
                  </td>
                  {lightboxOpen && (
                    <div
                      className="lightbox"
                      onClick={closeLightbox}
                    >
                      <img className="lightboxImg"
                        src={lightboxImageUrl}
                        alt="screenshot"
                      />
                    </div>
                  )}
                  <td>{new Date(ticket.createdAt).toLocaleString()}</td>
                  <td>{ticket.status}</td>
                  <td>
                    {ticket.status === "En proceso" && (
                      <button
                        onClick={() =>
                          handleStatusChange(ticket._id, "Enviado")
                        }
                      >
                        Marcar como Enviado
                      </button>
                    )}
                    {ticket.status === "Enviado" && (
                      <button
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
                      <button>Contactar por correo</button>
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
