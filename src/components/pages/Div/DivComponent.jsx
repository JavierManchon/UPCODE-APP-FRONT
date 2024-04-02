import React, { useEffect, useState, useRef } from "react";
import "./_divComponent.scss";
import { Link, useLocation } from "react-router-dom";
import ButtonSaveDesigns from "../../layout/ButtonSaveDesigns/ButtonSaveDesigns";
import { useAuth } from "../../context/AuthContext";
import _ from "lodash";

const DivComponent = ({ isLogged,  overflowHidden, setOverflowHidden }) => {
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

      _.set(updatedTemplate, "edit.textArray", pValues);

      _.set(updatedTemplate, path, value);
      return updatedTemplate;
    });
  };

  const [numP, setNumP] = useState(template.defaultContent.countChildren);
  const [pValues, setPValues] = useState(() => {
    if (template.edit && template.edit.textArray.length > 0) {
      return [...template.edit.textArray];
    } else {
      // Corrección: Asegurarse de retornar el Array.from(...)
      return Array.from({ length: numP }, () => "Item");
    }
  });

  useEffect(() => {
    // Actualiza textArray basado en h2Values
    setDesignToSave((currentTemplate) => {
      let updatedTemplate = _.cloneDeep(currentTemplate);
      _.set(updatedTemplate, "edit.textArray", pValues);
      return updatedTemplate;
    });
  }, [pValues]);

  const [bgColor, setBgColor] = useState(
    template.edit.bgColorDiv ? template.edit.bgColorDiv : ""
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
  const [divStyles, setDivStyles] = useState([]);
  const [pStyles, setPStyles] = useState([]);

  const handlePChange = (index) => (event) => {
    const newPValues = [...pValues];
    newPValues[index] = event.target.value;
    setPValues(newPValues);
    updateTemplate("edit.textArray", event.target.value);
  };

  const handleBgColor = (event) => {
    updateTemplate("edit.bgColorDiv", event.target.value);
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
    setFontWeight(newValue);
  };

  const handleNumP = (event) => {
    updateTemplate("defaultContent.countChildren", event.target.value);
    setNumP(event.target.value);
  };

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
        flexWrap: computedDivStyles.flexWrap,
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
    <div className={`container-pages-default-styles ${overflowHidden ? 'hidden' : ''}`}>

      <div className="styles-editor">
        <div className="container-label">
          <label htmlFor="bgColor">
            <p>Color bg</p>
            <input type="color" id="bgColor" onChange={handleBgColor} />
          </label>

          <label htmlFor="fontColor">
            <p>Color {"<p>"}</p>
            <input type="color" id="fontColor" onChange={handleFontColor} />
          </label>

          <label htmlFor="fontSize">
            <p>Fontsize</p>
            <div>
              <input
                type="number"
                id="fontSize"
                min={12}
                max={20}
                onChange={handleFontSize}
              />
              <span>px</span>
            </div>
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
                  updateTemplate("edit.fontWeightText", newValue);
                  handleFontWeight(newValue);
                }}
              />
            </div>
          </label>

          <label htmlFor="numP">
            <p>Líneas</p>
            <div>
              <input
                type="number"
                id="numP"
                min={1}
                max={5}
                onChange={handleNumP}
              />
            </div>
          </label>
        </div>
        <span onClick={handleCss}>Mostrar código CSS</span>
      </div>

      <div className="container-containers">
        <div className="container-editor">
          <div>
            <p>
              {"<"}
              {template.elementType}
              {">"}
            </p>
            {Array.from({ length: numP }).map((_, index) => (
              <React.Fragment key={index}>
                <p className="padding-left-10">
                  {"<"}
                  {template.defaultContent
                    ? template.defaultContent.children[0]
                    : null}
                  {">"}
                  <input
                    type="text"
                    onChange={handlePChange(index)}
                    maxLength={12}
                    placeholder="Máximo 12 caracteres"
                  />
                  {"</"}
                  {template.defaultContent
                    ? template.defaultContent.children[0]
                    : null}
                  {">"}
                </p>
              </React.Fragment>
            ))}
            <p>
              {"</"}
              {template.elementType}
              {">"}
            </p>
          </div>

          <span onClick={handleHtml}>Mostrar código HTML</span>
        </div>

        <div className="container-render">
          <div
            className={`container-renderized_visual ${
              showVisual ? "" : "hidden"
            }`}
          >
            <div
              className={template.defaultStyles[0]}
              style={{ backgroundColor: `${bgColor}` }}
              ref={visualDiv}
            >
              {Array.from({ length: numP }).map((_, index) => (
                <p
                  className={template.defaultStyles[1]}
                  key={index}
                  style={{
                    color: `${fontColor}`,
                    fontSize: `${fontSize}`,
                    fontWeight: `${fontWeight}`,
                  }}
                  ref={visualP}
                >
                  {pValues[index]}
                </p>
              ))}
            </div>
          </div>

          <div
            className={`container-renderized_html ${showHtml ? "show" : ""}`}
          >
            <div className="title-btn">
              <h4>HTML</h4>
              <button onClick={() => copyToClipboard("html")}>Copiar</button>
            </div>
            <div id="html" className="html">
              <span>
                {"<"}
                {template.elementType}
                {">"}
              </span>
              {Array.from({ length: numP }).map((_, index) => (
                <React.Fragment key={index}>
                  <span>
                    {"<" +
                      (template.defaultContent
                        ? template.defaultContent.children[0]
                        : null) +
                      ">"}
                    {pValues[index]}
                    {"</" +
                      (template.defaultContent
                        ? template.defaultContent.children[0]
                        : null) +
                      ">"}
                  </span>
                </React.Fragment>
              ))}
              <span>
                {"</"}
                {template.elementType}
                {">"}
              </span>
            </div>
          </div>
          <div className={`container-renderized_css ${showCss ? "show" : ""}`}>
            <div className="css-div">
              <div className="title-btn">
                <h4>Estilos del {"<div>"}</h4>
                <button onClick={() => copyToClipboard("css-div")}>
                  Copiar
                </button>
              </div>
              <div className="css" id="css-div">
                <span>
                  .{template.defaultStyles[0]}
                  {" {"}
                </span>
                <span>background-color: {divStyles.backgroundColor};</span>
                <span>width: {divStyles.width};</span>
                <span>display: {divStyles.display};</span>
                <span>flex-direction: {divStyles.flexDirection};</span>
                <span>justify-content: {divStyles.justifyContent};</span>
                <span>align-items: {divStyles.alignItems};</span>
                <span>gap: {divStyles.gap};</span>
                <span>flex-wrap: {divStyles.flexWrap};</span>
                <span>{"}"}</span>
              </div>
            </div>

            <div className="css-p">
              <div className="title-btn">
                <h4>Estilos de la {"<p>"}</h4>
                <button onClick={() => copyToClipboard("css-p")}>Copiar</button>
              </div>
              <div className="css" id="css-p">
                <span>
                  .{template.defaultStyles[1]}
                  {" {"}
                </span>
                <span>color: {pStyles.color};</span>
                <span>font-size: {pStyles.fontSize};</span>
                <span>font-weight: {pStyles.fontWeight};</span>
                <span>{"}"}</span>
              </div>
            </div>
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

export default DivComponent;
