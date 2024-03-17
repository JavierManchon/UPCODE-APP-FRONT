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
          defaultContent: 
            { children: "ul", items: "li", count: 3 },
          defaultStyles:["footerVertical", "ul", "li"]
        }
    ];

    const template = templates[5];
    return (
        <DesignsController template={template}/>
    )
}

export default Catalogue
