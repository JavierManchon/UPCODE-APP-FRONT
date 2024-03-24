import React, { useState, useEffect } from "react";
import "./_userManagement.scss";
import { getAllUsersReq } from "../../../../api/axios/auth";

function UserManagement() {
  const [usersState, setUsersState] = useState([]);
  const [searchUsers, setSearchUsers] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const users = await getAllUsersReq();
        console.log("Usuarios obtenidos:", users);
        setUsersState(users);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    }
    fetchData();
  }, []);

  const handleSearchChange = (e) => {
    setSearchUsers(e.target.value);
  };

  // Verificación para asegurarse de que usersState es un array antes de aplicar el filtro
  const filteredUsers = Array.isArray(usersState) ? usersState.filter(
    (user) =>
      user.name.toLowerCase().includes(searchUsers.toLowerCase()) ||
      user.surname.toLowerCase().includes(searchUsers.toLowerCase()) ||
      user.username.toLowerCase().includes(searchUsers.toLowerCase()) ||
      user.email.toLowerCase().includes(searchUsers.toLowerCase())
  ) : [];

  console.log("Usuarios filtrados:", filteredUsers);

  return (
    <div>
      <div className="container-title">
        <header className="title">
          <h2 className="aside-title">Gestión de usuarios</h2>
          <input
            className="search"
            type="text"
            placeholder="Buscar usuarios..."
            value={searchUsers}
            onChange={handleSearchChange}
          />
        </header>
        <aside className="aside-container">
          <table className="table">
            <thead className="table-head">
              <tr className="table-row">
                <th className="table-header">Nombre y Apellidos</th>
                <th className="table-header">Nombre de usuario</th>
                <th className="table-header">Email</th>
                <th className="table-header">Premium</th>
                <th className="table-header">Tickets</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.username} className="table-row">
                  <td className="table-data">
                    {user.name} {user.surname}
                  </td>
                  <td className="table-data">{user.username}</td>
                  <td className="table-data">{user.email}</td>
                  <td className="table-data">
                    {user.isPremium ? "true" : "false"}
                  </td>
                  <td className="table-data">
                    {user.tickets.length > 0 ||
                    user.generalTickets.length > 0 ? (
                      <button
                        className="ticket-btn"
                        onClick={() => redirectToTicketPage(user.username)}
                      >
                        Go to tickets
                      </button>
                    ) : (
                      <p className="no-tickets">No hay tickets</p>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </aside>
      </div>
    </div>
  );
}

export default UserManagement;
