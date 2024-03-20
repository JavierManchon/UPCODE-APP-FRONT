import React, { useEffect, useState, useRef } from 'react'
import './_formComponent.scss';
import '../../../css/app.scss';

const FormComponent = ({ template }) => {
    const [labelValues, setLabelValues] = useState(() => {
        if (template.edit && template.edit.text > 0) {
            return [...template.edit.text];
        } else {
            return Array.from({ length: template.defaultContent.countChildren }, () =>
                Array.from({ length: template.defaultContent.countGrandson }, () => 'Item:')
            );
        }
    });
    const [buttonValue, setButtonValue] = useState('Botón');
    const [buttonValueEdit, setButtonValueEdit] = useState(template.edit.textItem);

    const [bgFormColor, setBgFormColor] = useState('');
    const [bgFormColorEdit, setBgFormColorEdit] = useState(template.edit.bgColorForm);

    const [labelFontColor, setLabelFontColor] = useState('');
    const [labelFontColorEdit, setLabelFontColorEdit] = useState(template.edit.colorText);

    const [labelFontSize, setLabelFontSize] = useState('');
    const [labelFontSizeEdit, setLabelFontSizeEdit] = useState(template.edit.fontSizeText);

    const [labelFontWeight, setLabelFontWeight] = useState('');
    const [labelFontWeightEdit, setLabelFontWeightEdit] = useState(template.edit.fontWeightText);

    const [textDecoration, setTextDecoration] = useState('');
    const [textDecorationEdit, setTextDecorationEdit] = useState(template.edit.textDecorationText);

    const [bgButtonColor, setBgButtonColor] = useState('');
    const [bgButtonColorEdit, setBgButtonColorEdit] = useState(template.edit.bgColorButton);

    const [buttonFontColor, setButtonFontColor] = useState('');
    const [buttonFontColorEdit, setButtonFontColorEdit] = useState(template.edit.colorItem);

    const [buttonFontSize, setButtonFontSize] = useState('');
    const [buttonFontSizeEdit, setButtonFontSizeEdit] = useState(template.edit.fontSizeItem);

    const [buttonFontWeight, setButtonFontWeight] = useState('');
    const [buttonFontWeightEdit, setButtonFontWeightEdit] = useState(template.edit.fontWeightItem);

    const [buttonBorderRadius, setButtonBorderRadius] = useState('');
    const [buttonBorderRadiusEdit, setButtonBorderRadiusEdit] = useState(template.edit.borderRadius);

    const [formStyles, setFormStyles] = useState({});
    const [labelStyles, setLabelStyles] = useState({});
    const [buttonStyles, setButtonStyles] = useState({});
    const [divStyles, setDivStyles] = useState({});

    const handleLabelChange = (index, childIndex) => (event) => {
        if (index >= 0 && index < labelValues.length && childIndex >= 0 && childIndex < labelValues[index].length) {
            const newLabelValues = [...labelValues];
            newLabelValues[index][childIndex] = event.target.value;
            setLabelValues(newLabelValues);
        } else {
            console.error("Índices fuera de rango:", index, childIndex);
        }
    };

    const handleButtonChange = (event) => {
        setButtonValue(event.target.value);
    };

    const handleButtonChangeEdit = (event) => {
        setButtonValueEdit(event.target.value);
    };

    const handleBgFormColor = (event) => {
        setBgFormColor(event.target.value);
    };

    const handleBgFormColorEdit = (event) => {
        setBgFormColorEdit(event.target.value);
    };

    const handleLabelFontColor = (event) => {
        setLabelFontColor(event.target.value)
    }

    const handleLabelFontColorEdit = (event) => {
        setLabelFontColorEdit(event.target.value)
    }

    const handleLabelFontSize = (event) => {
        setLabelFontSize(`${event.target.value}px`)
    }

    const handleLabelFontSizeEdit = (event) => {
        setLabelFontSizeEdit(`${event.target.value}px`)
    }

    const handleLabelFontWeight = (event) => {
        setLabelFontWeight(event.target.value)
    }

    const handleLabelFontWeightEdit = (event) => {
        setLabelFontWeightEdit(event.target.value)
    }

    const handleTextDecoration = (event) => {
        setTextDecoration(event.target.value)
    }

    const handleTextDecorationEdit = (event) => {
        setTextDecorationEdit(event.target.value)
    }

    const handleButtonFontWeight = (event) => {
        setButtonFontWeight(event.target.value)
    }

    const handleButtonFontWeightEdit = (event) => {
        setButtonFontWeightEdit(event.target.value)
    }

    const handleBgButtonColor = (event) => {
        setBgButtonColor(event.target.value)
    }

    const handleBgButtonColorEdit = (event) => {
        setBgButtonColorEdit(event.target.value)
    }

    const handleButtonFontColor = (event) => {
        setButtonFontColor(event.target.value)
    }

    const handleButtonFontColorEdit = (event) => {
        setButtonFontColorEdit(event.target.value)
    }

    const handleButtonFontSize = (event) => {
        setButtonFontSize(`${event.target.value}px`)
    }

    const handleButtonFontSizeEdit = (event) => {
        setButtonFontSizeEdit(`${event.target.value}px`)
    }

    const handleButtonBorderRadius = (event) => {
        setButtonBorderRadius(Number(event.target.value));
    };

    const handleButtonBorderRadiusEdit = (event) => {
        setButtonBorderRadiusEdit(Number(event.target.value));
    };
    

    const visualForm = useRef(null);
        useEffect(() => {
            if (visualForm.current) {
                const computedFormStyles = window.getComputedStyle(visualForm.current);

                setFormStyles({
                    backgroundColor: computedFormStyles.backgroundColor,
                    width: "200px",
                    padding: computedFormStyles.padding,
                    display: computedFormStyles.display,
                    flexDirection: computedFormStyles.flexDirection,
                    justifyContent: computedFormStyles.justifyContent,
                    gap: computedFormStyles.gap
                });
        }
    }, [bgFormColor, bgFormColorEdit]);    

    

    const visualLabel = useRef(null);
    useEffect(() => {
        if (visualLabel.current) {
            const computedLabelStyles = window.getComputedStyle(visualLabel.current);
            setLabelStyles({
                color: computedLabelStyles.color,
                fontSize: computedLabelStyles.fontSize,
                fontWeight: computedLabelStyles.fontWeight,
                textDecoration: computedLabelStyles.textDecoration
            });
        }
    }, [labelFontColor, labelFontColorEdit, labelFontSize, labelFontSizeEdit, labelFontWeight, labelFontWeightEdit, textDecoration, textDecorationEdit]);

    const visualButton = useRef(null);
    useEffect(() => {
        if (visualButton.current) {
            const computedButtonStyles = window.getComputedStyle(visualButton.current);
            setButtonStyles({
                color: computedButtonStyles.color,
                fontSize: computedButtonStyles.fontSize,
                fontWeight: computedButtonStyles.fontWeight,
                backgroundColor: computedButtonStyles.backgroundColor,
                borderRadius: computedButtonStyles.borderRadius
            });
        }
    }, [bgButtonColor, bgButtonColorEdit, buttonFontColor, buttonFontColorEdit, buttonFontSize, buttonFontSizeEdit, buttonFontWeight, buttonFontWeightEdit, buttonBorderRadius, buttonBorderRadiusEdit]);

    const visualDiv = useRef(null);
    useEffect(() => {
        if (visualDiv.current) {
            const computedDivStyles = window.getComputedStyle(visualDiv.current);

            setDivStyles({
                display: computedDivStyles.display,
                flexDirection: computedDivStyles.flexDirection,
                marginBottom: computedDivStyles.marginBottom
            });
        }
    }, []);  
    

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
                    <React.Fragment key={`editor_${index}`}>
                        <p>{'<div>'}</p>
                        {Array.from({ length: template.defaultContent.countGrandson }).map((_, i) => (
                            <React.Fragment key={`editor_in_${i}`}>
                                <p>
                                    {'<'}{template.defaultContent ? template.defaultContent.children[0] : null}{'>'}
                                    <input type='text' onChange={handleLabelChange(index, i)} maxLength={12} placeholder='Máximo 12 caracteres'/>
                                    {'</'}{template.defaultContent ? template.defaultContent.children[0] : null}{'>'}
                                </p>
                                <p>
                                    {'<'}{template.defaultContent ? template.defaultContent.children[1] : null}{'>'}
                                    {'</'}{template.defaultContent ? template.defaultContent.children[1] : null}{'>'}
                                </p>
                            </React.Fragment>
                        ))}
                        <p>{'</div>'}</p>
                    </React.Fragment>
                ))}
                <p>
                    {'<'}{template.defaultContent ? template.defaultContent.grandson[0] : null}{'>'}
                    <input type='text' onChange={!template.edit.textItem ? handleButtonChange : handleButtonChangeEdit} maxLength={12} placeholder='Máximo 12 caracteres'/>
                    {'</'}{template.defaultContent ? template.defaultContent.grandson[0] : null}{'>'}
                </p>
                <p>{`</${template.elementType}>`}</p>
            </div>

            <div className="styles-editor">
                <label htmlFor="bgFormColor">
                    <p>Color de Fondo Form</p>
                    <input type="color" id='bgFormColor' onChange={!template.edit.bgFormColor ? handleBgFormColor : handleBgFormColorEdit}/>
                </label>
                
                <label htmlFor="labelFontColor">
                    <p>Color de Letra del Label</p>
                    <input type="color" id='labelFontColor' onChange={!template.edit.colorText ? handleLabelFontColor : handleLabelFontColorEdit}/>
                </label>
                
                <label htmlFor="labelFontSize">
                    <p>Tamaño de Letra del Label</p>
                    <input type="number" id='labelFontSize' min={12} max={20} onChange={!template.edit.fontSizeText ? handleLabelFontSize : handleLabelFontSizeEdit}/>
                </label>
                
                <label htmlFor="labelFontWeight">
                    <p>Negrita del Label</p>
                    <div>
                    <input 
                        type="checkbox" 
                        name='labelFontWeight' 
                        value="bold" 
                        checked={template.edit.fontWeightText ? labelFontWeightEdit === "bold" : labelFontWeight === "bold"}
                        onChange={(event) => {
                            const isChecked = event.target.checked;
                            const newValue = isChecked ? "bold" : "normal";
                            if (!template.edit.fontWeightText) {
                                setLabelFontWeight(newValue);
                            } else {
                                setLabelFontWeightEdit(newValue);
                            }
                        }}
                    />
                    </div>
                </label>
                
                <label htmlFor="textDecoration">
                    <p>Subrayado del Label</p>
                    <div>
                    <input 
                        type="checkbox" 
                        name='textDecoration' 
                        value="underline" 
                        checked={template.edit.textDecorationText ? textDecorationEdit === "undeline" : textDecoration === "underline"}
                        onChange={(event) => {
                            const isChecked = event.target.checked;
                            const newValue = isChecked ? "underline" : "none";
                            if (!template.edit.textDecorationText) {
                                setTextDecoration(newValue);
                            } else {
                                setTextDecorationEdit(newValue);
                            }
                        }}
                    />
                    </div>
                </label>

                <label htmlFor="bgButtonColor">
                    <p>Color de Fondo Button</p>
                    <input type="color" id='bgButtonColor' onChange={!template.edit.bgColorButton ? handleBgButtonColor : handleBgButtonColorEdit}/>
                </label>

                <label htmlFor="buttonFontColor">
                    <p>Color de Letra del Button</p>
                    <input type="color" id='buttonFontColor' onChange={!template.edit.colorItem ? handleButtonFontColor : handleButtonFontColorEdit}/>
                </label>

                <label htmlFor="buttonFontSize">
                    <p>Tamaño de Letra del Button</p>
                    <input type="number" id='buttonFontSize' min={12} max={20} onChange={!template.edit.fontSizeItem ? handleButtonFontSize : handleButtonFontSizeEdit}/>
                </label>

                <label htmlFor="buttonFontWeight">
                    <p>Negrita del Button</p>
                    <div>
                    <input 
                        type="checkbox" 
                        name='buttonFontWeight' 
                        value="bold" 
                        checked={template.edit.fontWeightItem ? buttonFontWeightEdit === "bold" : buttonFontWeight === "bold"}
                        onChange={(event) => {
                            const isChecked = event.target.checked;
                            const newValue = isChecked ? "bold" : "normal";
                            if (!template.edit.fontWeightItem) {
                                setButtonFontWeight(newValue);
                            } else {
                                setButtonFontWeightEdit(newValue);
                            }
                        }}
                    />
                    </div>
                </label>

                <label htmlFor="buttonBorderRadius">
                    <p>Border Radius del Button</p>
                    <input type="number" id='buttonBorderRadius' onChange={!template.edit.borderRadius ? handleButtonBorderRadius : handleButtonBorderRadiusEdit}/>
                </label>
                
            </div>

            <div className="container-renderized_visual">
                <form className={template.defaultStyles[0]} style={{
                     backgroundColor: !template.edit.bgColorForm ? bgFormColor : bgFormColorEdit
                    }} ref={visualForm}>
                    {Array.from({ length: template.defaultContent.countChildren }).map((_, index) => (
                        <React.Fragment key={`renderized_${index}`}>
                        <div key={`child_${index}`} className='form-div' ref={visualDiv}>
                            {Array.from({ length: template.defaultContent.countGrandson }).map((_, i) => (
                                <React.Fragment key={`visual_${index}_${i}`}>
                                    <label className={template.defaultStyles[1]} htmlFor={`id${index}_${i}`} style={{
                                            color: !template.edit.colorText ? labelFontColor : labelFontColorEdit,
                                            fontSize: !template.edit.fontSizeText ? labelFontSize : labelFontSizeEdit, 
                                            fontWeight: !template.edit.fontWeightText ? labelFontWeight : labelFontWeightEdit, 
                                            textDecoration: !template.edit.textDecoration ? textDecoration : textDecorationEdit
                                        }} ref={visualLabel}>{labelValues[index][i]}</label>
                                    <input className={template.defaultStyles[2]} key={`visual_input_${index}_${i}`} id={`id${index}_${i}`} name={`id${index}_${i}`} type={template.defaultContent.type} />
                                </React.Fragment>
                            ))}
                        </div>
                        </React.Fragment>
                    ))}
                    <button className={template.defaultStyles[3]} style={{ 
                        backgroundColor: !template.edit.bgColorButton ? bgButtonColor : bgButtonColor, 
                        fontSize: !template.edit.fontSizeText ? buttonFontSize : buttonFontSizeEdit, 
                        color: !template.edit.colorText ? buttonFontColor : buttonFontColorEdit, 
                        fontWeight: !template.edit.fontWeightText ? buttonFontWeight : buttonFontWeightEdit, 
                        borderRadius: !template.edit.borderRadius ? (typeof buttonBorderRadius === 'number' ? `${buttonBorderRadius}px` : buttonBorderRadius) : (typeof buttonBorderRadiusEdit === 'number' ? `${buttonBorderRadiusEdit}px` : buttonBorderRadiusEdit) }} ref={visualButton}>{!template.edit.textItem ? buttonValue : buttonValueEdit}</button>
                </form>
            </div>

            <div className='container-renderized_html'>
                <div className='title-btn'>
                    <h4>HTML</h4>
                    <button onClick={() => copyToClipboard('html')}>Copiar</button>
                </div>
                <div id='html' className='html'>
                    <span>{'<'}{template.elementType}{` class=${template.defaultStyles[0]} action="" method="POST">`}</span>
                    {Array.from({ length: template.defaultContent.countChildren }).map((_, index) => (
                    <React.Fragment key={`html_${index}`}>
                        <span>{'<div>'}</span>
                        {Array.from({ length: template.defaultContent.countGrandson }).map((_, i) => (
                            <React.Fragment key={`html_in_${i}`}>
                                    <span> 
                                        {'<' + (template.defaultContent ? template.defaultContent.children[0] : null) + ` for=id${index + 1}>`}
                                        {labelValues[index][i]}
                                        {'</' + (template.defaultContent ? template.defaultContent.children[0] : null) + '>'}
                                    </span>
                                    <span> 
                                        {'<' + (template.defaultContent ? template.defaultContent.children[1] : null) + ` type=${template.defaultContent.type} id=id${index + 1}_${i + 1} name=id${index + 1}>`}
                                        {'</' + (template.defaultContent ? template.defaultContent.children[1] : null) + '>'}
                                    </span>
                            </React.Fragment>
                        ))}
                        <span>{'</div>'}</span>
                    </React.Fragment>
                    ))}
                    <span>{'<'}{template.defaultContent ? template.defaultContent.grandson[0] : null}{' type="submit">'}{!template.edit.textItem ? buttonValue : buttonValueEdit}
                    {'</'}{template.defaultContent ? template.defaultContent.grandson[0] : null}{'>'}</span>
                    <span>{'</'}{template.elementType}{'>'}</span>
                </div>
            </div>

            <div className='container-renderized_css'>
                <div className='css-nav'>
                    <div className='title-btn'>
                        <h4>Estilos del {'<form>'}</h4>
                        <button onClick={() => copyToClipboard('css-form')}>Copiar</button>
                    </div>
                    <div className='css' id='css-form'>
                        <span>.{template.defaultStyles[0]}{' {'}</span>
                        <span>background-color: {formStyles.backgroundColor};</span>
                        <span>width: {formStyles.width};</span>
                        <span>padding: {formStyles.padding};</span>
                        <span>display: {formStyles.display};</span>
                        <span>flex-direction: {formStyles.flexDirection};</span>
                        <span>justify-content: {formStyles.justifyContent};</span>
                        <span>gap: {formStyles.gap};</span>
                        <span>{'}'}</span>
                    </div>
                </div>

                <div className='css-ul'>
                    <div className='title-btn'>
                        <h4>Estilos del {'<div>'}</h4>
                        <button onClick={() => copyToClipboard('css-div')}>Copiar</button>
                    </div>
                    <div className='css' id='css-div'>
                        <span>.{template.defaultStyles[4]}{' {'}</span>
                        <span>display: {divStyles.display};</span>
                        <span>flex-direction: {divStyles.flexDirection};</span>
                        <span>margin-bottom: {divStyles.marginBottom};</span>
                        <span>{'}'}</span>
                    </div>
                </div>
                
                <div className='css-ul'>
                    <div className='title-btn'>
                        <h4>Estilos de la {'<label>'}</h4>
                        <button onClick={() => copyToClipboard('css-label')}>Copiar</button>
                    </div>
                    <div className='css' id='css-label'>
                        <span>.{template.defaultStyles[1]}{' {'}</span>
                        <span>color: {labelStyles.color};</span>
                        <span>font-size: {labelStyles.fontSize};</span>
                        <span>font-weight: {labelStyles.fontWeight};</span>
                        <span>text-decoration: {getFirstWord(labelStyles.textDecoration)};</span>
                        <span>{'}'}</span>
                    </div>
                </div>
                
                <div className='css-li'>
                    <div className='title-btn'>
                        <h4>Estilos de la {'<button>'}</h4>
                        <button onClick={() => copyToClipboard('css-button')}>Copiar</button>
                    </div>
                    <div className='css' id='css-button'>
                        <span>.{template.defaultStyles[3]}{' {'}</span>
                        <span>background-color: {buttonStyles.backgroundColor};</span>
                        <span>color: {buttonStyles.color};</span>
                        <span>font-size: {buttonStyles.fontSize};</span>
                        <span>font-weight: {buttonStyles.fontWeight};</span>
                        <span>border-radius: {buttonStyles.borderRadius};</span>
                        <span>{'}'}</span>
                    </div>
                </div>
            </div> 
        </div>
    )
}

export default FormComponent
