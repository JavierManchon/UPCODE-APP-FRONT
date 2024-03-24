
import React, { useState, useEffect } from 'react';
import "./_catalogue.scss";
import axios from 'axios';
import { Link } from 'react-router-dom';
import DesignsController from '../../../middlewares/DesignsController/DesignsController';
import AsideTickets from '../../layout/AsideTickets/AsideTickets';
import { getDesigns } from '../../../api/axios/designs';


const Catalogue = ({isLogged ,setIsLogged}) => {
    const [templates, setTemplates] = useState([]);
    const [groupedTemplates, setGroupedTemplates] = useState({});



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getDesigns();
                const fetchedTemplates = response.data;
                setTemplates(fetchedTemplates);
                setGroupedTemplates(groupByElementType(fetchedTemplates));
            } catch (error) {
                console.error('Error fetching designs:', error);
            }
        };

        fetchData();
    }, []);

    const groupByElementType = (designsToGroup) => {
        return designsToGroup.reduce((grouped, template) => {
            (grouped[template.elementType] = grouped[template.elementType] || []).push(template);
            return grouped;
        }, {});
    };

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            setIsLogged(true);
        } else {
            setIsLogged(false);
        }
    }, [setIsLogged]);

    function capitalizeFirstLetter(text) {
        // Verificar si el texto está vacío
        if (!text) {
          return '';
        }
      
        // Convertir la primera letra a mayúscula y concatenar con el resto del texto
        return text.charAt(0).toUpperCase() + text.slice(1);
    }
  
    return (
        <main className='container-catalogue'>
            <h2>Catálogo de Diseños</h2>
            {Object.entries(groupedTemplates).map(([elementType, templates]) => (
                <section key={elementType} className={`container-packs ${elementType}`}>
                    <h3>{`Packs de ${capitalizeFirstLetter(elementType)}`}</h3>
                        <div className='packs'>
                            {templates.map((template, index) => (
                                <Link key={index} className={`pack ${elementType}`} to={`/catalogue/template-${elementType}s/${template._id}`} state={{ templateData: template }}>
                                {    console.log(template._id)}
                                    <h4>{template.nameDesign}</h4>
                                    <img src={template.image} alt={`imagen de ${template.nameDesign}`}></img>
                                    {/* Otros elementos que quieras incluir */}
                                </Link>
                        ))}
                        </div>
                </section>
            ))}
            {isLogged ? <AsideTickets setIsLogged={setIsLogged}/> : null};
        </main>
    );
};

export default Catalogue;
