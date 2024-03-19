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
          name:'SectionColumn',
          elementType:'section',
          defaultContent: 
          { children: ["article","h2"], items: "p", count: 3 , count2:2 },
        defaultStyles:["sectionColumn", "article", "h2","p"],
        edit: {
          text: ["Enviar"],
          texTitle: ["Title"],
          bgColor: "#000",
          fontColor: "#fff",
          fontSize: "20px",
          fontWeight: "bold",
          borderRadius: "5px",
          outline: "none",
          border: "1px solid #000"
        }
      },
          

        
        {
          name:'SectionRow',
          elementType:'section',
          defaultContent: 
          { children: ["article","h2"], items: "p", count: 3 , count2:1 },
        defaultStyles:["sectionRow", "article", "h2","p"],
        edit: {
          text: ["Texto1","Texto2","Texto3"],
          textTitle: ["Title1","Title2","Title3"],
          bgColor: "#000",
          fontColor: "#fff",
          fontSize: "20px",
          fontWeight: "bold",
          borderRadius: "5px",
          outline: "none",
          border: "1px solid #000"
        }
      },

        
          

        
        {
          name:'SectionColumnSpace',
          elementType:'section',
          defaultContent: 
          { children: ["article","h2"], items: "p", count: 3 , count2:2 },
        defaultStyles:["SectionColumnSpace", "article", "h2","p"],
        edit: {
          text: ["Enviar"],
          texTitle: ["Title"],
          bgColor: "#000",
          fontColor: "#fff",
          fontSize: "20px",
          fontWeight: "bold",
          borderRadius: "5px",
          outline: "none",
          border: "1px solid #000"
        }
      },
          


        {
          name:'SectionRowContract',
          elementType:'section',
          defaultContent: 
          { children: ["article","h2"], items: "p", count: 3 , count2:1 },
        defaultStyles:["SectionRowContract", "article", "h2","p"],
        edit: {
          text: ["Enviar"],
          textTitle: ["Title"],
          bgColor: "#000",
          fontColor: "#fff",
          fontSize: "20px",
          fontWeight: "bold",
          borderRadius: "5px",
          outline: "none",
          border: "1px solid #000"
        }
      },
          

        
        

    ];

    const template = templates[5];
    return (
        <DesignsController template={template}/>
    )
}

export default Catalogue
