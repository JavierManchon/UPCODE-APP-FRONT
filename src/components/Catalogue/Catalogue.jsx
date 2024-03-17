import React from 'react'
import DesignsController from '../DesignsController/DesignsController';

const Catalogue = () => {
    const templates = [
        {
          name: 'Button',
          elementType: 'button',
          defaultContent: 'Botón',
          defaultStyles:["clase1", "clase2"],
          personalStyles: { backgroundColor: '', color: '#000000' }
        },
        {
          name: 'Header',
          elementType: 'header',
          defaultContent: { title: 'Título del Encabezado', items: ['Enlace 1', 'Enlace 2'] },
          defaultStyles: { backgroundColor: '', color: '#000000', fontSize: '24px' },
        },
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
        }
    ];

    const template = templates[5];
    return (
        <DesignsController template={template}/>
    )
}

export default Catalogue
