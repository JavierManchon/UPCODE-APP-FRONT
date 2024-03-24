import React, { useState } from "react";
import "./_ticketsDetails.scss";

function TicketsDetails() {
  const [ticket, setTicket] = useState({
    title: "Ticket 1",
    description: "bug en el menu desplegable",
    status: "Enviado",
    comments: [
      { text: "hola", isAdmin: true },
      { text: "chau", isAdmin: false },
      { text: "adios", isAdmin: true },
      { text: "bye", isAdmin: false },
      { text: "hasta luego", isAdmin: true },
    ],
    image:
      "https://images.wondershare.com/videoconverter/mac/edit-screenshot-mac-1.jpg",
  });

  const [editedStatus, setEditedStatus] = useState(ticket.status);
  const [comments, setComments] = useState(ticket.comments);
  const [comment, setComment] = useState("");
  const [isTicketClosed, setIsTicketClosed] = useState(false);

  const isCommentEnabled = comments.length % 2 !== 0 && !isTicketClosed; // Se activa cuando el número de comentarios es impar y el ticket no está cerrado


  const [isImageExpanded, setIsImageExpanded] = useState(false);

  const handleImageClick = () => {
    setIsImageExpanded(!isImageExpanded); 
  };
  const handleStatusChange = (e) => {
    setEditedStatus(e.target.value);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
    setEditedStatus("En proceso");
  };

  const handleCloseTicket = () => {
    setEditedStatus("Cerrado");
    setIsTicketClosed(true);
  };

  const handleSaveChanges = () => {
    console.log("Estado del ticket actualizado:", editedStatus);
    console.log("Nuevo comentario:", comment);
    const updatedComments = [...comments, { text: comment, isAdmin: true }]; 
    setComments(updatedComments);
    setComment(""); 
  };

  return (
    <div className="ticket-details-container">
      <h2 className="title">Ticket Details</h2>
      <div className="ticket-details">
        <div className="detail">
          <label className="label-title">Title:</label>
          <p className="input-value">{ticket.title}</p>
        </div>
        <div className="detail">
          <label className="label-description">Description:</label>
          <p className="textarea-description">{ticket.description}</p>
        </div>
        <div className={`detail ${editedStatus === "Cerrado" ? "closed-ticket" : ""}`}>
          <label className="label-status">Status:</label>
          <input
            className={`input-status ${
              editedStatus === "En proceso" ? "in-process" : ""
            }`}
            type="text"
            name="status"
            value={editedStatus}
            onChange={handleStatusChange}
            disabled={isTicketClosed}
          />
        </div>

        <div className="detail">
          <label className="label-comments">Comments:</label>
          <ul className="comments-list">
            {comments.map((comment, index) => (
              <li key={index} className={`comment ${comment.isAdmin ? "admin-comment" : ""}`}>
                {comment.text}
              </li>
            ))}
          </ul>
        </div>
        <div className="detail">
          <label className="label-image">Image:</label>
          <img
            className={`ticket-image ${isImageExpanded ? "expanded" : ""}`}
            src={ticket.image}
            alt="Ticket Image"
            onClick={handleImageClick}
          />
        </div>
        {isCommentEnabled && (
          <div className="detail">
            <label className="label-comment">Add Comment:</label>
            <textarea
              className="input-comment"
              rows="3"
              value={comment}
              onChange={handleCommentChange}
            ></textarea>
          </div>
        )}
      </div>
      <div>
        <button className="button-save" onClick={handleSaveChanges}>
          Save Changes
        </button>
        {!isTicketClosed && (
          <button className="button-close" onClick={handleCloseTicket}>
            Close Ticket
          </button>
        )}
      </div>
    </div>
  );
}

export default TicketsDetails;
