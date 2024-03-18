import React, { useEffect, useRef, useState } from "react";
import "./_footerComponent.scss";

const FooterComponent = ({ template }) => {
    const [liValues, setLiValues] = useState(() => {
        if (template.edit && template.edit.text) {
          return [...template.edit.text];
        } else {
          return Array.from({ length: template.defaultContent.count }, () => "Item");
        }
      });
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
      const [textDecoration, setTextDecoration] = useState("");
      const [textDecorationEdit, setTextDecorationEdit] = useState(
        template.edit.textDecoration
      );
      const [navStyles, setNavStyles] = useState([]);
      const [ulStyles, setUlStyles] = useState([]);
      const [liStyles, setLiStyles] = useState([]);
      const [aTag, setATag] = useState(false);

  const handleLiChange = (index) => (event) => {
    const newLiValues = [...liValues];
    newLiValues[index] = event.target.value;
    setLiValues(newLiValues);
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

  const handleTextDecoration = (event) => {
    setTextDecoration(event.target.value);
  };

  const handleTextDecorationEdit = (event) => {
    setTextDecorationEdit(event.target.value);
  };

  const visualNav = useRef(null);
  useEffect(() => {
    if (visualNav.current && visualUl.current) {
      const computedNavStyles = window.getComputedStyle(visualNav.current);

      setNavStyles({
        backgroundColor: computedNavStyles.backgroundColor,
        width: "100%",
        padding: computedNavStyles.padding,
      });
    }
  }, [bgColor, bgColorEdit]);

  const visualUl = useRef(null);
  useEffect(() => {
    if (visualUl.current) {
      const computedStyles = window.getComputedStyle(visualUl.current);
      setUlStyles({
        display: computedStyles.display,
        flexDirection: computedStyles.flexDirection,
        width: "100%",
        gap: computedStyles.gap,
        justifyContent: computedStyles.justifyContent,
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
        textDecoration: computedStyles.textDecoration,
      });
    }
  }, [
    fontColor,
    fontColorEdit,
    fontSize,
    fontSizeEdit,
    fontWeight,
    fontWeightEdit,
    textDecoration,
    textDecorationEdit,
  ]);

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
    document.execCommand("copy");
    selection.removeAllRanges();
  };

  const handleATag = () => {
    setATag(!aTag);
  };

  return (
    <div className="container-pages-default-styles">
      <div className="container-editor">
        <p>
          {"<"}
          {template.elementType}
          {">"}
        </p>
        <p>
          {"<"}
          {template.defaultContent ? template.defaultContent.children : null}
          {">"}
        </p>
        {Array.from({ length: template.defaultContent.count }).map(
          (_, index) => (
            <React.Fragment key={index}>
              <p>
                {"<"}
                {template.defaultContent ? template.defaultContent.items : null}
                {">"}
                {aTag ? '<a href="">' : null}
                <input
                  type="text"
                  onChange={handleLiChange(index)}
                  maxLength={12}
                  placeholder="Máximo 12 caracteres"
                />
                {aTag ? "</a>" : null}
                {"</"}
                {template.defaultContent ? template.defaultContent.items : null}
                {">"}
              </p>
            </React.Fragment>
          )
        )}
        <p>
          {"</"}
          {template.defaultContent ? template.defaultContent.children : null}
          {">"}
        </p>
        <p>
          {"</"}
          {template.elementType}
          {">"}
        </p>
      </div>

      <button onClick={handleATag}>Añadir enlace a {"li"}</button>

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

        <label htmlFor="textDecoration">
          <p>Subrayado</p>
          <div>
            <input
              type="radio"
              name="textDecoration"
              value="underline"
              onChange={
                !template.edit.textDecoration
                  ? handleTextDecoration
                  : handleTextDecorationEdit
              }
            />
            <input
              type="radio"
              name="textDecoration"
              value="none"
              onChange={
                !template.edit.textDecoration
                  ? handleTextDecoration
                  : handleTextDecorationEdit
              }
            />
          </div>
        </label>
      </div>

      <div className="container-renderized_visual">
        <nav
          className={template.defaultStyles[0]}
          style={{
            backgroundColor: template.edit.bgColor
              ? `${bgColorEdit}`
              : `${bgColor}`,
          }}
          ref={visualNav}
        >
          <ul className={template.defaultStyles[1]} ref={visualUl}>
            {liValues.map((value, index) => (
              <li
                className={template.defaultStyles[2]}
                key={index}
                style={{
                  color: template.edit.fontColor
                    ? `${fontColorEdit}`
                    : `${fontColor}`,
                  fontSize: template.edit.fontSize
                    ? `${fontSizeEdit}`
                    : `${fontSize}`,
                  fontWeight: template.edit.fontWeight
                    ? `${fontWeightEdit}`
                    : `${fontWeight}`,
                  textDecoration: template.edit.textDecoration
                    ? `${textDecorationEdit}`
                    : `${textDecoration}`,
                }}
                ref={visualLi}
              >
                {value}
              </li>
            ))}
          </ul>
        </nav>
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
          <span>
            {"<"}
            {template.defaultContent ? template.defaultContent.children : null}
            {' class="'}
            {template.defaultStyles[1]}
            {'"'}
            {">"}
          </span>
          {Array.from({ length: template.defaultContent.count }).map(
            (_, index) => (
              <React.Fragment key={index}>
                <span>
                  {"<" +
                    (template.defaultContent
                      ? template.defaultContent.items
                      : null) +
                    ' class="' +
                    template.defaultStyles[2] +
                    '">'}
                  {aTag ? '<a href="">' : null}
                  {liValues[index]}
                  {aTag ? "</a>" : null}
                  {"</" +
                    (template.defaultContent
                      ? template.defaultContent.items
                      : null) +
                    ">"}
                </span>
              </React.Fragment>
            )
          )}
          <span>
            {"</"}
            {template.defaultContent ? template.defaultContent.children : null}
            {">"}
          </span>
          <span>
            {"</"}
            {template.elementType}
            {">"}
          </span>
        </div>
      </div>
      <div className="container-renderized_css">
        <div className="css-nav">
          <div className="title-btn">
            <h4>Estilos del {"<nav>"}</h4>
            <button onClick={() => copyToClipboard("css-nav")}>Copiar</button>
          </div>
          <div className="css" id="css-nav">
            <span>
              .{template.defaultStyles[0]}
              {" {"}
            </span>
            <span>background-color: {navStyles.backgroundColor};</span>
            <span>width: {navStyles.width};</span>
            <span>padding: {navStyles.padding};</span>
            <span>{"}"}</span>
          </div>
        </div>

        <div className="css-ul">
          <div className="title-btn">
            <h4>Estilos de la {"<ul>"}</h4>
            <button onClick={() => copyToClipboard("css-ul")}>Copiar</button>
          </div>
          <div className="css" id="css-ul">
            <span>
              .{template.defaultStyles[1]}
              {" {"}
            </span>
            <span>display: {ulStyles.display};</span>
            <span>flex-direction: {ulStyles.flexDirection};</span>
            <span>justify-content: {ulStyles.justifyContent};</span>
            <span>gap: {ulStyles.gap};</span>
            <span>width: {ulStyles.width};</span>
            <span>{"}"}</span>
          </div>
        </div>

        <div className="css-li">
          <div className="title-btn">
            <h4>Estilos de la {"<li>"}</h4>
            <button onClick={() => copyToClipboard("css-li")}>Copiar</button>
          </div>
          <div className="css" id="css-li">
            <span>
              .{template.defaultStyles[2]}
              {" {"}
            </span>
            <span>color: {liStyles.color};</span>
            <span>font-size: {liStyles.fontSize};</span>
            <span>font-weight: {liStyles.fontWeight};</span>
            <span>
              text-decoration: {getFirstWord(liStyles.textDecoration)};
            </span>
            <span>{"}"}</span>
          </div>
        </div>

        {aTag ? (
          <div className="css-a">
            <div className="title-btn">
              <h4>Estilos de la {"<a>"}</h4>
              <button onClick={() => copyToClipboard("css-a")}>Copiar</button>
            </div>
            <div className="css" id="css-a">
              <span>a {"{"}</span>
              <span>
                text-decoration: {getFirstWord(liStyles.textDecoration)};
              </span>
              <span>{"}"}</span>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default FooterComponent;
