import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InfoTicketArea from "../../layout/InfoTicketArea/InfoTicketArea";
import Profile from "../../pages/Profile/Profile";
import './_userArea.scss';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { removeDesignReq } from '../../../api/axios/designs';
import { getOneUserReq } from '../../../api/axios/auth';
import MyAreaMobile from './NavMobile/MyAreaMobile';
import Loading from '../../utils/Loading/Loading';

const UserArea = () => {
  const { authState, setAuthState, patchUser } = useAuth();
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (authState.user && authState.user._id) {
        try {
          const response = await getOneUserReq(authState.user._id);
          if (response && response.data) {
            setTimeout(() => {
              setDesigns(response.data.designs || []);
              setLoading(false); 
            }, 1500); 
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
      
      const updatedDesigns = designs.filter(design => design._id !== designId);
      setDesigns(updatedDesigns);
      
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

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handlePremiumToggle = async () => {
    if (authState.user.isPremium) {
      try {
        await patchUser(authState.user._id, { isPremium: false });
        alert("Tu suscripción premium ha sido cancelada.");
      } catch (error) {
        console.error("Error al cancelar la suscripción premium:", error);
      }
    } else {
      navigate("/payments");
    }
  };

  return (
    <>
      {windowWidth > 1023 ? (
        <section className='my-area'>
          <aside className='container-aside-mydesigns'>
            <Profile />
            <button onClick={handlePremiumToggle} className="premium-toggle-btn">
              {authState.user.isPremium ? "Cancelar Premium" : "Hazte Premium"}
            </button>
            <InfoTicketArea />
          </aside>
          {loading ? (
            <div className='container-mydesigns'>
            <Loading/>
            </div>
          ) : !designs.length ? ( 
            <div className='container-mydesigns'>
              <div className="designs-area">
                <h2 className='h2-designs-area'>UPS!</h2>
                <h3 className='h3-designs-area'>Todavía no tienes diseños guardados</h3>
                <p className='p-designs-area'>Crea tu primer diseño aquí:</p>
                <Link to="/catalogue" className="btn-catalogo">Ir al Catálogo</Link>
              </div>
            </div>
          ) : (
            <div className='container-mydesigns'>
              {designs.slice().reverse().map((design, index) => (
                design.template === false ? (
                  <div key={`my-design-${index}`} className={`design ${design.elementType}`}>
                  <Link key={index} to={`/catalogue/template-${design.elementType}s/${design._id}`} state={{ templateData: design }}>
                    <div className={`identifier ${design.elementType}`}></div>
                    <div className={`visualizer ${design.elementType}`}>
                      {design.elementType === "section" && (
                        <div
                          className={design.defaultStyles[0]}
                          style={{ backgroundColor: `${design.edit.bgColorSection}` }}
                        >
                          {Array.from({ length: design.defaultContent.countChildren }).map(
                            (_, index) => (
                              <div
                                className={design.defaultStyles[1]}
                                style={{ backgroundColor: `${design.edit.bgColorArticle}` }}
                                key={index}
                              >
                                <h2
                                  className={design.defaultStyles[2]}
                                  style={{
                                    color: `${design.edit.colorTitle}`,
                                    fontSize: `${design.edit.fontSizeTitle}`,
                                    fontWeight: `${design.edit.fontWeightTitle}`,
                                    textDecoration: `${design.edit.textDecorationTitle}`,
                                  }}
                                >
                                  {design.edit.textArray[index]}
                                </h2>
                                <p
                                  className={design.defaultStyles[3]}
                                  style={{
                                    color: `${design.edit.colorItem}`,
                                    fontSize: `${design.edit.fontSizeItem}`,
                                    fontWeight: `${design.edit.fontWeightItem}`,
                                    textDecoration: `${design.edit.textDecorationText}`,
                                  }}
                                  key={`${index}-${index}`}
                                >
                                  {design.edit.textArray2[index]}
                                </p>
                              </div>
                            )
                          )}
                        </div>
                      )}
                      {/*se quita el componente button porque da fallo de seguridad*/}
                      {/* {design.elementType === "button" && (
                        <button
                          type={design.defaultContent.tagInfo}
                          className={design.defaultStyles[0]}
                          style={{
                            backgroundColor: design.edit.bgColorButton,
                            color: design.edit.colorText,
                            fontSize: design.edit.fontSizeText,
                            fontWeight: design.edit.fontWeightText,
                            borderRadius: design.edit.borderRadius,
                            border: design.edit.border,
                            outline: design.edit.outline
                          }}
                        >
                          {design.edit.text}
                        </button>
                      )} */}
                      {design.elementType === "div" && (
                        <div className={design.defaultStyles[0]} style={{ backgroundColor: `${design.edit.bgColorDiv}` }}>
                          {Array.from({ length: design.defaultContent.countChildren }).map((_, index) => (
                            <p className={design.defaultStyles[1]} key={index} style={{ color: `${design.edit.colorText}`, fontSize: `${design.edit.fontSizeText}`, fontWeight: `${design.edit.fontWeightText}` }}>{design.edit.textArray[index]}</p>
                          ))}
                        </div>
                      )}
                      {design.elementType === "figure" && (
                        <figure className={design.defaultStyles[0]}>
                          <img
                            src={design.edit.textItem}
                            className={design.defaultStyles[1]}
                            alt="Imagen de la preview de figure"
                          />
                          <figcaption
                            className={design.defaultStyles[2]}
                            style={{
                              color: `${design.edit.colorText}`,
                              fontSize: `${design.edit.fontSizeText}`,
                              fontWeight: `${design.edit.fontWeightText}`,
                              textDecoration: `${design.edit.textDecorationText}`,
                            }}
                          >
                            {design.edit.text}
                          </figcaption>
                        </figure>
                      )}

                      {design.elementType === "footer" && (
                        <div
                          className={design.defaultStyles[0]}
                          style={{ backgroundColor: design.edit.bgColorFooter }}
                        >
                          <ul className={design.defaultStyles[1]}>
                            {design.edit.textArray.map((value, index) => (
                              <li
                                className={design.defaultStyles[2]}
                                key={index}
                                style={{
                                  color: design.edit.colorText,
                                  fontSize: design.edit.fontSizeText,
                                  fontWeight: design.edit.fontWeightText,
                                  textDecoration: design.edit.textDecorationText
                                }}
                              >
                                {value}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {design.elementType === "form" && (
                        <form className={design.defaultStyles[0]} style={{ backgroundColor: design.edit.bgColorForm }}>
                          {Array.from({ length: design.defaultContent.countChildren }).map((_, index) => (
                            <React.Fragment key={`renderized_${index}`}>
                              <span className='span' style={{color: design.edit.colorTitle}}>{`Bloque  ${index + 1}:`}</span>
                              <div key={`child_${index}`} className='form-div'>
                                {Array.from({ length: design.defaultContent.countGrandson }).map((_, i) => (
                                  <React.Fragment key={`visual_${index}_${i}`}>
                                    <label className={design.defaultStyles[1]} htmlFor={`id${index}_${i}`} style={{
                                      color: design.edit.colorText,
                                      fontSize: design.edit.fontSizeText,
                                      fontWeight: design.edit.fontWeightText,
                                      textDecoration: design.edit.textDecorationText
                                    }}>{design.edit.textArrayBidimensional[index][i]}</label>
                                    <input className={design.defaultStyles[2]} key={`visual_input_${index}_${i}`} id={`id${index}_${i}`} name={`id${index}_${i}`} type={design.defaultContent.tagInfo} />
                                  </React.Fragment>
                                ))}
                              </div>
                            </React.Fragment>
                          ))}
                          <button className={design.defaultStyles[3]} style={{
                            backgroundColor: design.edit.bgColorButton,
                            fontSize: design.edit.fontSizeItem,
                            color: design.edit.colorItem,
                            fontWeight: design.edit.fontWeightItem,
                            borderRadius: `${design.edit.borderRadius}px`
                          }}>{design.edit.textItem}</button>
                        </form>
                      )}
                      {design.elementType === "nav" && (
                        <nav className={design.defaultStyles[0]} style={{ backgroundColor: `${design.edit.bgColorNav}` }}>
                          <ul className={design.defaultStyles[1]}>
                            {design.edit.textArray.map((value, index) => (
                              <li className={design.defaultStyles[2]} key={index} style={{ color: `${design.edit.colorText}`, fontSize: `${design.edit.fontSizeText}`, fontWeight: `${design.edit.fontWeightText}`, textDecoration: `${design.edit.textDecorationText}` }}>{value}</li>
                            ))}
                          </ul>
                        </nav>
                      )}
                    </div>
                    <h3>{design.nameDesign.charAt(0).toUpperCase() + design.nameDesign.slice(1)}</h3>
                  </Link>
                    <button className='deleteButton' onClick={() => handleDeleteDesign(design._id)} style={{ marginTop: '10px' }}>x</button>
                  </div>
                ) : null
              ))}
            </div>
          )}
        </section>
      ) : (
        <section className='my-area-mobile'>
          <Profile />
          <MyAreaMobile />
        </section>
      )}
    </>
  );
};

export default UserArea;
