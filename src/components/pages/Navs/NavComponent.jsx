import React, { useEffect, useRef, useState } from "react";
import "./_navComponent.scss";
import { Link, useLocation } from "react-router-dom";
import ButtonSaveDesigns from "../../layout/ButtonSaveDesigns/ButtonSaveDesigns";
import { useAuth } from "../../context/AuthContext";
import _ from "lodash";

const FooterComponent = ({ isLogged, overflowHidden, setOverflowHidden }) => {
  const { authState } = useAuth();
  const location = useLocation();
  const previousRoute = location.state.url;
  const template = location.state.templateData;
  const [designToSave, setDesignToSave] = useState();

  const [showCss, setShowCss] = useState(false);
  const [showHtml, setShowHtml] = useState(false);
  const [showVisual, setShowVisual] = useState(true);
  const visualButtonRef = useRef(null);

  const handleCss = () => {
    setShowVisual(false);
    setShowHtml(false);
    setShowCss(true);
    visualButtonRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleHtml = () => {
    setShowVisual(false);
    setShowCss(false);
    setShowHtml(true);
    visualButtonRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleVisual = () => {
    setShowHtml(false);
    setShowCss(false);
    setShowVisual(true);
  };

  useEffect(() => {
    setDesignToSave(location.state.templateData);
  }, [location.state.templateData]);

  const updateTemplate = (path, value) => {
    setDesignToSave((currentTemplate) => {
      let updatedTemplate = _.cloneDeep(currentTemplate);

      _.set(updatedTemplate, "edit.textArray", liValues);

      _.set(updatedTemplate, path, value);
      return updatedTemplate;
    });
  };

  const [liValues, setLiValues] = useState(() => {
    if (template.edit.textArray.length > 0) {
      return [...template.edit.textArray];
    } else {
      return Array.from(
        { length: template.defaultContent.countGrandson },
        () => "Item"
      );
    }
  });

  useEffect(() => {
    // Actualiza textArray basado en h2Values
    setDesignToSave((currentTemplate) => {
      let updatedTemplate = _.cloneDeep(currentTemplate);
      _.set(updatedTemplate, "edit.textArray", liValues);
      return updatedTemplate;
    });
  }, [liValues]);

  const [bgColor, setBgColor] = useState(
    template.edit.bgColorNav ? template.edit.bgColorNav : ""
  );
  const [fontColor, setFontColor] = useState(
    template.edit.colorText ? template.edit.colorText : ""
  );
  const [fontSize, setFontSize] = useState(
    template.edit.fontSizeText ? template.edit.fontSizeText : ""
  );
  const [fontWeight, setFontWeight] = useState(
    template.edit.fontWeightText ? template.edit.fontWeightText : ""
  );
  const [textDecoration, setTextDecoration] = useState(
    template.edit.textDecorationText ? template.edit.textDecorationText : ""
  );
  const [navStyles, setNavStyles] = useState([]);
  const [ulStyles, setUlStyles] = useState([]);
  const [liStyles, setLiStyles] = useState([]);
  const [aTag, setATag] = useState(false);

  const handleLiChange = (index) => (event) => {
    const newLiValues = [...liValues];
    newLiValues[index] = event.target.value;
    setLiValues(newLiValues);
    updateTemplate("edit.textArray", event.target.value);
  };

  const handleBgColor = (event) => {
    updateTemplate("edit.bgColorNav", event.target.value);
    setBgColor(event.target.value);
  };

  const handleFontColor = (event) => {
    updateTemplate("edit.colorText", event.target.value);
    setFontColor(event.target.value);
  };

  const handleFontSize = (event) => {
    updateTemplate("edit.fontSizeText", event.target.value);
    setFontSize(`${event.target.value}px`);
  };

  const handleFontWeight = (newValue) => {
    updateTemplate("edit.fontWeightText", newValue);
    setFontWeight(newValue);
  };

  const handleTextDecoration = (newValue) => {
    updateTemplate("edit.textDecorationText", newValue);
    setTextDecoration(newValue);
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
  }, [bgColor]);

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
    document.execCommand("copy");
    selection.removeAllRanges();
  };

  const handleATag = () => {
    setATag(!aTag);
  };

  return (
    <div className={`container-pages-default-styles ${overflowHidden ? 'hidden' : ''}`}>

      <div className="styles-editor">
        <div className="container-label">
        <label htmlFor="bgColor">
          <p>Color de Fondo</p>
          <input type="color" id="bgColor" onChange={handleBgColor} />
        </label>

        <label htmlFor="fontColor">
          <p>Color de Letra</p>
          <input type="color" id="fontColor" onChange={handleFontColor} />
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
              name="fontWeight"
              value="bold"
              checked={fontWeight === "bold"}
              onChange={(event) => {
                const isChecked = event.target.checked;
                const newValue = isChecked ? "bold" : "normal";
                handleFontWeight(newValue);
              }}
            />
          </div>
        </label>

        <label htmlFor="textDecoration">
          <p>Subrayado</p>
          <div>
            <input
              type="checkbox"
              name="textDecoration"
              value="underline"
              checked={textDecoration === "underline"}
              onChange={(event) => {
                const isChecked = event.target.checked;
                const newValue = isChecked ? "underline" : "none";
                handleTextDecoration(newValue);
              }}
            />
          </div>
        </label>
        </div>
        <span onClick={handleCss}>Mostrar código CSS</span>
      </div>

      <div className="container-containers">
        <div className="container-editor">
          <button className="btn-href" onClick={handleATag}>{'<a>'}</button>
          <div>
          <p>
            {"<"}
            {template.elementType}
            {">"}
          </p>
          <p className="padding-left-10">
            {"<"}
            {template.defaultContent
              ? template.defaultContent.children[0]
              : null}
            {">"}
          </p>
          {Array.from({ length: template.defaultContent.countGrandson }).map(
            (_, index) => (
              <React.Fragment key={index}>
                <p className="padding-left-20">
                  {"<"}
                  {template.defaultContent
                    ? template.defaultContent.grandson[0]
                    : null}
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
                  {template.defaultContent
                    ? template.defaultContent.grandson[0]
                    : null}
                  {">"}
                </p>
              </React.Fragment>
            )
          )}
          <p className="padding-left-10">
            {"</"}
            {template.defaultContent
              ? template.defaultContent.children[0]
              : null}
            {">"}
          </p>
          <p>
            {"</"}
            {template.elementType}
            {">"}
          </p>
          </div>
          <span onClick={handleHtml}>Mostrar código HTML</span>
        </div>

        <div className="container-render">
          <div className={`container-renderized_visual ${
              showVisual ? "" : "hidden"
            }`}>
            <nav
              className={template.defaultStyles[0]}
              style={{ backgroundColor: bgColor }}
              ref={visualNav}
            >
              <ul className={template.defaultStyles[1]} ref={visualUl}>
                {liValues.map((value, index) => (
                  <li
                    className={template.defaultStyles[2]}
                    key={index}
                    style={{
                      color: fontColor,
                      fontSize: fontSize,
                      fontWeight: fontWeight,
                      textDecoration: textDecoration,
                    }}
                    ref={visualLi}
                  >
                    {value}
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className={`container-renderized_html ${showHtml ? "show" : ""}`}>
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
                {template.defaultContent
                  ? template.defaultContent.children[0]
                  : null}
                {' class="'}
                {template.defaultStyles[1]}
                {'"'}
                {">"}
              </span>
              {Array.from({
                length: template.defaultContent.countGrandson,
              }).map((_, index) => (
                <React.Fragment key={index}>
                  <span>
                    {"<" +
                      (template.defaultContent
                        ? template.defaultContent.grandson[0]
                        : null) +
                      ' class="' +
                      template.defaultStyles[2] +
                      '">'}
                    {aTag ? '<a href="">' : null}
                    {liValues[index]}
                    {aTag ? "</a>" : null}
                    {"</" +
                      (template.defaultContent
                        ? template.defaultContent.grandson[0]
                        : null) +
                      ">"}
                  </span>
                </React.Fragment>
              ))}
              <span>
                {"</"}
                {template.defaultContent
                  ? template.defaultContent.children[0]
                  : null}
                {">"}
              </span>
              <span>
                {"</"}
                {template.elementType}
                {">"}
              </span>
            </div>
          </div>

          <div className={`container-renderized_css ${showCss ? "show" : ""}`}>
            <div className="css-nav">
              <div className="title-btn">
                <h4>Estilos del {"<nav>"}</h4>
                <button onClick={() => copyToClipboard("css-nav")}>
                  Copiar
                </button>
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
                <button onClick={() => copyToClipboard("css-ul")}>
                  Copiar
                </button>
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
                <button onClick={() => copyToClipboard("css-li")}>
                  Copiar
                </button>
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
                  <button onClick={() => copyToClipboard("css-a")}>
                    Copiar
                  </button>
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
      </div>

      <button ref={visualButtonRef} className={`no-visual ${!showVisual ? 'btn-visual' : ''}`} onClick={handleVisual}>Mostrar visualizado</button>

      {isLogged && authState.user.isPremium && previousRoute === "/catalogue" ? (
        <ButtonSaveDesigns
          designToSave={designToSave}
          setDesignToSave={setDesignToSave}
          overflowHidden={overflowHidden} 
          setOverflowHidden={setOverflowHidden}
        />
      ) : null}
      {isLogged && (!authState.user.isPremium) && previousRoute === "/catalogue" ? (
          <Link className="premiumsavedesign" to='/payments'>Hazte Premium</Link>
      ) : null}

    </div>
  );
};

export default FooterComponent;
