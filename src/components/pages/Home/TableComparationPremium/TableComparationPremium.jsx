import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import './_tableComparationPremium.scss';

const TableComparationPremium = ({isLogged}) => {

  const caracteristicas = [
    { id: 1, feature: 'Contenido premium', free: false, paid: true },
    { id: 2, feature: 'Consultas prioritarias', free: false, paid: true },
    { id: 3, feature: 'Guarda tus diseños', free: false, paid: true },
    { id: 4, feature: 'Diseños ilimitados', free: false, paid: true },
    { id: 5, feature: 'Personalizar diseños', free: true, paid: true },
    { id: 6, feature: 'Importar código', free: true, paid: true },
  ];

  return (
    <>
    <div className='container-table'>
          <h2 className='home-title'>¿Conoces nuestro servicio Premium?</h2>
      <table className="comparison-table">
        <thead>
          <tr className='thead'>
            <th>Característica</th>
            <th>Free</th>
            <th>Premium</th>
          </tr>
        </thead>
        <tbody>
          {caracteristicas.map((caracteristica) => (
            <tr className={`tbody`} key={caracteristica.id}>
              <td>{caracteristica.feature}</td>
              <td className={caracteristica.free ? 'check' : 'cross'}>{caracteristica.free ? '✓' : 'X'}</td>
              <td className={caracteristica.paid ? 'check' : 'cross'}>{caracteristica.paid ? '✓' : 'X'}</td>
            </tr>
          ))}
        </tbody>
      </table>
        <Link to={isLogged ? '/payments' : '/register'} className="suscribe-button">
          {isLogged ? 'Hazte Premium' : 'Regístrate Aquí'}
        </Link>
    </div>
    </>
  );
};

export default TableComparationPremium;
