import React, { useState, useEffect } from 'react';
import "./_catalogue.scss";
import axios from 'axios';
// Asegúrate de que la ruta a DesignsController es correcta según tu estructura de proyecto
import DesignsController from '../../../middlewares/DesignsController/DesignsController';

const Catalogue = () => {
    const templates = [
        {
            name: 'NavBarVertical',
            elementType: 'nav',
            defaultContent: { children: "ul", items: "li", count: 3 },
            defaultStyles: ["navBarVertical", "ul", "li"],
            image:"https://res.cloudinary.com/do0s2lutu/image/upload/v1701777805/owonnexnscmi56bbdomz.png"
        },
        {
            name: 'NavBarHorizontalStart',
            elementType: 'nav',
            defaultContent: { children: "ul", items: "li", count: 3 },
            defaultStyles: ["navBarHorizontalStart", "ul", "li"],
            image:"https://res.cloudinary.com/do0s2lutu/image/upload/v1701777805/owonnexnscmi56bbdomz.png"
        },
        {
            name: 'NavBarHorizontalCenter',
            elementType: 'nav',
            defaultContent: { children: "ul", items: "li", count: 3 },
            defaultStyles: ["navBarHorizontalCenter", "ul", "li"],
            image:"https://res.cloudinary.com/do0s2lutu/image/upload/v1701777805/owonnexnscmi56bbdomz.png"
        },
        {
            name: 'NavBarHorizontalEnd',
            elementType: 'nav',
            defaultContent: { children: "ul", items: "li", count: 3 },
            defaultStyles: ["navBarHorizontalEnd", "ul", "li"],
            image:"https://res.cloudinary.com/do0s2lutu/image/upload/v1701777805/owonnexnscmi56bbdomz.png"
        },
        {
            name: 'NavBarHorizontalEnd',
            elementType: 'div',
            defaultContent: { children: "ul", items: "li", count: 3 },
            defaultStyles: ["navBarHorizontalEnd", "ul", "li"],
            image:"https://res.cloudinary.com/do0s2lutu/image/upload/v1701777805/owonnexnscmi56bbdomz.png"
        },
        {
            name: 'NavBarHorizontalEnd',
            elementType: 'section',
            defaultContent: { children: "ul", items: "li", count: 3 },
            defaultStyles: ["navBarHorizontalEnd", "ul", "li"],
            image:"https://res.cloudinary.com/do0s2lutu/image/upload/v1701777805/owonnexnscmi56bbdomz.png"
        },
        {
            name: 'NavBarHorizontalEnd',
            elementType: 'footer',
            defaultContent: { children: "ul", items: "li", count: 3 },
            defaultStyles: ["navBarHorizontalEnd", "ul", "li"],
            image:"https://res.cloudinary.com/do0s2lutu/image/upload/v1701777805/owonnexnscmi56bbdomz.png"
        },
        {
            name: 'NavBarHorizontalEnd',
            elementType: 'figure',
            defaultContent: { children: "ul", items: "li", count: 3 },
            defaultStyles: ["navBarHorizontalEnd", "ul", "li"],
            image:"https://res.cloudinary.com/do0s2lutu/image/upload/v1701777805/owonnexnscmi56bbdomz.png"
        },
        {
            name: 'NavBarHorizontalEnd',
            elementType: 'form',
            defaultContent: { children: "ul", items: "li", count: 3 },
            defaultStyles: ["navBarHorizontalEnd", "ul", "li"],
            image:"https://res.cloudinary.com/do0s2lutu/image/upload/v1701777805/owonnexnscmi56bbdomz.png"
        },
        {
            name: 'NavBarHorizontalEnd',
            elementType: 'button',
            defaultContent: { children: "ul", items: "li", count: 3 },
            defaultStyles: ["navBarHorizontalEnd", "ul", "li"],
            image:"https://res.cloudinary.com/do0s2lutu/image/upload/v1701777805/owonnexnscmi56bbdomz.png"
        }
    ];

    const [designs, setDesigns] = useState([...templates]);
    const [groupedTemplates, setGroupedTemplates] = useState({});

    // Agrupa templates cada vez que 'designs' cambie
    useEffect(() => {
        const groupByElementType = (designsToGroup) => {
            return designsToGroup.reduce((grouped, template) => {
                (grouped[template.elementType] = grouped[template.elementType] || []).push(template);
                return grouped;
            }, {});
        };

        // Actualiza el estado con los nuevos templates agrupados
        setGroupedTemplates(groupByElementType(designs));console.log(groupedTemplates)
    }, [designs]);

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
                                <article key={index} className={`pack ${elementType}`}>
                                    <h4>{template.name}</h4>
                                    <img src={template.image} alt={`imagen de ${template.nameDesign}`}></img>
                                    {/* Otros elementos que quieras incluir */}
                                </article>
                        ))}
                        </div>
                </section>
            ))}
        </main>
    );
};

export default Catalogue;
