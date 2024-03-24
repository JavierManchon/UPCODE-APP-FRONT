import React, { useEffect, useState, useRef } from 'react'
import './_sectionComponent.scss';
import '../../../css/app.scss';
import { useLocation } from 'react-router-dom';

const SectionComponent = () => {
    const location = useLocation(); 
    const template = location.state.templateData; 
    console.log(template)

    const [h2Values, setH2Values] = useState(() => {
        if(template.edit && template.edit.textArray > 0) {
            return [...template.edit.textArray];
        } else {
            return (Array.from({ length: template.defaultContent.countChildren }, () => 'Item'));
        }
    });
    const [pValues, setPValues] = useState(() => {
        if(template.edit && template.edit.textArray2) {
            return [...template.edit.textArray2];
        } else {
            return (Array.from({ length: template.defaultContent.countChildren }, () => 'Item'));
        }
    });

    const [SectionBgColor, setSectionBgColor] = useState(template.edit.SectionBgColor ? template.edit.SectionBgColor : '');

    const [ArticleBgColor, setArticleBgColor] = useState(template.edit.ArticleBgColor ? template.edit.ArticleBgColor : '');


    const [h2FontColor, setH2FontColor] = useState(template.edit.colorTitle ? template.edit.colorTitle : '');


    const [pFontColor, setPFontColor] = useState(template.edit.colorItem ? template.edit.colorItem : '');


    const [h2FontSize, setH2FontSize] = useState(template.edit.fontSizeTitle ? template.edit.fontSizeTitle : '');

    const [pFontSize, setPFontSize] = useState(template.edit.fontSizeItem ? template.edit.fontSizeItem :'');

    const [h2FontWeight, setH2FontWeight] = useState(template.edit.fontWeightTitle ? template.edit.fontWeightTitle : '');

    const [pFontWeight, setPFontWeight] = useState(template.edit.fontWeightItem ? template.edit.fontWeightItem : '');

    const [h2TextDecoration, setH2TextDecoration] = useState(template.edit.textDecorationTitle ? template.edit.textDecorationTitle : '');

    const [pTextDecoration, setPTextDecoration] = useState(template.edit.textDecorationText ? template.edit.textDecorationText : '');

    const [sectionStyles, setSectionStyles] = useState([]);
    
    const [articleStyles, setArticleStyles] = useState([]);

    const [pStyles, setPStyles] = useState([]);


    const [h2Styles, setH2Styles] = useState([]);

    const handleH2Change = (index) => (event) => {
        const newH2Values = [...h2Values];
        newH2Values[index] = event.target.value;
        setH2Values(newH2Values);
    };

    const handlePChange = (index) => (event) => {
        const newPValues = [...pValues];
        newPValues[index] = event.target.value;
        setPValues(newPValues);
    };

    const handleSectionBgColor = (event) => {
        setSectionBgColor(event.target.value);
    };
    const handleArticleBgColor = (event) => {
        setArticleBgColor(event.target.value);
    };

    const handleH2FontColor = (event) => {
        setH2FontColor(event.target.value);
    };
    const handlePFontColor = (event) => {
        setPFontColor(event.target.value);
    };

    const handleH2FontSizeChange = (event) => {
        setH2FontSize(`${event.target.value}px`);
    };
    
    const handlePFontSizeChange = (event) => {
        setPFontSize(`${event.target.value}px`);
    };

    const handleH2FontWeightChange = (event) => {
        setH2FontWeight(event.target.value);
    };
    
    const handlePFontWeightChange = (event) => {
        setPFontWeight(event.target.value);
    };

    const handleH2TextDecorationChange = (event) => {
        setH2TextDecoration(event.target.value);
    };
    
    const handlePTextDecorationChange = (event) => {
        setPTextDecoration(event.target.value);
    };

    const visualSection = useRef(null);
        useEffect(() => {
            if (visualSection.current && visualArticle.current) {
                const computedSectionStyles = window.getComputedStyle(visualSection.current);
                const computedArticleStyles = window.getComputedStyle(visualArticle.current);
                let widthValue;
                if (computedArticleStyles.flexDirection === 'row') {
                    widthValue = '100%';
                } else {
                    widthValue = computedSectionStyles.width;
                }

                setSectionStyles({
                    backgroundColor: computedSectionStyles.backgroundColor,
                    width: widthValue,
                    padding: computedSectionStyles.padding
                });
        }
    }, [SectionBgColor]);    

    

    const visualArticle = useRef(null);
    useEffect(() => {
        if (visualArticle.current) {
            const computedStyles = window.getComputedStyle(visualArticle.current);
            setArticleStyles({
                display: computedStyles.display,
                flexDirection: computedStyles.flexDirection,
                width: '100%',
                gap: computedStyles.gap,
                justifyContent: computedStyles.justifyContent
            });
        }
    }, [ArticleBgColor]);

    const visualH2 = useRef(null);
    useEffect(() => {
        if (visualH2.current) {
            const computedStyles = window.getComputedStyle(visualH2.current);
            setH2Styles({
                color: computedStyles.color,
                fontSize: computedStyles.fontSize,
                fontWeight: computedStyles.fontWeight,
                textDecoration: computedStyles.textDecoration
            });
        }
    }, [h2FontColor, h2FontSize, h2FontWeight, h2TextDecoration]);

    const visualP = useRef(null);
    useEffect(() => {
        if (visualP.current) {
            const computedStyles = window.getComputedStyle(visualP.current);
            setPStyles({
                color: computedStyles.color,
                fontSize: computedStyles.fontSize,
                fontWeight: computedStyles.fontWeight,
                textDecoration: computedStyles.textDecoration
            });
        }
    }, [pFontColor, pFontSize, pFontWeight, pTextDecoration]);

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
            {/* Asume que `children` es un array con al menos dos elementos, donde el primer elemento es tratado como un contenedor (ej. div) y el segundo como el título (ej. h2) */}
            <div className= {`${template.defaultContent.children[0]}`}>
                <p>{'<'}{template.defaultContent ? template.defaultContent.children[0] : null}{'>'}</p>
                {/* Aquí asumimos que querías un h2 basado en tu función handleH2Change */}
                <p className= {`${template.defaultContent.children[1]}`}>
                    {'<'}{template.defaultContent ? template.defaultContent.children[1] : null}{'>'}
                    <input type='text' onChange={handleH2Change(index)} maxLength={12} placeholder='Máximo 12 caracteres'/>
                    {'</'}{template.defaultContent ? template.defaultContent.children[1] : null}{'>'}
                </p>
                <p >
                            {'<'}{template.defaultContent ? template.defaultContent.grandson[0] : null}{'>'}
                            <input type='text' onChange={handlePChange(index)} maxLength={12} placeholder='Máximo 12 caracteres'/>
                            {'</'}{template.defaultContent ? template.defaultContent.grandson[0] : null}{'>'}
                        </p>
            
                <p>{'</'}{template.defaultContent ? template.defaultContent.children[0] : null}{'>'}</p>
            </div>
        </React.Fragment>
    ))}
    <p>{'</'}{template.elementType}{'>'}</p>
</div>

            <div className="styles-editor">
                <label htmlFor="sectionbgColor">
                    <p>Color de Fondo</p>
                    <input type="color" id='bgColor' onChange={handleSectionBgColor}/>
                </label>

                <label htmlFor="articlebgColor">
                    <p>Color de Fondo para Article</p>
                    <input type="color" id='bgColor' onChange={handleArticleBgColor}/>
                </label>
                
                <label htmlFor="colorTitle">
                    <p>Color de Letra para H2</p>
                    <input type="color" id='colorTitle' onChange={handleH2FontColor}/>
                </label>

                <label htmlFor="colorItem">
                    <p>Color de Letra para P</p>
                    <input type="color" id='colorItem' onChange={handlePFontColor}/>
                </label>
                
                <label htmlFor="fontSizeTitle">
                    Tamaño de Letra para H2
                    <input type="number" id="fontSizeTitle" onChange={handleH2FontSizeChange} />
                    </label>

                    <label htmlFor="fontSizeItem">
                    Tamaño de Letra para P
                    <input type="number" id="fontSizeItem" onChange={handlePFontSizeChange} />
                </label>
                
                <label htmlFor="fontWeightTitle">
                    <p>Negrita H2</p>
                    <div>
                    <input   type="checkbox" 
                        name='FontWeightTitle' 
                        value="bold" 
                        checked={h2FontWeight === "bold"}
                        onChange={(event) => {
                            const isChecked = event.target.checked;
                            const newValue = isChecked ? "bold" : "normal";
                            handleH2FontWeightChange(newValue)
                        }}/>
                    </div>                   
                </label>

                <label htmlFor="fontWeightItem">
                    <p>Negrita P</p>
                    <div>
                    <input   type="checkbox" 
                        name='FontWeightItem' 
                        value="bold" 
                        checked={pFontWeight === "bold"}
                        onChange={(event) => {
                            const isChecked = event.target.checked;
                            const newValue = isChecked ? "bold" : "normal";
                            handlePFontWeightChange(newValue)
                        }}/>
                    </div>
                    
                </label>


                
                <label htmlFor="textDecorationTitle">
                    <p>Subrayado H2</p>
                    <div>
                    <input   type="checkbox" 
                        name='textDecorationTitle' 
                        value="underline" 
                        checked={h2TextDecoration === "underline"}
                        onChange={(event) => {
                            const isChecked = event.target.checked;
                            const newValue = isChecked ? "underline" : "none";
                            handleH2TextDecorationChange(newValue);
                        }}/>
                    </div>
                    
                </label>

                <label htmlFor="textDecorationText">
                    <p>Subrayado P</p>
                    <div>
                    <input   type="checkbox" 
                        name='textDecorationText' 
                        value="underline" 
                        checked={pTextDecoration === "underline"}
                        onChange={(event) => {
                            const isChecked = event.target.checked;
                            const newValue = isChecked ? "underline" : "none";
                            handlePTextDecorationChange(newValue);
                        }}/>
                    </div>                    
                </label>
                
            </div>

            <div className="container-renderized_visual">
    <section className={template.defaultStyles[0]} style={{ backgroundColor:`${SectionBgColor}`}} ref={visualSection}>
        {Array.from({ length: template.defaultContent.countChildren }).map((_, index) => (
            <article className={template.defaultStyles[1]} style={{ backgroundColor:`${ArticleBgColor}`}} key={index} ref={visualArticle}>
                <h2 className={template.defaultStyles[2]} style={{ color:`${h2FontColor}` ,fontSize:`${h2FontSize}` ,fontWeight:`${h2FontWeight}`,textDecoration:`${h2TextDecoration}`,}}>{h2Values[index]}</h2><p className={template.defaultStyles[3]} style={{ color:`${pFontColor}`,fontSize:`${pFontSize}`, fontWeight:`${pFontWeight}`,textDecoration:`${pTextDecoration}`,}} key={`${index}-${index}`}>{pValues[index]}</p>
            </article>
        ))}
    </section>
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
                    <span>{'<'}{template.defaultContent ? template.defaultContent.children[0] : null}{'>'}</span>
                        <span> 
                            {'<' + (template.defaultContent ? template.defaultContent.children[1] : null) + '>'}
                            {h2Values[index]}
                            {'</' + (template.defaultContent ? template.defaultContent.children[1] : null) + '>'}
                        </span>
                        <span> 
                            {'<' + (template.defaultContent ? template.defaultContent.grandson[0] : null) + '>'}
                            {pValues[index]}
                            {'</' + (template.defaultContent ? template.defaultContent.grandson[0] : null) + '>'}
                        </span>
                        <span>{'</'}{template.defaultContent ? template.defaultContent.children[0] : null}{'>'}</span>
                    </React.Fragment>
                    ))}       
                     <span>{'</'}{template.elementType}{'>'}</span>
                </div>
            </div>
            <div className='container-renderized_css'>
                <div className='css-section'>
                    <div className='title-btn'>
                        <h4>Estilos del {'<section>'}</h4>
                        <button onClick={() => copyToClipboard('css-section')}>Copiar</button>
                    </div>
                    <div className='css' id='css-section'>
                        <span>.{template.defaultStyles[0]}{' {'}</span>
                        <span>background-color: {sectionStyles.backgroundColor};</span>
                        <span>width: {sectionStyles.width};</span>
                        <span>padding: {sectionStyles.padding};</span>
                        <span>{'}'}</span>
                    </div>
                </div>
                
                <div className='css-article 300px'>
                    <div className='title-btn'>
                        <h4>Estilos de la {'<article>'}</h4>
                        <button onClick={() => copyToClipboard('css-article')}>Copiar</button>
                    </div>
                    <div className='css' id='css-article'>
                        <span>.{template.defaultStyles[1]}{' {'}</span>
                        <span>display: {articleStyles.display};</span>
                        <span>flex-direction: {articleStyles.flexDirection};</span>
                        <span>justify-content: {articleStyles.justifyContent};</span>
                        <span>gap: {articleStyles.gap};</span>
                        <span>width: {articleStyles.width};</span>
                        <span>{'}'}</span>
                    </div>
                </div>
                
                <div className='css-h2'>
                    <div className='title-btn'>
                        <h4>Estilos de la {'<h2>'}</h4>
                        <button onClick={() => copyToClipboard('css-h2')}>Copiar</button>
                    </div>
                    <div className='css' id='css-h2'>
                        <span>.{template.defaultStyles[2]}{' {'}</span>
                        <span>color: {h2Styles.color};</span>
                        <span>font-size: {h2Styles.fontSize};</span>
                        <span>font-weight: {h2Styles.fontWeight};</span>
                        <span>text-decoration: {getFirstWord(h2Styles.textDecoration)};</span>
                        <span>{'}'}</span>
                    </div>
                </div>
                <div className='css-p'>
                    <div className='title-btn'>
                        <h4>Estilos de la {'<p>'}</h4>
                        <button onClick={() => copyToClipboard('css-p')}>Copiar</button>
                    </div>
                    <div className='css' id='css-p'>
                        <span>.{template.defaultStyles[3]}{' {'}</span>
                        <span>color: {pStyles.color};</span>
                        <span>font-size: {pStyles.fontSize};</span>
                        <span>font-weight: {pStyles.fontWeight};</span>
                        <span>text-decoration: {getFirstWord(pStyles.textDecoration)};</span>
                        <span>{'}'}</span>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default SectionComponent
