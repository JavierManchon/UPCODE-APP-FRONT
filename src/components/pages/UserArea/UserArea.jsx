import React from 'react';
import './_userArea.scss';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const UserArea = ({ children }) => {
  const content = React.Children.count(children) > 0;{/*/esta const se tiene que sustituir por el contenido que llege de base de datos/ */}
  const { authState, patchUser } = useAuth();
  console.log(authState);

  return (
    <>
      {!content ? (
        <div className='container-areaVoid'>
          <div className="circulo">
            <h2>UPS!</h2>
            <h3>todavía no tienes diseños guardados</h3>
            <p>Crea tu primer diseño aquí:</p>
            <Link to="/catalogue" className="btn-catalogo">Catálogo</Link>
          </div>
        </div>
      ) : 
      
      {children}}
      
    </>
  );
};

export default UserArea;
