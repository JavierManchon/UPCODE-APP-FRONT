import React, { useEffect, useState } from 'react';
import './_userArea.scss';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const UserArea = () => {
  const { authState } = useAuth();

  const [designs, setDesigns] = useState([]);
  const [groupedDesigns, setGroupedDesigns] = useState({});

  // Función para agrupar diseños por tipo de elemento
  const groupByElementType = (designsToGroup) => {
    return designsToGroup.reduce((grouped, template) => {
      (grouped[template.elementType] = grouped[template.elementType] || []).push(template);
      return grouped;
    }, {});
  };

  // Efecto para establecer diseños y diseños agrupados cuando cambia el estado de autenticación
  useEffect(() => {
    if (authState.user && authState.user.designs) {
      const newDesigns = authState.user.designs;
      setDesigns(newDesigns);
      setGroupedDesigns(groupByElementType(newDesigns));
    }
  }, [authState.user]);

  function capitalizeFirstLetter(text) {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  const hasDesigns = designs.length > 0;

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
        <div> {/* Contenedor agregado para envolver la expresión JSX */}
          {Object.entries(groupedDesigns).map(([elementType, templates]) => (
            <section key={elementType} className={`container-packs ${elementType}`}>
                <h3>{`Mis diseños de : ${capitalizeFirstLetter(elementType)}`}</h3>
                    <div className='packs'>
                        {templates.map((template, index) => (
                            template.template === false ? (
                                <Link key={index} className={`pack ${elementType}`} to={`/catalogue/template-${elementType}s/${template._id}`} state={{ templateData: template }}>
                                    <h4>{template.nameDesign}</h4>
                                    <img src={template.image} alt={`imagen de ${template.nameDesign}`} />
                                </Link>
                            ) : null
                        ))}
                    </div>
            </section>
          ))}
        </div>
      )}
    </>
  );
};

export default UserArea;
