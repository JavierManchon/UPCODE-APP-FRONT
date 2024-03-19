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
          name: 'FormVerticalText',
          elementType: 'form',
          defaultContent: 
            { children: ["label", "input"], grandson: ["button"], type: "text", countChildren: 2, countGrandson: 1 },
          defaultStyles:["formVerticalText", "label", "input", "button", "div"],
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
          name: 'FormVerticalRadio',
          elementType: 'form',
          defaultContent: 
            { children: ["label", "input"], grandson: ["button"], type: "radio", countChildren: 2, countGrandson: 2 },
          defaultStyles:["formVerticalRadio", "label", "input", "button", "div"],
          edit: {
            text: null,
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
            { children: ["label", "input"], grandson: ["button"], type: "checkbox", countChildren: 3, countGrandson: 2 },
          defaultStyles:["formVerticalCheckbox", "label", "input", "button", "div"]
        },
        {
          name: 'FormVerticalColor',
          elementType: 'form',
          defaultContent: 
            { children: ["label", "input"], grandson: ["button"], type: "color", countChildren: 1, countGrandson: 1 },
          defaultStyles:["formVerticalColor", "label", "input", "button", "div"]
        }
    ];

    const template = templates[4];
    return (
        <DesignsController template={template}/>
    )
}

export default Catalogue