import React, { useState } from "react";
import "./_userManagement.scss";
import { useNavigate } from "react-router-dom";
function UserManagement() {
  const [users, setUsers] = useState([
    {
      name: "User1",
      surname: "Surname1",
      username: "user1",
      password: "password1",
      email: "user1@example.com",
      image: "profile-image-1.jpg",
      isAdmin: true,
      isPremium: false,
      isBlocked: false,
      generalTickets: [
        {
          title: "Ticket 2 general",
          description: "Ticket 2 description general",
          status: "Enviado",
          comments: [1],
          
        },
      ],
      tickets: [
        {
          title: "Ticket 2 design",
          description: "Ticket 2 description design ",
          status: "Enviado",
          comments: [1],
        },
      ],
    },
    {
      name: "User2",
      surname: "Surname2",
      username: "user2",
      password: "password2",
      email: "user2@example.com",
      image: "profile-image-2.jpg",
      isAdmin: false,
      isPremium: true,
      isBlocked: false,
      generalTickets: [],
      tickets: [],
    },
    {
      name: "User3",
      surname: "Surname3",
      username: "user3",
      password: "password3",
      email: "user3@example.com",
      image: "profile-image-3.jpg",
      isAdmin: false,
      isPremium: false,
      isBlocked: false,
      generalTickets: [
        {
          title: "Ticket 3 general",
          description: "Ticket 3 description general",
          status: "Enviado",
          comments: [1],
        },
      ],
      tickets: [
        {
          title: "Ticket 3 design",
          description: "Ticket 3 description design ",
          status: "Enviado",
          comments: [1],
        },
      ],
    },
    {
      name: "User4",
      surname: "Surname4",
      username: "user4",
      password: "password4",
      email: "user4@example.com",
      image: "profile-image-4.jpg",
      isAdmin: false,
      isPremium: true,
      isBlocked: false,
      generalTickets: [],
      tickets: [],
    },
    {
      name: "User5",
      surname: "Surname5",
      username: "user5",
      password: "password5",
      email: "user5@example.com",
      image: "profile-image-5.jpg",
      isAdmin: false,
      isPremium: false,
      isBlocked: false,
      generalTickets: [
        {
          title: "Ticket 4 general",
          description: "Ticket 4 description general",
          status: "Enviado",
          comments: [1],
        },
      ],
      tickets: [
        {
          title: "Ticket 4 design",
          description: "Ticket 4 description design ",
          status: "Enviado",
          comments: [1],
        },
      ],
    },
    {
      name: "User6",
      surname: "Surname6",
      username: "user6",
      password: "password6",
      email: "user6@example.com",
      image: "profile-image-6.jpg",
      isAdmin: false,
      isPremium: true,
      isBlocked: false,
      generalTickets: [],
      tickets: [],
    },
    {
      name: "User7",
      surname: "Surname7",
      username: "user7",
      password: "password7",
      email: "user7@example.com",
      image: "profile-image-7.jpg",
      isAdmin: false,
      isPremium: false,
      isBlocked: false,
      generalTickets: [
        {
          title: "Ticket 5 general",
          description: "Ticket 5 description general",
          status: "Enviado",
          comments: [1],
        },
      ],
      tickets: [
        {
          title: "Ticket 5 design",
          description: "Ticket 5 description design ",
          status: "Enviado",
          comments: [1],
        },
      ],
    },
    {
      name: "User8",
      surname: "Surname8",
      username: "user8",
      password: "password8",
      email: "user8@example.com",
      image: "profile-image-8.jpg",
      isAdmin: false,
      isPremium: true,
      isBlocked: false,
      generalTickets: [],
      tickets: [],
    },
    {
      name: "User9",
      surname: "Surname9",
      username: "user9",
      password: "password9",
      email: "user9@example.com",
      image: "profile-image-9.jpg",
      isAdmin: false,
      isPremium: false,
      userId: "123456789",
      isBlocked: false,
      generalTickets: [],
      tickets: [],
    },
    {
      name: "User10",
      surname: "Surname10",
      username: "user10",
      password: "password10",
      email: "user10@example.com",
      image: "profile-image-10.jpg",
      isAdmin: false,
      isPremium: true,
      isBlocked: false,
      generalTickets: [],
      tickets: [],
    },
    {
      name: "User11",
      surname: "Surname11",
      username: "user11",
      password: "password11",
      email: "user11@example.com",
      image: "profile-image-11.jpg",
      isAdmin: false,
      isPremium: false,
      isBlocked: false,
      generalTickets: [],
      tickets: [],
    },

    {
      name: "User12",
      surname: "Surname12",
      username: "user12",
      password: "password12",
      email: "user12@example.com",
      image: "profile-image-12.jpg",
      isAdmin: false,
      isPremium: true,
      isBlocked: false,
      generalTickets: [],
      tickets: [],
    },

    {
      name: "User13",
      surname: "Surname13",
      username: "user13",
      password: "password13",
      email: "user13@example.com",
      image: "profile-image-13.jpg",
      isAdmin: false,
      isPremium: false,
      isBlocked: true,
      generalTickets: [],
      tickets: [],
    },

    {
      name: "User14",
      surname: "Surname14",
      username: "user14",
      password: "password14",
      email: "user14@example.com",
      image: "profile-image-14.jpg",
      isAdmin: false,
      isPremium: true,
      isBlocked: false,
      generalTickets: [],
      tickets: [],
    },

    {
      name: "User15",
      surname: "Surname15",
      username: "user15",
      password: "password15",
      email: "user15@example.com",
      image: "profile-image-15.jpg",
      isAdmin: false,
      isPremium: false,
      isBlocked: false,
      generalTickets: [],
      tickets: [],
    },

    {
      name: "User16",
      surname: "Surname16",
      username: "user16",
      password: "password16",
      email: "user16@example.com",
      image: "profile-image-16.jpg",
      isAdmin: false,
      isPremium: true,
      isBlocked: true,
      generalTickets: [
        {
          title: "Ticket 1 general",
          description: "Ticket 1 description general",
          status: "Enviado",
          comments: [1],
        },
      ],
      tickets: [
        {
          title: "Ticket 1 design",
          description: "Ticket 1 description design ",
          status: " Enviado",
          comments: [1],
        },
      ],
    },

    {
      name: "User17",
      surname: "Surname17",
      username: "user17",
      password: "password17",
      email: "user17@example.com",
      image: "profile-image-17.jpg",
      isAdmin: false,
      isPremium: false,
      generalTickets: [],
      isBlocked: false,
      tickets: [],
    },

    {
      name: "User18",
      surname: "Surname18",
      username: "user18",
      password: "password18",
      email: "user18@example.com",
      image: "profile-image-18.jpg",
      isAdmin: false,
      isPremium: true,
      isBlocked: false,
      generalTickets: [],
      tickets: [],
    },

    {
      name: "User19",
      surname: "Surname19",
      username: "user19",
      password: "password19",
      email: "user19@example.com",
      image: "profile-image-19.jpg",
      isAdmin: false,
      isPremium: false,
      isBlocked: true,
      generalTickets: [],
      tickets: [],
    },

    {
      name: "User20",
      surname: "Surname20",
      username: "user20",
      password: "password20",
      email: "user20@example.com",
      image: "profile-image-20.jpg",
      isAdmin: false,
      isPremium: true,
      isBlocked: false,
      generalTickets: [],
      tickets: [],
    },
  ]);
  const [searchUsers, setSearchUsers] = useState("");
  const navigate = useNavigate();
  const handleBlockUser = (username) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => {
        if (user.username === username) {
          return { ...user, isBlocked: true };
        }
        return user;
      })
    );
  };

  const redirectToTicketPage = (username) => {
    // Pendiente: debería ser con el ID del usuario en lugar del nombre de usuario cuando se conecte con la base de datos
    navigate(`/admin/tickets_management/${username}`, { state: { origin: 'userManagement' } });
  }; 
  

  const handleUnblockUser = (username) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => {
        if (user.username === username) {
          return { ...user, isBlocked: false };
        }
        return user;
      })
    );
  };

  const handleDeleteUser = (username) => {
    setUsers((prevUsers) =>
      prevUsers.filter((user) => user.username !== username)
    );
  };

  const handleSearchChange = (e) => {
    setSearchUsers(e.target.value);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchUsers.toLowerCase()) ||
      user.surname.toLowerCase().includes(searchUsers.toLowerCase()) ||
      user.username.toLowerCase().includes(searchUsers.toLowerCase()) ||
      user.email.toLowerCase().includes(searchUsers.toLowerCase())
  );
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
                <th className="table-header">Bloquear</th>
                <th className="table-header">Eliminar</th>
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
                    {user.isBlocked ? (
                      <button onClick={() => handleUnblockUser(user.username)}>
                        Desbloquear
                      </button>
                    ) : (
                      <button onClick={() => handleBlockUser(user.username)}>
                        Bloquear
                      </button>
                    )}
                  </td>
                  <td className="table-data">
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteUser(user.username)}
                    >
                      Eliminar
                    </button>
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
