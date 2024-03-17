import React from 'react';
import './_designsController.scss';
import NavComponent from './Navs/NavComponent';

const DesignsController = ({template}) => {

    const renderVisualContainer = () => {
        switch (template.elementType) {
            case 'nav':
                return (
                    <NavComponent template={template}></NavComponent>
                );
            // case 'section':
            //     return (
            //         <SectionComponent template={template}></SectionComponent>
            //     );
            // case 'form':
            //     return (
            //         <FormComponent template={template}></FormComponent>
            //     );
            // case 'footer':
            // return (
            //     <FooterComponent template={template}></FooterComponent>
            // );
            // case 'table':
            // return (
            //     <TableComponent template={template}></TableComponent>
            // );
            // case 'div':
            // return (
            //     <DivComponent template={template}></DivComponent>
            // );
            // case 'button':
            // return (
            //     <ButtonComponent template={template}></ButtonComponent>
            // );
            default:
                return null;
        }
    };

    return renderVisualContainer(template);
}

export default DesignsController;
