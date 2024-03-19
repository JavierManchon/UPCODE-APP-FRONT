import React from 'react';
import NavComponent from '../../components/pages/Navs/NavComponent';
import SectionComponent from '../../components/pages/Sections/SectionComponent'


const DesignsController = ({template}) => {

    const renderVisualContainer = () => {
        switch (template.elementType) {
            case 'nav':
                return (
                    <NavComponent template={template}></NavComponent>
                );
                 case 'section':
                     return (
                         <SectionComponent template={template}></SectionComponent>
                   );
            // case 'figure':
            //     return (
            //         <FigureComponent template={template}></FigureComponent>
            //     );
            // case 'form':
            //     return (
            //         <FormComponent template={template}></FormComponent>
            //     );
            // case 'footer':
            // return (
            //     <FooterComponent template={template}></FooterComponent>
            // );
            default:
                return null;
        }
    };

    return renderVisualContainer(template);
}

export default DesignsController;
