import React, { useEffect, useRef, useState } from "react";
import "./_buttonComponent.scss";

const ButtonComponent = ({ template }) => {
  const [buttonValue, setButtonValue] = useState('');
  const [buttonValueEdit, setButtonValueEdit] = useState(template.edit.text);
  const [bgColor, setBgColor] = useState("");
  const [bgColorEdit, setBgColorEdit] = useState(template.edit.bgColor);
  const [fontColor, setFontColor] = useState("");
  const [fontColorEdit, setFontColorEdit] = useState(template.edit.fontColor);
  const [fontSize, setFontSize] = useState("");
  const [fontSizeEdit, setFontSizeEdit] = useState(template.edit.fontSize);
  const [fontWeight, setFontWeight] = useState("");
  const [fontWeightEdit, setFontWeightEdit] = useState(
    template.edit.fontWeight
  );
  const [borderRadius, setBorderRadius] = useState("");
  const [borderRadiusEdit, setBorderRadiusEdit] = useState(template.edit.borderRadius);
  const [buttonStyles, setButtonStyles] = useState({});

  const handleButtonChange = (event) => {
    setButtonValue(event.target.value);
  };

  const handleButtonEditChange = (event) => {
    setButtonValueEdit(event.target.value);
  };

  const handleBgColor = (event) => {
    setBgColor(event.target.value);
  };

  const handleBgColorEdit = (event) => {
    setBgColorEdit(event.target.value);
  };

  const handleFontColor = (event) => {
    setFontColor(event.target.value);
  };

  const handleFontColorEdit = (event) => {
    setFontColorEdit(event.target.value);
  };

  const handleFontSize = (event) => {
    setFontSize(`${event.target.value}px`);
  };

  const handleFontSizeEdit = (event) => {
    setFontSizeEdit(`${event.target.value}px`);
  };

  const handleFontWeight = (event) => {
    setFontWeight(event.target.value);
  };

  const handleFontWeightEdit = (event) => {
    setFontWeightEdit(event.target.value);
  };

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
      });
    }
  }, [bgColor, bgColorEdit, fontColor, fontColorEdit, fontSize, fontSizeEdit, fontWeight, fontWeightEdit, borderRadius, borderRadiusEdit]);

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

  const getSecondWord = (text) => {
    if (text) {
      const words = text.split(' ');
      return words.length > 1 ? words[3] : '';
    }
    return null
  };

  return (
    <div className="container-pages-default-styles">
      <div className="container-editor">
        <p>
          {"<"}
          {template.elementType}
          {">"}
        </p>
        <input
          type="text"
          onChange={buttonValueEdit ? handleButtonChange : handleButtonEditChange }
          maxLength={12}
          placeholder="Máximo 12 caracteres"
        />     
        <p>
          {"</"}
          {template.elementType}
          {">"}
        </p>
      </div>

      <div className="styles-editor">
        <label htmlFor="bgColor">
          <p>Color de Fondo</p>
          <input
            type="color"
            id="bgColor"
            onChange={
              !template.edit.bgColor ? handleBgColor : handleBgColorEdit
            }
          />
        </label>

        <label htmlFor="fontColor">
          <p>Color de Letra</p>
          <input
            type="color"
            id="fontColor"
            onChange={
              !template.edit.bgColor ? handleFontColor : handleFontColorEdit
            }
          />
        </label>

        <label htmlFor="fontSize">
          <p>Tamaño de Letra</p>
          <input
            type="number"
            id="fontSize"
            min={12}
            max={20}
            onChange={
              !template.edit.fontSize ? handleFontSize : handleFontSizeEdit
            }
          />
        </label>

        <label htmlFor="fontWeight">
          <p>Negrita</p>
          <div>
            <input
              type="radio"
              name="fontWeight"
              value="bold"
              onChange={
                !template.edit.fontWeight
                  ? handleFontWeight
                  : handleFontWeightEdit
              }
            />
            <input
              type="radio"
              name="fontWeight"
              value="normal"
              onChange={
                !template.edit.fontWeight
                  ? handleFontWeight
                  : handleFontWeightEdit
              }
            />
          </div>
        </label>
      </div>

      <div className="container-renderized_visual">
        <button
          type={template.defaultContent.type}
          className={template.defaultStyles[0]}
          style={{
            backgroundColor: template.edit.bgColor ? bgColorEdit : bgColor,
            color: template.edit.fontColor ? fontColorEdit : fontColor,
            fontSize: template.edit.fontSize ? fontSizeEdit : fontSize,
            fontWeight: template.edit.fontWeight ? fontWeightEdit : fontWeight,
            borderRadius: template.edit.borderRadius ? borderRadiusEdit : borderRadius,
            border: template.edit.border,
            outline: template.edit.outline
          }}
          ref={visualButton}
        >
          {buttonValue ? buttonValue : buttonValueEdit}
        </button>
      </div>

      <div className="container-renderized_html">
        <div className="title-btn">
          <h4>HTML</h4>
          <button onClick={() => copyToClipboard("html")}>Copiar</button>
        </div>
        <div id="html" className="html">
          <span>
            {"<"}
            {template.elementType}
            {' class="'}
            {template.defaultStyles[0]}
            {'"'}
            {">"}
          </span>
          {buttonValue ? <span>{buttonValue}</span> : <span>{buttonValueEdit}</span>}
          <span>
            {"</"}
            {template.elementType}
            {">"}
          </span>
        </div>
      </div>
      <div className="container-renderized_css">
        <div className="css-btn">
          <div className="title-btn">
            <h4>Estilos del {'<'}{template.elementType}{'>'}</h4>
            <button onClick={() => copyToClipboard("css-button")}>Copiar</button>
          </div>
          <div className="css" id="css-btn">
            <span>
              .{template.defaultStyles[0]}
              {" {"}
            </span>
            <span>background-color: {buttonStyles.backgroundColor};</span>
            <span>color: {buttonStyles.color};</span>
            <span>font-size: {buttonStyles.fontSize};</span>
            <span>font-weight: {buttonStyles.fontWeight};</span>
            <span>border: {buttonStyles.border};</span>
            <span>outline: {getSecondWord(buttonStyles.outline)};</span>
            <span>{"}"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ButtonComponent;
