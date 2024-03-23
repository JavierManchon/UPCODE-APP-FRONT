import React, { useState } from 'react';
import './_designManagement.scss';
import { useNavigate } from 'react-router-dom';

function DesignManagement() {
  const navigate = useNavigate();
  const [designs, setDesigns] = useState([
    {
      nameDesign: "Design 1",
      elementType: "Element 1",
      template: true,
      defaultContent: {
        children: [],
        grandSon: [],
        countChildren: 0,
        countGrandson: 0
      },
      defaultStyles: ["Style 1", "Style 2"],
      userId: 123456789,
      designId: 123456789,
      tickets: []
    },
    
    {
      nameDesign: "Design 2",
      elementType: "Element 2",
      template: false,
      defaultContent: {
        children: [],
        grandSon: [],
        countChildren: 0,
        countGrandson: 0
      },
      defaultStyles: ["Style 3", "Style 4"],
      userId: 987654321,
      designId: 987654321,
      tickets: []
    },
    {
      nameDesign: "Design 3",
      elementType: "Element 3",
      template: true,
      defaultContent: {
        children: [],
        grandSon: [],
        countChildren: 0,
        countGrandson: 0
      },
      defaultStyles: ["Style 5", "Style 6"],
      userId: 456789123,
      designId: 456789123,
      tickets: []
    },
    {
      nameDesign: "Design 4",
      elementType: "Element 4",
      template: false,
      defaultContent: {
        children: [],
        grandSon: [],
        countChildren: 0,
        countGrandson: 0
      },
      defaultStyles: ["Style 7", "Style 8"],
      userId: 321654987,
      designId: 321654987,
      tickets: []
    },
    {
      nameDesign: "Design 5",
      elementType: "Element 5",
      template: true,
      defaultContent: {
        children: [],
        grandSon: [],
        countChildren: 0,
        countGrandson: 0
      },
      defaultStyles: ["Style 9", "Style 10"],
      userId: 789123456,
      designId: 789123456,
      tickets: []
    },
    {
      nameDesign: "Design 6",
      elementType: "Element 6",
      template: true,
      defaultContent: {
        children: [],
        grandSon: [],
        countChildren: 0,
        countGrandson: 0
      },
      defaultStyles: ["Style 11", "Style 12"],
      userId: 654987321,
      designId: 654987321,
      tickets: [
        {
          title: "Ticket 4 design",
          description: "Ticket 4 description design ",
          status: "",
          comments: [1],
        },
      ]
    },
    {
      nameDesign: "Design 7",
      elementType: "Element 7",
      template: false,
      defaultContent: {
        children: [],
        grandSon: [],
        countChildren: 0,
        countGrandson: 0
      },
      defaultStyles: ["Style 13", "Style 14"],
      userId: 987321654,
      designId: 987321654,
      tickets: []
    },
    {
      nameDesign: "Design 8",
      elementType: "Element 8",
      template: true,
      defaultContent: {
        children: [],
        grandSon: [],
        countChildren: 0,
        countGrandson: 0
      },
      defaultStyles: ["Style 15", "Style 16"],
      userId: 321789654,
      designId: 321789654,
      tickets: [
        {
          title: "Ticket 3 design",
          description: "Ticket 3 description design ",
          status: "open",
          comments: [1],
        },
      ]
    },
    {
      nameDesign: "Design 9",
      elementType: "Element 9",
      template: false,
      defaultContent: {
        children: [],
        grandSon: [],
        countChildren: 0,
        countGrandson: 0
      },
      defaultStyles: ["Style 17", "Style 18"],
      userId: 789654321,
      designId: 789654321,
      tickets: []
    },
    {
      nameDesign: "Design 10",
      elementType: "Element 10",
      template: true,
      defaultContent: {
        children: [],
        grandSon: [],
        countChildren: 0,
        countGrandson: 0
      },
      defaultStyles: ["Style 19", "Style 20"],
      userId: 987654123,
      designId: 987654123,
      tickets: [
        {
          title: "Ticket 2 design",
          description: "Ticket 2 description design ",
          status: "",
          comments: [1],
        },
      ]
    },
  ]);

  const [searchDesigns, setSearchDesigns] = useState('');

  const handleDeleteDesign = (designName) => {
    setDesigns(prevDesigns => prevDesigns.filter(design => design.nameDesign !== designName));
  };
  const handleSearchChange = (e) => {
    setSearchDesigns(e.target.value);
  };

  const filteredDesigns = designs.filter(
    (design) =>
      design.nameDesign.toLowerCase().includes(searchDesigns.toLowerCase()) ||
      design.elementType.toLowerCase().includes(searchDesigns.toLowerCase()) ||
      design.userId.toString().includes(searchDesigns.toLowerCase())
  );

  const redirectToTicketPage = (nameDesign) => {
    // Pendiente: debería ser con el ID del usuario en lugar del nombre de usuario cuando se conecte con la base de datos
    navigate(`/admin/tickets_management/${nameDesign}`, { state: { origin: 'designManagement' } });
  }; 
  
  return (
    <div>
      <div className='container-title'>
        <header className='title'>
          <h2 className='aside-title'>Gestión de diseños</h2>
          <input
            className='search'
            type="text"
            placeholder="Buscar diseños..."
            value={searchDesigns}
            onChange={handleSearchChange}
          />
        </header>
        <aside className="aside-container">
          <table className="table">
            <thead className="table-head">
              <tr className="table-row">
                <th className="table-header">Nombre de Diseño</th>
                <th className="table-header">Elemento</th>
                <th className="table-header">Id de Usuario</th>
                <th className="table-header">Eliminar</th>
                <th className="table-header">Tickets</th>
              </tr>
            </thead>
            <tbody>
              {filteredDesigns.map(design => (
                <tr key={design.nameDesign} className="table-row">
                  <td className="table-data">{design.nameDesign}</td>
                  <td className="table-data">{design.elementType}</td>
                  <td className="table-data">{design.userId}</td>
                  <td className="table-data">
                    <button className="delete-button" onClick={() => handleDeleteDesign(design.nameDesign)}>Eliminar</button>
                  </td>
                  <td className="table-data">
                    {design.tickets.length > 0 
                    ? (
                      <button
                        className="ticket-btn"
                        onClick={() => redirectToTicketPage(design.nameDesign)}
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

export default DesignManagement;
