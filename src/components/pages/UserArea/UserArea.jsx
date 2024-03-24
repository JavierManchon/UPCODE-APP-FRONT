import React from 'react';
import './_userArea.scss';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';


const UserArea = () => {
  const { authState } = useAuth();

  const hasDesigns = authState.user.designs && authState.user.designs.length > 0;


  return (
    <>
      {!hasDesigns ? (
        <div className='container-areaVoid'>
          <div className="circulo">
            <h2>UPS!</h2>
            <h3>todavía no tienes diseños guardados</h3>
            <p>Crea tu primer diseño aquí:</p>
            <Link to="/catalogue" className="btn-catalogo">Catálogo</Link>
          </div>
        </div>
      ) : (
        authState.user.designs.map( (child, index) => (
          <div key={index} className="user-design-container">

          </div>
        ))
      )}
    </>
  );
};

export default UserArea;
