import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import './_tableComparationPremium.scss';
import { useAuth } from '../../../context/AuthContext';
import gsap from 'gsap';

const TableComparationPremium = () => {
  const {isPremium, isLogged} = useAuth();
  const caracteristicas = [
    { id: 1, feature: 'Guarda tus diseños', free: false, paid: true },
    { id: 2, feature: 'Consultas prioritarias', free: false, paid: true },
    { id: 3, feature: 'Diseños de comunidad', free: false, paid: true },
    { id: 4, feature: 'Personalizar diseños', free: true, paid: true },
    { id: 5, feature: 'Importar código', free: true, paid: true },
  ];

  const animatedHomeRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      animatedHomeRef.current,
      { y: 200, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 1.2 }
    );
  }, []);

  return (
    <>
    <div className='container-table' ref={animatedHomeRef}>
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
      {isPremium 
        ? <Link to={isLogged ? '/payments' : '/register'} className="suscribe-button">
          {isLogged ? 'Hazte Premium' : 'Regístrate Aquí'}
          </Link>
        : null
      }
        
    </div>
    </>
  );
};

export default TableComparationPremium;
