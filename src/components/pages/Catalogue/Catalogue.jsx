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
          name: 'FooterHorizontal',
          elementType: 'footer',
          defaultContent: 
            { children: "ul", items: "li", count: 3 },
          defaultStyles:["footerHorizontal", "ul", "li"]
        },
        {
          name: 'FooterVertical',
          elementType: 'footer',
          defaultContent: { 
            children: "ul", 
            items: "li", 
            count: 3,
            type: null
          },
          defaultStyles:["footerVertical", "ul", "li"],
          edit: {
            text: ["Home", "Contact", "Designs"],
            bgColor: '#000',
            fontColor: '#fff',
            fontSize: '40px',
            textDecoration: 'underline',
            fontWeight: 'bold'
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
          name: "BtnHoverDown",
          elementType: 'button',
          defaultContent: {
            children: null,
            items: null,
            count: null,
            type: "submit"
          },
          defaultStyles:["btn-up"],
          edit: {
            text: ["Enviar"],
            bgColor: "#000",
            fontColor: "#fff",
            fontSize: "20px",
            fontWeight: "bold",
            borderRadius: "5px",
            outline: "none",
            border: "1px solid #000"
          }
        }
    ];

    const template = templates[7];
    return (
        <DesignsController template={template}/>
    )
}

export default Catalogue
