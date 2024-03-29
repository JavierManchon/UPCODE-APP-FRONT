import { useEffect, useState } from 'react';
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
  const [designs, setDesigns] = useState([]);
  console.log(!authState.user.designs ? authState.user.designs : null);
  const handleTickets = () => {
    setShowTickets(true);
    setShowDesigns(false);
  }

  const handleDesigns = () => {
    setShowTickets(false);
    setShowDesigns(true);
  }

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
      // Paso 1: Eliminar el diseño mediante la API
      await removeDesignReq(designId);
  
      // Paso 2: Actualizar el estado local filtrando el diseño eliminado
      const updatedDesigns = designs.filter(design => design._id !== designId);
      setDesigns(updatedDesigns);
  
      // Paso 3: Actualizar el estado global
      // Obtener la información actualizada del usuario para reflejar la eliminación en el estado global
      const response = await getOneUserReq(authState.user._id);
      const updatedUser = { ...authState.user, designs: response.data.designs };
  
      setAuthState(prevState => ({
        ...prevState,
        user: updatedUser,
      }));
  
      // Paso 4: Sincronizar con sessionStorage para que los cambios persistan entre recargas de la página
      sessionStorage.setItem('user', JSON.stringify(updatedUser));
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
            {designs.map((template, index) => (
            template.template === false ?
            <>
            <div className='container-link'>
              <Link key={index} to={`/catalogue/template-${template.elementType}s/${template._id}`} state={{ templateData:  template }} className={`template ${template.elementType}`}>
                  <div className='line-top'></div>
                  <h4>{template.nameDesign}</h4>
                  <p>{'<'}{template.elementType}{'>'}</p>  
              </Link>
              <button onClick={() => handleDeleteDesign(template._id)}>Eliminar</button>
            </div>
            </>
            : null
            ))}
          </div>
        )
      : null
      }
    </>
  )
}

export default NavMobile
