import React from 'react'
import DesignsController from '../../../middlewares/DesignsController/DesignsController';

const Catalogue = () => {
    const templates = [
        {
          name: 'NavBarVertical',
          elementType: 'nav',
          defaultContent: 
            { children: "ul", items: "li", count: 3 },
          defaultStyles:["navBarVertical", "ul", "li"]
        },
        {
          name: 'NavBarHorizontalStart',
          elementType: 'nav',
          defaultContent: 
            { children: "ul", items: "li", count: 3 },
          defaultStyles:["navBarHorizontalStart", "ul", "li"]
        },
        {
          name: 'NavBarHorizontalCenter',
          elementType: 'nav',
          defaultContent: 
            { children: "ul", items: "li", count: 3 },
          defaultStyles:["navBarHorizontalCenter", "ul", "li"]
        },
        {
          name: 'NavBarHorizontalEnd',
          elementType: 'nav',
          defaultContent: 
            { children: "ul", items: "li", count: 3 },
          defaultStyles:["navBarHorizontalEnd", "ul", "li"]
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
            bgColorFooter: '#000',
            bgColorDiv: null,
            bgColorTable: null,
            colorTitle: null,
            colorItem: null,
            colorText: '#fff',
            fontSizeTitle: null,
            fontSizeItem: null,
            fontSizeText: '20px',
            textDecorationTitle: null,
            textDecorationText: 'underline',
            fontWeightTitle: null,
            fontWeightItem: null,
            fontWeightText: null,
            borderRadius: null,
            outline: null,
            textArray: ["Home", "Contact", "Designs"], 
            textArray2: null, 
            texArrayBidimensional: null,
            border: null,
          }
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

    const template = templates[5];
    return (
        <DesignsController template={template}/>
    )
}

export default Catalogue
