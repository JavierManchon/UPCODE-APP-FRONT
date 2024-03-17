import React, { useEffect, useState, useRef } from 'react'
import './_navComponent.scss';

const NavComponent = ({ template }) => {
    const [liValues, setLiValues] = useState(Array.from({ length: template.defaultContent.count }, () => 'Item'));
    const [bgColor, setBgColor] = useState('');
    const [fontColor, setFontColor] = useState('');
    const [fontSize, setFontSize] = useState('');
    const [fontWeight, setFontWeight] = useState('');
    const [textDecoration, setTextDecoration] = useState('');
    const [navStyles, setNavStyles] = useState([]);
    const [ulStyles, setUlStyles] = useState([]);
    const [liStyles, setLiStyles] = useState([]);

    const handleLiChange = (index) => (event) => {
        const newLiValues = [...liValues];
        newLiValues[index] = event.target.value;
        setLiValues(newLiValues);
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

    const handleTextDecoration = (event) => {
        setTextDecoration(event.target.value)
    }

    const visualNav = useRef(null);
        useEffect(() => {
            if (visualNav.current && visualUl.current) {
                const computedNavStyles = window.getComputedStyle(visualNav.current);
                const computedUlStyles = window.getComputedStyle(visualUl.current);
                let widthValue;
                if (computedUlStyles.flexDirection === 'row') {
                    widthValue = '100%';
                } else {
                    widthValue = computedNavStyles.width;
                }

                setNavStyles({
                    backgroundColor: computedNavStyles.backgroundColor,
                    width: widthValue,
                    padding: computedNavStyles.padding
                });
        }
    }, [bgColor]);    

    

    const visualUl = useRef(null);
    useEffect(() => {
        if (visualUl.current) {
            const computedStyles = window.getComputedStyle(visualUl.current);
            setUlStyles({
                display: computedStyles.display,
                flexDirection: computedStyles.flexDirection,
                width: '100%',
                gap: computedStyles.gap,
                justifyContent: computedStyles.justifyContent
            });
        }
    }, []);

    const visualLi = useRef(null);
    useEffect(() => {
        if (visualLi.current) {
            const computedStyles = window.getComputedStyle(visualLi.current);
            setLiStyles({
                color: computedStyles.color,
                fontSize: computedStyles.fontSize,
                fontWeight: computedStyles.fontWeight,
                textDecoration: computedStyles.textDecoration
            });
        }
    }, [fontColor, fontSize, fontWeight, textDecoration]);

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
        <div className='container-all'>
            <div className='container-editor'>
                <p>{'<'}{template.elementType}{'>'}</p>
                <p>{'<'}{template.defaultContent ? template.defaultContent.children : null}{'>'}</p>
                {Array.from({ length: template.defaultContent.count }).map((_, index) => (
                <React.Fragment key={index}>
                    <p>
                        {'<'}{template.defaultContent ? template.defaultContent.items : null}{'>'}
                        <input type='text' onChange={handleLiChange(index)} maxLength={12} placeholder='Máximo 12 caracteres'/>
                        {'</'}{template.defaultContent ? template.defaultContent.items : null}{'>'
                    }</p>
                </React.Fragment>
                ))}
                <p>{'</'}{template.defaultContent ? template.defaultContent.children : null}{'>'}</p>
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
                
                <label htmlFor="textDecoration">
                    <p>Subrayado</p>
                    <div>
                    <input type="radio" name='textDecoration' value="underline" onChange={handleTextDecoration}/>
                    <input type="radio" name='textDecoration' value="none" onChange={handleTextDecoration}/>
                    </div>
                    
                </label>
                
            </div>

            <div className="container-renderized_visual" >
                <nav className={template.defaultStyles[0]} style={{backgroundColor: `${bgColor}`}} ref={visualNav}>
                    <ul className={template.defaultStyles[1]} ref={visualUl}>
                        {liValues.map((value, index) => (
                            <li className={template.defaultStyles[2]} key={index} style={{color: `${fontColor}`, fontSize: `${fontSize}`, fontWeight: `${fontWeight}`, textDecoration: `${textDecoration}`}} ref={visualLi}>{value}</li>
                        ))}
                    </ul>
                </nav>
            </div>

            <div className='container-renderized_html'>
                <div className='title-btn'>
                    <h4>HTML</h4>
                    <button onClick={() => copyToClipboard('html')}>Copiar</button>
                </div>
                <div id='html' className='html'>
                    <span>{'<'}{template.elementType}{'>'}</span>
                    <span>{'<'}{template.defaultContent ? template.defaultContent.children : null}{'>'}</span>
                    {Array.from({ length: template.defaultContent.count }).map((_, index) => (
                    <React.Fragment key={index}>
                        <span> 
                            {'<' + (template.defaultContent ? template.defaultContent.items : null) + '>'}
                            {liValues[index]}
                            {'</' + (template.defaultContent ? template.defaultContent.items : null) + '>'}
                        </span>
                    </React.Fragment>
                    ))}
                    <span>{'</'}{template.defaultContent ? template.defaultContent.children : null}{'>'}</span>
                    <span>{'</'}{template.elementType}{'>'}</span>
                </div>
            </div>
            <div className='container-renderized_css'>
                <div className='css-nav'>
                    <div className='title-btn'>
                        <h4>Estilos del {'<nav>'}</h4>
                        <button onClick={() => copyToClipboard('css-nav')}>Copiar</button>
                    </div>
                    <div className='css' id='css-nav'>
                        <span>.{template.defaultStyles[0]}{' {'}</span>
                        <span>background-color: {navStyles.backgroundColor};</span>
                        <span>width: {navStyles.width};</span>
                        <span>padding: {navStyles.padding};</span>
                        <span>{'}'}</span>
                    </div>
                </div>
                
                <div className='css-ul'>
                    <div className='title-btn'>
                        <h4>Estilos de la {'<ul>'}</h4>
                        <button onClick={() => copyToClipboard('css-ul')}>Copiar</button>
                    </div>
                    <div className='css' id='css-ul'>
                        <span>.{template.defaultStyles[1]}{' {'}</span>
                        <span>display: {ulStyles.display};</span>
                        <span>flex-direction: {ulStyles.flexDirection};</span>
                        <span>justify-content: {ulStyles.justifyContent};</span>
                        <span>gap: {ulStyles.gap};</span>
                        <span>width: {ulStyles.width};</span>
                        <span>{'}'}</span>
                    </div>
                </div>
                
                <div className='css-li'>
                    <div className='title-btn'>
                        <h4>Estilos de la {'<li>'}</h4>
                        <button onClick={() => copyToClipboard('css-li')}>Copiar</button>
                    </div>
                    <div className='css' id='css-li'>
                        <span>.{template.defaultStyles[2]}{' {'}</span>
                        <span>color: {liStyles.color};</span>
                        <span>font-size: {liStyles.fontSize};</span>
                        <span>font-weight: {liStyles.fontWeight};</span>
                        <span>text-decoration: {getFirstWord(liStyles.textDecoration)};</span>
                        <span>{'}'}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavComponent
