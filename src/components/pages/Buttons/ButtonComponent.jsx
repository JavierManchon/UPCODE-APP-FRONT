import { useEffect, useRef, useState } from "react";
import "./_buttonComponent.scss";

const ButtonComponent = ({ template }) => {
  const [buttonValue, setButtonValue] = useState(template.edit.text ? template.edit.text : 'Enviar');
  const [bgColor, setBgColor] = useState(template.edit.bgColorButton ? template.edit.bgColorButton : '');
  const [fontColor, setFontColor] = useState(template.edit.colorText ? template.edit.colorText : '');
  const [fontSize, setFontSize] = useState(template.edit.fontSizeText ? template.edit.fontSizeText : '');
  const [fontWeight, setFontWeight] = useState(template.edit.fontWeightText ? template.edit.fontWeightText : '');
  const [borderRadius, setBorderRadius] = useState(template.edit.borderRadius ? template.edit.borderRadius : '');
  const [buttonStyles, setButtonStyles] = useState({});
  const [hoverStyles, setHoverStyles] =useState({});

  const handleButtonChange = (event) => {
    setButtonValue(event.target.value);
  };

  const handleBgColor = (event) => {
    setBgColor(event.target.value);
  };

  const handleFontColor = (event) => {
    setFontColor(event.target.value);
  };

  const handleFontSize = (event) => {
    setFontSize(`${event.target.value}px`);
  };

  const handleFontWeight = (event) => {
    setFontWeight(event.target.value);
  };

  function parseCSS(cssText) {
    const pairs = cssText.split(';');

    const styles = {};

    pairs.forEach(pair => {
        const keyValue = pair.split(':');

        const key = keyValue[0].trim().replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
        const value = keyValue[1] ? keyValue[1].trim() : '';

        if (key) {
            styles[key] = value;
        }
    });
    setHoverStyles(styles);
    return styles;
  }

  console.log(hoverStyles);

  const visualButton = useRef(null);
  useEffect(() => {
    if (visualButton.current) {
      const computedButtonStyles = window.getComputedStyle(visualButton.current);

      setButtonStyles({
        backgroundColor: computedButtonStyles.backgroundColor,
        padding: computedButtonStyles.padding,
        color: computedButtonStyles.color,
        fontSize: computedButtonStyles.fontSize,
        fontWeight: computedButtonStyles.fontWeight,
        borderRadius: computedButtonStyles.borderRadius,
        border: computedButtonStyles.border,
        outline: computedButtonStyles.outline,
        cursor: computedButtonStyles.cursor
      });
    }
  
    let i,j;
    const sel = new RegExp(`button\\.${template.defaultStyles[0]}:hover`);
    for(i = 0; i < document.styleSheets.length; ++i){
      for(j = 0; j < document.styleSheets[i].cssRules.length; ++j){    
          if(sel.test(document.styleSheets[i].cssRules[j].selectorText)){
              parseCSS(document.styleSheets[i].cssRules[j].style.cssText)
          }
      }
    }

    
  }, [bgColor, fontColor, fontSize, fontWeight, borderRadius]);

  const copyToClipboard = (elementId) => {
    const element = document.getElementById(elementId);
    const range = document.createRange();
    range.selectNodeContents(element);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand("copy");
    selection.removeAllRanges();
  };

  return (
    <div className="container-pages-default-styles">
      <div className="container-editor">
        <p>{"<" + template.elementType + ' type="' + template.defaultContent.tagInfo + '"' + ">"}</p>
        <input
          type="text"
          onChange={handleButtonChange}
          maxLength={12}
          placeholder="Máximo 12 caracteres"
        />
        <p>{"</" + template.elementType + ">"}</p>
      </div>

      <div className="styles-editor">
        <label htmlFor="bgColor">
          <p>Color de Fondo</p>
          <input
            type="color"
            id="bgColor"
            onChange={handleBgColor}
          />
        </label>

        <label htmlFor="fontColor">
          <p>Color de Letra</p>
          <input
            type="color"
            id="fontColor"
            onChange={handleFontColor}
          />
        </label>

        <label htmlFor="fontSize">
          <p>Tamaño de Letra</p>
          <input
            type="number"
            id="fontSize"
            min={12}
            max={20}
            onChange={handleFontSize}
          />
        </label>

        <label htmlFor="fontWeight">
          <p>Negrita</p>
          <div>
          <input 
            type="checkbox" 
            name='fontWeight' 
            value="bold" 
            checked={fontWeight === "bold"} // Verifica si el estado local es "bold"
            onChange={(event) => {
                const isChecked = event.target.checked;
                const newValue = isChecked ? "bold" : "normal";
                setFontWeight(newValue); // Actualiza el estado local
            }}
          />
          </div>
        </label>
      </div>

      <div className="container-renderized_visual">
        <button
          type={template.defaultContent.tagInfo}
          className={template.defaultStyles[0]}
          style={{
            backgroundColor: bgColor,
            color: fontColor,
            fontSize: fontSize,
            fontWeight: fontWeight,
            borderRadius: borderRadius,
            border: template.edit.border,
            outline: template.edit.outline,
            padding: template.edit.padding
          }}
          ref={visualButton}
        >
          {buttonValue}
        </button>
      </div>

      <div className="container-renderized_html">
        <div className="title-btn">
          <h4>HTML</h4>
          <button onClick={() => copyToClipboard("html")}>Copiar</button>
        </div>
        <div id="html" className="html">
          <span>{"<" + template.elementType + ' type="' + template.defaultContent.tagInfo + '"' + ' class="' + template.defaultStyles[0] + '">'}</span>
          <span>{buttonValue}</span>
          <span>{"</" + template.elementType + ">"}</span>
        </div>
      </div>

      <div className="container-renderized_css">
        <div className="css-btn">
          <div className="title-btn">
            <h4>Estilos del {'<' + template.elementType + '>'}</h4>
            <button onClick={() => copyToClipboard("css-btn")}>Copiar</button>
          </div>
          <div className="css" id="css-btn">
            <p>.{template.defaultStyles[0]} {"{"}</p>
            <p>background-color: {buttonStyles.backgroundColor};</p>
            <p>color: {buttonStyles.color};</p>
            <p>font-size: {buttonStyles.fontSize};</p>
            <p>font-weight: {buttonStyles.fontWeight === '700' ? 'bold' : 'normal'};</p>
            <p>border: {buttonStyles.border};</p>
            <p>border-radius: {buttonStyles.borderRadius};</p>
            <p>padding: {buttonStyles.padding};</p>
            <p>{"}"}</p>
            <div className="container-hover">
              <p>.{template.defaultStyles[0]}:hover {"{"}</p>
              <p>transition: {hoverStyles.transition ? hoverStyles.transition : null}</p>
              <p>box-shadow: {hoverStyles.boxShadow ? hoverStyles.boxShadow : null}</p>
              <p>transform: {hoverStyles.transform ? hoverStyles.transform : null}</p>
              <p>{"}"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ButtonComponent;
