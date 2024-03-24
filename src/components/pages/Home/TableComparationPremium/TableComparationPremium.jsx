import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import './_tableComparationPremium.scss';

const TableComparationPremium = ({isLogged}) => {

  const navigate = useNavigate();



  const caracteristicas = [
    { id: 1, feature: 'Contenido premium', free: false, paid: true },
    { id: 2, feature: 'Soporte técnico 24/7', free: true, paid: true },
    { id: 3, feature: 'Acceso a tutoriales', free: true, paid: true },
    { id: 4, feature: 'Diseños ilimitados', free: true, paid: true },
  ];

  return (
    <>
          <h2 className='home-title'>Bienvenido a Nuestro Servicio</h2>
      <p className='home-text'>Compara las características de nuestras suscripciones y elige la que mejor se adapte a tus necesidades.</p>
      <table className="comparison-table">

          <tr className='thead'>
            <th>Característica</th>
            <th>Free</th>
            <th>Premium</th>
          </tr>


          {caracteristicas.map((caracteristica) => (
            <tr className={`tbody`} key={caracteristica.id}>
              <td>{caracteristica.feature}</td>
              <td className={caracteristica.free ? 'check' : 'cross'}>{caracteristica.free ? '✓' : 'X'}</td>
              <td className={caracteristica.paid ? 'check' : 'cross'}>{caracteristica.paid ? '✓' : 'X'}</td>
            </tr>
          ))}




      </table>
                  <Link to={isLogged ? '/payments' : '/register'} className="suscribe-button">
                    {isLogged ? 'Hazte Premium' : 'Regístrate Aquí'}
                  </Link>
    </>
  );
};

export default TableComparationPremium;
