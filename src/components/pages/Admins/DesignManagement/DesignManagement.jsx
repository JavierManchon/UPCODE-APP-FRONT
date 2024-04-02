import React, { useState, useEffect } from "react";
import "./_designManagement.scss";
import { getDesigns, removeDesignReq } from "../../../../api/axios/designs";
import { getAllUsersReq } from "../../../../api/axios/auth";

function DesignManagement() {
  const [designs, setDesigns] = useState([]);
  const [filteredDesigns, setFilteredDesigns] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [userMap, setUserMap] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const designResponse = await getDesigns();
        const userResponse = await getAllUsersReq();

        const designsData = designResponse.data;
        const usersData = userResponse.data;

        setDesigns(designsData);
        setFilteredDesigns(designsData);
        setUsers(usersData);

        const mappedUsers = {};
        usersData.forEach(user => {
          mappedUsers[user._id] = user;
        });
        setUserMap(mappedUsers);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = designs.filter((design) => {
      const user = userMap[design.userId];
      const username = user ? user.username : "";
      const matchName = design.nameDesign.toLowerCase().includes(searchTerm.toLowerCase());
      const matchElementType = design.elementType.toLowerCase().includes(searchTerm.toLowerCase());
      const matchUsername = username.toLowerCase().includes(searchTerm.toLowerCase());

      return matchName || matchElementType || matchUsername;
    });

    setFilteredDesigns(filtered);
  }, [searchTerm, designs, userMap]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDeleteDesign = async (designId) => {
    try {
      await removeDesignReq(designId);
      const updatedDesigns = designs.filter((design) => design._id !== designId);
      setDesigns(updatedDesigns);
      setFilteredDesigns(updatedDesigns);
    } catch (error) {
      console.error("Error deleting design:", error);
    }
  };

  return (
    <div>
      <div className="container-title">
        <header className="title">
          <h2 className="aside-title">Gestión de diseños</h2>
          <input
            className="search"
            type="text"
            placeholder="Buscar diseños o usuarios..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </header>
        <aside className="aside-container">
          <table className="table">
            <thead className="table-head">
              <tr className="table-row">
                <th className="table-header">Nombre del diseño</th>
                <th className="table-header">Tipo de elemento</th>
                <th className="table-header">Template</th>
                <th className="table-header">Usuario asociado</th>
                <th className="table-header">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredDesigns.map((design) => (
                <tr key={design._id} className="table-row">
                  <td className="table-data">{design.nameDesign}</td>
                  <td className="table-data">{design.elementType}</td>
                  <td className="table-data">{design.template ? "Sí" : "No"}</td>
                  <td className="table-data">
                    {userMap[design.userId] ? userMap[design.userId].username : ""}
                  </td>
                  <td className="table-data">
                    <button onClick={() => handleDeleteDesign(design._id)}>Eliminar</button>
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

export default DesignManagement;
