import React from "react";
import DesignsController from "../../../middlewares/DesignsController/DesignsController";


const Catalogue = () => {
  const templates = [
    {
      name: "NavBarVertical",
      elementType: "nav",
      defaultContent: { children: "ul", items: "li", count: 3 },
      defaultStyles: ["navBarVertical", "ul", "li"],
    },
    {
      name: "NavBarHorizontalStart",
      elementType: "nav",
      defaultContent: { children: "ul", items: "li", count: 3 },
      defaultStyles: ["navBarHorizontalStart", "ul", "li"],
    },
    {
      name: "NavBarHorizontalCenter",
      elementType: "nav",
      defaultContent: { children: "ul", items: "li", count: 3 },
      defaultStyles: ["navBarHorizontalCenter", "ul", "li"],
    },
    {
      name: "NavBarHorizontalEnd",
      elementType: "nav",
      defaultContent: { children: "ul", items: "li", count: 3 },
      defaultStyles: ["navBarHorizontalEnd", "ul", "li"],
    },
    {
      name: "FigureUpText",
      elementType: "figure",
      defaultContent: { children: "img", items: "figcaption", count: 1 },
      defaultStyles: ["FigureUpText", "img", "figcaption"],
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
      name: "FigureDownText",
      elementType: "figure",
      defaultContent: { children: "img", items: "figcaption", count: 1 },
      defaultStyles: ["FigureDownText", "img", "figcaption"],
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
      defaultContent: { children: "img", items: "figcaption", count: 1 },
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
    
  ];
  

  const template = templates[6];
  return <DesignsController template={template} />;
};

export default Catalogue;
