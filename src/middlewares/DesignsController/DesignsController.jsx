import React from 'react';
import NavComponent from '../../components/pages/Navs/NavComponent';

import FormComponent from '../../components/pages/Forms/FormComponent';
import FigureComponent from '../../components/pages/Figures/FigureComponent';
import SectionComponent from '../../components/pages/Sections/SectionComponent'
import DivComponent from '../../components/pages/Div/DivComponent'
import FooterComponent from '../../components/pages/Footers/FooterComponent';
import ButtonComponent from '../../components/pages/Buttons/ButtonComponent';

const DesignsController = ({template}) => {

    const renderVisualContainer = () => {
        switch (template.elementType) {
            case 'nav':
               return (
                    <NavComponent template={template}></NavComponent>
                );
            case 'figure':
                 return (
                     <FigureComponent template={template}></FigureComponent>
                 );

                 case 'section':
                     return (
                         <SectionComponent template={template}></SectionComponent>
                   );
                case 'div':
                    return (
                        <DivComponent template={template}></DivComponent>
                    );

            case 'form':
                 return (
                    <FormComponent template={template}></FormComponent>
                 );

            case 'footer':
            return (
                <FooterComponent template={template}></FooterComponent>
            );
            case 'button':
            return (
                <ButtonComponent template={template}></ButtonComponent>
            );

            default:
                return null;
        }
    };

    return renderVisualContainer(template);
}

export default DesignsController;
