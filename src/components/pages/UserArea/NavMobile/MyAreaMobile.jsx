import React, { useEffect, useState } from 'react';
import './_myAreaMobile.scss';
import InfoTicketArea from '../../../layout/InfoTicketArea/InfoTicketArea';
import { useAuth } from '../../../context/AuthContext';
import { Link } from 'react-router-dom';
import { removeDesignReq } from '../../../../api/axios/designs';
import { getOneUserReq } from '../../../../api/axios/auth';

const NavMobile = () => {
  const [showTickets, setShowTickets] = useState(false);
  const [showDesigns, setShowDesigns] = useState(true);
  const { authState, setAuthState } = useAuth();
  console.log(authState.user.designs);

  const handleTickets = () => {
    setShowTickets(true);
    setShowDesigns(false);
  }

  const handleDesigns = () => {
    setShowTickets(false);
    setShowDesigns(true);
  }

  const [designs, setDesigns] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      if (authState.user && authState.user._id) {
        try {
          const response = await getOneUserReq(authState.user._id);
          if (response && response.data) {
            setDesigns(response.data.designs || []);
          }
        } catch (error) {
          console.error("Error fetching designs:", error);
        }
      }
    };

    fetchData();
  }, [authState.user]);

  const handleDeleteDesign = async (designId) => {
    try {
      await removeDesignReq(designId);
      
      // Actualiza el estado con los diseños restantes
      const updatedDesigns = designs.filter(design => design._id !== designId);
      setDesigns(updatedDesigns);
      
      // Opcionalmente, actualiza el usuario en el estado global si es necesario
      // Este paso es opcional y depende de cómo desees manejar el estado global
      const response = await getOneUserReq(authState.user._id);
      setAuthState(prevState => ({
        ...prevState,
        user: {
          ...prevState.user,
          designs: response.data.designs,
        },
      }));
    } catch (error) {
      console.error('Error deleting:', error);
    }
  };

  return (
    <>
      <Link className='premium-link' to="/payments">Hazte Premium</Link>
      <nav className='nav-my-area'>
        <ul>
          <li onClick={handleTickets}>Tickets</li>
          <li onClick={handleDesigns}>Diseños</li>
        </ul>
      </nav>
      {showTickets ? <InfoTicketArea/> : null}
      {showDesigns 
      ? (
          <div className='container-designs-my-area-mobile'>
            {authState.user.designs.map((template, index) => (
            <Link key={index} to={`/catalogue/template-${template.elementType}s/${template._id}`} state={{ templateData: template }} className={`template ${template.elementType}`}>
                <div className='line-top'></div>
                <h4>{template.nameDesign}</h4>
                <p>{'<'}{template.elementType}{'>'}</p>
                <button onClick={() => handleDeleteDesign(template._id)}>Eliminar</button>
            </Link>
            ))}
          </div>
        )
      : null
      }
    </>
  )
}

export default NavMobile
