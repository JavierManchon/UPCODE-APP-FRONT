import React from 'react';
import './_ticketsManagement.scss';

function TicketsManagement(props) {
  const origin = props.location.state ? props.location.state.origin : null;
  
  // Dependiendo del valor de la prop 'origin', decides qué tickets renderizar
  const renderTickets = () => {
    if (origin === 'userManagement') {
      return (
        <div>
          <h2>Tickets Generales</h2>
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Descripción</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {props.user.generalTickets.map((ticket, index) => (
                <tr key={index}>
                  <td>{ticket.title}</td>
                  <td>{ticket.description}</td>
                  <td>{ticket.status}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2>Tickets de Diseño</h2>
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Descripción</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {props.user.tickets.map((ticket, index) => (
                <tr key={index}>
                  <td>{ticket.title}</td>
                  <td>{ticket.description}</td>
                  <td>{ticket.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else if (origin === 'designManagement') {
      return (
        <div>
          <h2>Tickets de Diseño</h2>
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Descripción</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {props.user.tickets.map((ticket, index) => (
                <tr key={index}>
                  <td>{ticket.title}</td>
                  <td>{ticket.description}</td>
                  <td>{ticket.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else {
      return <div>No se proporcionó un origen válido para los tickets.</div>;
    }
  };

  return <div>{renderTickets()}</div>;
}

export default TicketsManagement;
