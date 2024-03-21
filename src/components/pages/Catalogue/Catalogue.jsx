
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
            name: 'divPColumn',
            elementType: 'div',
            image:"https://res.cloudinary.com/do0s2lutu/image/upload/v1701777805/owonnexnscmi56bbdomz.png",
            defaultContent: 
              { children: ["p"], grandson :null ,countChildren: 1, countGrandson: null, tagInfo: null },
            defaultStyles:["divPColumn", "p"],
            edit: {
              text: null,
              textItem: null,
              textTitle: null,
              bgColorNav: null,
              bgColorForm: null,
              bgColorButton: null,
              bgColorSection: null,
              bgColorArticle: null,
              bgColorFigure: null,
              bgColorFooter: null,
              bgColorDiv: null,
              bgColorTable: null,
              colorTitle: null,
              colorItem: null,
              colorText: null,
              fontSizeTitle: null,
              fontSizeItem: null,
              fontSizeText: null,
              textDecorationTitle: null,
              textDecorationText: null,
              fontWeightTitle: null,
              fontWeightItem: null,
              fontWeightText: null,
              border: null,
              borderRadius: null,
              outline: null
            },
          },
          {
            name:'SectionRow',
            elementType:'section',
            image:"https://res.cloudinary.com/do0s2lutu/image/upload/v1701777805/owonnexnscmi56bbdomz.png",
            defaultContent: 
            { children: ["article","h2"], grandson: ["p"], countChildren: 3 , countGrandson:1 , tagInfo : null},
          defaultStyles:["sectionRow", "article", "h2","p"],
          edit: {
              text: null,
              textItem: null,
              bgColorNav: null,
              bgColorForm: null,
              bgColorButton: null,
              bgColorSection: null,
              bgColorArticle: null,
              bgColorFigure: null,
              bgColorFooter: null,
              bgColorDiv: null,
              bgColorTable: null,
              colorTitle: null,
              colorItem: null,
              colorText: null,
              fontSizeTitle: null,
              fontSizeItem: null,
              fontSizeText: null,
              textDecorationTitle: null,
              textDecorationText: null,
              fontWeightTitle: null,
              fontWeightItem: null,
              fontWeightText: null,
              borderRadius: null,
              outline: null,
              textArray: null, 
              textArray2: null, 
              texArrayBidimensional: null,
              border: null,
            }
        },
        {
            name:'SectionColumnSpace',
            elementType:'section',
            image:"https://res.cloudinary.com/do0s2lutu/image/upload/v1701777805/owonnexnscmi56bbdomz.png",
            defaultContent: 
            { children: ["article","h2"], grandson: ["p"], countChildren: 3 , countGrandson:1 , tagInfo : null},
          defaultStyles:["SectionColumnSpace", "article", "h2","p"],
          edit: {
              text: null,
              textItem: null,
              bgColorNav: null,
              bgColorForm: null,
              bgColorButton: null,
              bgColorSection: null,
              bgColorArticle: null,
              bgColorFigure: null,
              bgColorFooter: null,
              bgColorDiv: null,
              bgColorTable: null,
              colorTitle: null,
              colorItem: null,
              colorText: null,
              fontSizeTitle: null,
              fontSizeItem: null,
              fontSizeText: null,
              textDecorationTitle: null,
              textDecorationText: null,
              fontWeightTitle: null,
              fontWeightItem: null,
              fontWeightText: null,
              borderRadius: null,
              outline: null,
              textArray: null, 
              textArray2: null, 
              texArrayBidimensional: null,
              border: null,
            }
        },
        {
            name:'SectionRowContract',
            elementType:'section',
            image:"https://res.cloudinary.com/do0s2lutu/image/upload/v1701777805/owonnexnscmi56bbdomz.png",
            defaultContent: 
            { children: ["article","h2"], grandson: ["p"], countChildren: 3 , countGrandson:1 , tagInfo : null},
          defaultStyles:["SectionRowContract", "article", "h2","p"],
          edit: {
              text: null,
              textItem: null,
              bgColorNav: null,
              bgColorForm: null,
              bgColorButton: null,
              bgColorSection: null,
              bgColorArticle: null,
              bgColorFigure: null,
              bgColorFooter: null,
              bgColorDiv: null,
              bgColorTable: null,
              colorTitle: null,
              colorItem: null,
              colorText: null,
              fontSizeTitle: null,
              fontSizeItem: null,
              fontSizeText: null,
              textDecorationTitle: null,
              textDecorationText: null,
              fontWeightTitle: null,
              fontWeightItem: null,
              fontWeightText: null,
              borderRadius: null,
              outline: null,
              textArray: null, 
              textArray2: null, 
              texArrayBidimensional: null,
              border: null,
            }
        },
        {
            name:'SectionColumn',
            elementType:'section',
            image:"https://res.cloudinary.com/do0s2lutu/image/upload/v1701777805/owonnexnscmi56bbdomz.png",
            defaultContent: 
            { children: ["article","h2"], grandson: ["p"], countChildren: 3 , countGrandson:1 , tagInfo : null},
          defaultStyles:["SectionColumn", "article", "h2","p"],
          edit: {
              text: null,
              textItem: null,
              bgColorNav: null,
              bgColorForm: null,
              bgColorButton: null,
              bgColorSection: null,
              bgColorArticle: null,
              bgColorFigure: null,
              bgColorFooter: null,
              bgColorDiv: null,
              bgColorTable: null,
              colorTitle: null,
              colorItem: null,
              colorText: null,
              fontSizeTitle: null,
              fontSizeItem: null,
              fontSizeText: null,
              textDecorationTitle: null,
              textDecorationText: null,
              fontWeightTitle: null,
              fontWeightItem: null,
              fontWeightText: null,
              borderRadius: null,
              outline: null,
              textArray: null, 
              textArray2: null, 
              texArrayBidimensional: null,
              border: null,
            }
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
        },
      {
          name:'FooterRow',
          elementType:'footer',
          defaultContent: 
          { children: ["ul"], grandson: ["li"], countChildren: 1 , countGrandson:3 , tagInfo : null},
          defaultStyles:["footerHorizontal", "ul", "li"],
          edit: {
            text: null,
            textItem: null,
            bgColorNav: null,
            bgColorForm: null,
            bgColorButton: null,
            bgColorSection: null,
            bgColorArticle: null,
            bgColorFigure: null,
            bgColorFooter: null,
            bgColorDiv: null,
            bgColorTable: null,
            colorTitle: null,
            colorItem: null,
            colorText: null,
            fontSizeTitle: null,
            fontSizeItem: null,
            fontSizeText: null,
            textDecorationTitle: null,
            textDecorationText: null,
            fontWeightTitle: null,
            fontWeightItem: null,
            fontWeightText: null,
            borderRadius: null,
            outline: null,
            textArray: null, 
            textArray2: null, 
            texArrayBidimensional: null,
            border: null,
          }
        },
        {
          name:'FooterVertical',
          elementType:'footer',
          defaultContent: 
          { children: ["ul"], grandson: ["li"], countChildren: 1 , countGrandson:3 , tagInfo : 'submit'},
          defaultStyles:["footerVertical", "ul", "li"],
          edit: {
            text: null,
            textItem: null,
            bgColorNav: null,
            bgColorForm: null,
            bgColorButton: null,
            bgColorSection: null,
            bgColorArticle: null,
            bgColorFigure: null,
            bgColorFooter: null,
            bgColorDiv: null,
            bgColorTable: null,
            colorTitle: null,
            colorItem: null,
            colorText: null,
            fontSizeTitle: null,
            fontSizeItem: null,
            fontSizeText: null,
            textDecorationTitle: null,
            textDecorationText: null,
            fontWeightTitle: null,
            fontWeightItem: null,
            fontWeightText: null,
            borderRadius: null,
      }
    },
    {
      name: "FigureLeftText",
      elementType: "figure",
      defaultContent: { children: ["img"], grandson: ["figcaption"], countChildren: 1 , countGrandson:0},
      defaultStyles: ["FigureLeftText", "img", "figcaption"],
      edit: {
        text: null,
            textItem: null,
            bgColorNav: null,
            bgColorForm: null,
            bgColorButton: null,
            bgColorSection: null,
            bgColorArticle: null,
            bgColorFigure: null,
            bgColorFooter: null,
            bgColorDiv: null,
            bgColorTable: null,
            colorTitle: null,
            colorItem: null,
            colorText: null,
            fontSizeTitle: null,
            fontSizeItem: null,
            fontSizeText: null,
            textDecorationTitle: null,
            textDecorationText: null,
            fontWeightTitle: null,
            fontWeightItem: null,
            fontWeightText: null,
            borderRadius: null,
      }
    },
    {
      name: "FigureRightText",
      elementType: "figure",
      defaultContent: { children: "img", items: "figcaption", count: 1 },
      defaultStyles: ["FigureRightText", "img", "figcaption"],
      edit: {
        text: null,
            textItem: null,
            bgColorNav: null,
            bgColorForm: null,
            bgColorButton: null,
            bgColorSection: null,
            bgColorArticle: null,
            bgColorFigure: null,
            bgColorFooter: null,
            bgColorDiv: null,
            bgColorTable: null,
            colorTitle: null,
            colorItem: null,
            colorText: null,
            fontSizeTitle: null,
            fontSizeItem: null,
            fontSizeText: null,
            textDecorationTitle: null,
            textDecorationText: null,
            fontWeightTitle: null,
            fontWeightItem: null,
            fontWeightText: null,
            borderRadius: null,
          }
        },
        {
          name: 'FormVerticalCheckbox',
          elementType: 'form',
          defaultContent: 
            { children: ["label", "input"], grandson: ["button"], tagInfo: "checkbox", countChildren: 3, countGrandson: 2 },
          defaultStyles:["formVerticalCheckbox", "label", "input", "button", "div"]
        },
        {
          name: 'FormVerticalColor',
          elementType: 'form',
          defaultContent: 
            { children: ["label", "input"], grandson: ["button"], tagInfo: "color", countChildren: 1, countGrandson: 1 },
          defaultStyles:["formVerticalColor", "label", "input", "button", "div"]
    },
    
        {
          name: "BtnHoverUp",
          elementType: 'button',
          defaultContent: {
            children: null,
            items: null,
            count: null,
            type: "submit"
          },
          defaultStyles:["btn-up"],
          edit: {
            text: [],
            bgColor: null,
            fontColor: null,
            fontSize: null,
            fontWeight: null
          }
        },
        {
          name: "BtnInset",
          elementType: 'button',
          defaultContent: {
            children: null,
            items: null,
            count: null,
            tagInfo: "submit"
          },
          defaultStyles:["btn-inset"],
          edit: {
            text: "Enviar",
            bgColorButton: "#000",
            colorText: "#fff",
            fontSizeText: "20px",
            fontWeightText: "bold",
            borderRadius: "10px",
            outline: "none",
            border: "1px solid #000"
          }
        },
        {
          name: "BtnInset",
          elementType: 'button',
          defaultContent: {
            children: null,
            items: null,
            count: null,
            tagInfo: "submit"
          },
          defaultStyles:["btn-outset"],
          edit: {
            text: "Enviar",
            bgColorButton: "#000",
            colorText: "#fff",
            fontSize: "20px",
            fontWeight: "bold",
            borderRadius: "10px",
            outline: "none",
            border: "1px solid #000"
          }
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



    const template = templates[5];
  
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