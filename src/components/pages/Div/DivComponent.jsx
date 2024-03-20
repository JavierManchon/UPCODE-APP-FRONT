import React, { useEffect, useState, useRef } from 'react'
import './_divComponent.scss';
import '../../../css/app.scss';


const DivComponent = ({ template }) => {
    const [pValues, setPValues] = useState(()=>{
        if(template.edit && template.edit.text){
            return [...template.edit.text];
        }else{
            // Corrección: Asegurarse de retornar el Array.from(...)
            return Array.from({ length: template.defaultContent.countChildren }, () => 'Item');
        }
    });


    const [bgColor, setBgColor] = useState(template.edit.bgColorDiv ? template.edit.bgColorDiv : '');
    const [fontColor, setFontColor] = useState(template.edit.colorText ? template.edit.colorText : '');
    const [fontSize, setFontSize] = useState(template.edit.fontSizeText ? template.edit.fontSizeText : '');
    const [fontWeight, setFontWeight] = useState(template.edit.fontWeightText ? template.edit.fontWeightText : '');
    const [divStyles, setDivStyles] = useState([]);
    const [pStyles, setPStyles] = useState([]);

    const handlePChange = (index) => (event) => {
        const newPValues = [...pValues];
        newPValues[index] = event.target.value;
        setPValues(newPValues);
    };

    const handleBgColor = (event) => {
        setBgColor(event.target.value);
    };

    const handleFontColor = (event) => {
        setFontColor(event.target.value)
    }

    const handleFontSize = (event) => {
        setFontSize(`${event.target.value}px`)
    }

    const handleFontWeight = (event) => {
        setFontWeight(event.target.value)
    }

    const visualDiv = useRef(null);
        useEffect(() => {
            if (visualDiv.current) {
                const computedDivStyles = window.getComputedStyle(visualDiv.current);

                setDivStyles({
                    backgroundColor: computedDivStyles.backgroundColor,
                    width: computedDivStyles.width,
                    padding: computedDivStyles.padding,
                    display: computedDivStyles.display,
                    flexDirection: computedDivStyles.flexDirection,
                    justifyContent: computedDivStyles.justifyContent,
                    alignItems: computedDivStyles.alignItems,
                    gap: computedDivStyles.gap,
                    flexWrap: computedDivStyles.flexWrap
                });
        }
    }, [bgColor]);    

    const visualP = useRef(null);
    useEffect(() => {
        if (visualP.current) {
            const computedStyles = window.getComputedStyle(visualP.current);
            setPStyles({
                color: computedStyles.color,
                fontSize: computedStyles.fontSize,
                fontWeight: computedStyles.fontWeight,
            });
        }
    }, [fontColor, fontSize, fontWeight]);

    const getFirstWord = (text) => {
        if (text) {
            const words = text.split(" ");
        return words[0];
        }
        return null;
    };

    const copyToClipboard = (elementId) => {
        const element = document.getElementById(elementId);
        const range = document.createRange();
        range.selectNodeContents(element);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand('copy');
        selection.removeAllRanges();
    };

    return (
        <div className='container-pages-default-styles'>
            <div className='container-editor'>
                <p>{'<'}{template.elementType}{'>'}</p>
                {Array.from({ length: template.defaultContent.countChildren }).map((_, index) => (
                <React.Fragment key={index}>
                    <p>
                        {'<'}{template.defaultContent ? template.defaultContent.children : null}{'>'}
                        <input type='text' onChange={handlePChange(index)} maxLength={12} placeholder='Máximo 12 caracteres'/>
                        {'</'}{template.defaultContent ? template.defaultContent.children : null}{'>'
                    }</p>
                </React.Fragment>
                ))}
                <p>{'</'}{template.elementType}{'>'}</p>
            </div>

            <div className="styles-editor">
                <label htmlFor="bgColor">
                    <p>Color de Fondo</p>
                    <input type="color" id='bgColor' onChange={handleBgColor}/>
                </label>
                
                <label htmlFor="fontColor">
                    <p>Color de Letra</p>
                    <input type="color" id='fontColor' onChange={handleFontColor}/>
                </label>
                
                <label htmlFor="fontSize">
                    <p>Tamaño de Letra</p>
                    <input type="number" id='fontSize' min={12} max={20} onChange={handleFontSize}/>
                </label>
                
                <label htmlFor="fontWeight">
                    <p>Negrita</p>
                    <div>
                    <input type="radio" name='fontWeight' value="bold" onChange={handleFontWeight}/>
                    <input type="radio" name='fontWeight' value="normal" onChange={handleFontWeight}/>
                    </div>
                    
                </label>
                
            </div>

            <div className="container-renderized_visual" >
                <div className={template.defaultStyles[0]} style={{backgroundColor: `${bgColor}`}} ref={visualDiv}>
                        {pValues.map((value, index) => (
                            <p className={template.defaultStyles[1]} key={index} style={{color: `${fontColor}`, fontSize: `${fontSize}`, fontWeight: `${fontWeight}`}} ref={visualP}>{value}</p>
                        ))}
                </div>
            </div>

            <div className='container-renderized_html'>
                <div className='title-btn'>
                    <h4>HTML</h4>
                    <button onClick={() => copyToClipboard('html')}>Copiar</button>
                </div>
                <div id='html' className='html'>
                    <span>{'<'}{template.elementType}{'>'}</span>
                    {Array.from({ length: template.defaultContent.countChildren }).map((_, index) => (
                    <React.Fragment key={index}>
                        <span> 
                            {'<' + (template.defaultContent ? template.defaultContent.children : null) + '>'}
                            {pValues[index]}
                            {'</' + (template.defaultContent ? template.defaultContent.children : null) + '>'}
                        </span>
                    </React.Fragment>
                    ))}
                    <span>{'</'}{template.elementType}{'>'}</span>
                </div>
            </div>
            <div className='container-renderized_css'>
                <div className='css-div'>
                    <div className='title-btn'>
                        <h4>Estilos del {'<div>'}</h4>
                        <button onClick={() => copyToClipboard('css-div')}>Copiar</button>
                    </div>
                    <div className='css' id='css-div'>
                        <span>.{template.defaultStyles[0]}{' {'}</span>
                        <span>background-color: {divStyles.backgroundColor};</span>
                        <span>width: {divStyles.width};</span>
                        <span>display: {divStyles.display};</span>
                        <span>flex-direction: {divStyles.flexDirection};</span>
                        <span>justify-content: {divStyles.justifyContent};</span>
                        <span>align-items: {divStyles.alignItems};</span>
                        <span>gap: {divStyles.gap};</span>
                        <span>flex-wrap: {divStyles.flexWrap};</span>
                        <span>{'}'}</span>
                    </div>
                </div>
                
                <div className='css-p'>
                    <div className='title-btn'>
                        <h4>Estilos de la {'<p>'}</h4>
                        <button onClick={() => copyToClipboard('css-p')}>Copiar</button>
                    </div>
                    <div className='css' id='css-p'>
                        <span>.{template.defaultStyles[1]}{' {'}</span>
                        <span>color: {pStyles.color};</span>
                        <span>font-size: {pStyles.fontSize};</span>
                        <span>font-weight: {pStyles.fontWeight};</span>
                        <span>{'}'}</span>
                    </div>
                </div>
            </div>
        </div>
    )
};

















export default DivComponent