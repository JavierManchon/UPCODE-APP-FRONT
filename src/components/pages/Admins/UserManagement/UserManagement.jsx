import React, { useState, useEffect } from "react";
import "./_userManagement.scss";
import { getAllUsersReq, deleteUserReq } from "../../../../api/axios/auth";
import { useAuth } from "../../../context/AuthContext";
import { Link } from "react-router-dom";

function UserManagement() {

  const { getAllUsers } = useAuth();

  const [usersState, setUsersState] = useState([]);
  const [searchUsers, setSearchUsers] = useState("");


  useEffect(() => {
    async function fetchData() {
      try {
        const users = await getAllUsers();
        const nonAdminUsers = users.filter(user => !user.isAdmin);
        setUsersState(nonAdminUsers);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    }
    fetchData();
  }, [getAllUsers]);

  const handleSearchChange = (e) => {
    setSearchUsers(e.target.value);
  };

  const handleDeleteUser = async (userId) => {
    const isConfirmed = window.confirm("¿Estás seguro de que quieres borrar al usuario?");

    if(isConfirmed){
    try {
      await deleteUserReq(userId);
      const response = await getAllUsersReq();
      const users = response.data;
      setUsersState(users);
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  }
};

  const filteredUsers = usersState.filter((user) => {
    const searchTerm = searchUsers.toLowerCase();
    return (
      user.name.toLowerCase().includes(searchTerm) ||
      user.surname.toLowerCase().includes(searchTerm) ||
      user.username.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm) ||
      user._id.toLowerCase().includes(searchTerm)
    );
  });

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
                <th className="table-header">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id} className="table-row">
                  <td className="table-data">
                    {user.name} {user.surname}
                  </td>
                  <td className="table-data">{user.username}</td>
                  <td className="table-data">{user.email}</td>
                  <td className="table-data">
                    {user.isPremium ? "true" : "false"}
                  </td>
                  <td className="table-data">
                    {user.tickets && user.tickets.length > 0 ? (
                      <Link to={`/adminticketsManagement/${user._id}`}>
                        <button className="ticket-btn">Go to tickets</button>
                      </Link>
                    ) : (
                      <p className="no-tickets">No hay tickets</p>
                    )}
                  </td>

                  <td className="table-data">
                    <button onClick={() => handleDeleteUser(user._id)}>
                      Borrar
                    </button>
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
