import React from 'react';
import NavComponent from '../../components/pages/Navs/NavComponent';
import FooterComponent from '../../components/pages/Footers/FooterComponent';
import ButtonComponent from '../../components/pages/Buttons/ButtonComponent';

const DesignsController = ({template}) => {

    const renderVisualContainer = () => {
        switch (template.elementType) {
            case 'nav':
                return (
                    <NavComponent template={template}></NavComponent>
                );
            // case 'figure':
            //     return (
            //         <FigureComponent template={template}></FigureComponent>
            //     );
            // case 'section':
            //     return (
            //         <SectionComponent template={template}></SectionComponent>
            //     );
            // case 'form':
            //     return (
            //         <FormComponent template={template}></FormComponent>
            //     );
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
