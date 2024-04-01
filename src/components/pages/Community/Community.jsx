import React, { useEffect, useState } from 'react';
import './_community.scss';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { likesSystemReq, getDesigns, getDesignById } from '../../../api/axios/designs';
import Loading from '../../utils/Loading/Loading';
import Liked from '../../../images/liked.png';
import Unliked from '../../../images/unliked.png';

const Community = () => {
  const { authState } = useAuth();
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDesigns();
        if (response && response.data) {
          setTimeout(() => {
            const sortedDesigns = response.data.sort((a, b) => b.likes.length - a.likes.length);
            setDesigns(sortedDesigns);
            setLoading(false); 
          }, 1500); 
        }
      } catch (error) {
        console.error("Error fetching designs:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDesigns();
        if (response && response.data) {
          const sortedDesigns = response.data.sort((a, b) => b.likes.length - a.likes.length);
          setDesigns(sortedDesigns);
        }
      } catch (error) {
        console.error("Error fetching designs:", error);
      }
    };

    fetchData();
  }, [designs]);

  const handleLike = async (designId, userId) => {
    try {
      const response = await likesSystemReq(designId, userId);

      if (response) {
        const updatedDesignResponse = await getDesignById(designId);
        
        if (updatedDesignResponse && updatedDesignResponse.data) {
          const updatedDesign = updatedDesignResponse.data;

          setDesigns(prevDesigns => {
            return prevDesigns.map(design => {
              if (design._id === designId) {
                return {
                  ...design,
                  likes: updatedDesign.likes
                };
              }
              return design;
            });
          });
        }
      }
    } catch (error) {
      console.error("Error handling like:", error);
    }
  };
  



  return (
    <>
        <section className='my-area'>
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
              {designs.map((design, index) => (
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
                    <div key={`my-likes-${index}`} className='likes-section' onClick={() => handleLike(design._id, authState.user._id)}>
                        <span className='likesNum'>{design.likes.length}</span>
                        {design.likes.includes(authState.user._id) ? (
                            <img src={Liked} alt="Corazón rojo" />
                            ) : (
                            <img src={Unliked} alt="Corazón con borde rojo" />
                        )}
                    </div>
                  </div>
                ) : null
              ))}
            </div>
          )}
        </section>
    </>
  );
};

export default Community;
