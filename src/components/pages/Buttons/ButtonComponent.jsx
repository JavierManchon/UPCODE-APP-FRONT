import { useEffect, useRef, useState } from "react";
import "./_buttonComponent.scss";
import { Link, useLocation } from "react-router-dom";
import ButtonSaveDesigns from "../../layout/ButtonSaveDesigns/ButtonSaveDesigns";
import { useAuth } from "../../context/AuthContext";
import _ from "lodash";

const ButtonComponent = ({ isLogged, overflowHidden, setOverflowHidden }) => {
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
      _.set(updatedTemplate, "edit.text", buttonValue);
      _.set(updatedTemplate, path, value);
      return updatedTemplate;
    });
  };

  const [buttonValue, setButtonValue] = useState(
    template.edit.text ? template.edit.text : "Enviar"
  );

  useEffect(() => {
    // Actualiza textArray2 basado en pValues
    setDesignToSave((currentTemplate) => {
      let updatedTemplate = _.cloneDeep(currentTemplate);
      _.set(updatedTemplate, "edit.text", buttonValue);
      return updatedTemplate;
    });
  }, [buttonValue]);

  const [bgColor, setBgColor] = useState(
    template.edit.bgColorButton ? template.edit.bgColorButton : ""
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
  const [borderRadius, setBorderRadius] = useState(
    template.edit.borderRadius ? template.edit.borderRadius : ""
  );
  const [buttonStyles, setButtonStyles] = useState({});
  const [hoverStyles, setHoverStyles] = useState({});

  const handleButtonChange = (event) => {
    updateTemplate("edit.text", event.target.value);
    setButtonValue(event.target.value);
  };

  const handleBgColor = (event) => {
    updateTemplate("edit.bgColorButton", event.target.value);
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
    setFontWeight(event.target.value);
  };

  function parseCSS(cssText) {
    const pairs = cssText.split(";");

    const styles = {};

    pairs.forEach((pair) => {
      const keyValue = pair.split(":");

      const key = keyValue[0].trim().replace(/-([a-z])/g, function (g) {
        return g[1].toUpperCase();
      });
      const value = keyValue[1] ? keyValue[1].trim() : "";

      if (key) {
        styles[key] = value;
      }
    });
    setHoverStyles(styles);
    return styles;
  }


  const visualButton = useRef(null);
  useEffect(() => {
    if (visualButton.current) {
      const computedButtonStyles = window.getComputedStyle(
        visualButton.current
      );

      setButtonStyles({
        backgroundColor: computedButtonStyles.backgroundColor,
        padding: computedButtonStyles.padding,
        color: computedButtonStyles.color,
        fontSize: computedButtonStyles.fontSize,
        fontWeight: computedButtonStyles.fontWeight,
        borderRadius: computedButtonStyles.borderRadius,
        border: computedButtonStyles.border,
        outline: computedButtonStyles.outline,
        cursor: computedButtonStyles.cursor,
      });
    }

    let i, j;
    const sel = new RegExp(`button\\.${template.defaultStyles[0]}:hover`);
    for (i = 0; i < document.styleSheets.length; ++i) {
      for (j = 0; j < document.styleSheets[i].cssRules.length; ++j) {
        if (sel.test(document.styleSheets[i].cssRules[j].selectorText)) {
          parseCSS(document.styleSheets[i].cssRules[j].style.cssText);
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
    <div className={`container-pages-default-styles ${overflowHidden ? 'hidden' : ''}`}>
      <div className="styles-editor">
        <div className="container-label">
        <label htmlFor="bgColor">
          <p>Color bg</p>
          <input type="color" id="bgColor" onChange={handleBgColor} />
        </label>

        <label htmlFor="fontColor">
          <p>Color letra</p>
          <input type="color" id="fontColor" onChange={handleFontColor} />
        </label>

        <label htmlFor="fontSize">
          <p>Fontsize</p>
          <input
            type="number"
            id="fontSize"
            min={12}
            max={20}
            onChange={handleFontSize}
          />
          <span>px</span>
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
        </div>
        <span onClick={handleCss}>Mostrar código CSS</span>
      </div>

      <div className="container-containers">

        <div className="container-editor">
        <div>
        <p>
            {"<" +
              template.elementType +
              ' type="' +
              template.defaultContent.tagInfo +
              '"' +
              ">"}
          </p>
          <input
            type="text"
            onChange={handleButtonChange}
            maxLength={12}
            placeholder="Máximo 12 caracteres"
          />
          <p>{"</" + template.elementType + ">"}</p>
        </div>
        <span onClick={handleHtml}>Mostrar código HTML</span>
        </div>

        <div className="container-render">
          <div className={`container-renderized_visual ${
              showVisual ? "" : "hidden"
            }`}>
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
                padding: template.edit.padding,
              }}
              ref={visualButton}
            >
              {buttonValue}
            </button>
          </div>

          <div className={`container-renderized_html ${showHtml ? "show" : ""}`}>
            <div className="title-btn">
              <h4>HTML</h4>
              <button onClick={() => copyToClipboard("html")}>Copiar</button>
            </div>
            <div id="html" className="html">
              <span>
                {"<" +
                  template.elementType +
                  ' type="' +
                  template.defaultContent.tagInfo +
                  '"' +
                  ' class="' +
                  template.defaultStyles[0] +
                  '">'}
              </span>
              <span>{buttonValue}</span>
              <span>{"</" + template.elementType + ">"}</span>
            </div>
          </div>

          <div className={`container-renderized_css ${showCss ? "show" : ""}`}>
            <div className="css-btn">
              <div className="title-btn">
                <h4>Estilos del {"<" + template.elementType + ">"}</h4>
                <button onClick={() => copyToClipboard("css-btn")}>
                  Copiar
                </button>
              </div>
              <div className="css" id="css-btn">
                <p>
                  .{template.defaultStyles[0]} {"{"}
                </p>
                <p>background-color: {buttonStyles.backgroundColor};</p>
                <p>color: {buttonStyles.color};</p>
                <p>font-size: {buttonStyles.fontSize};</p>
                <p>
                  font-weight:{" "}
                  {buttonStyles.fontWeight === "700" ? "bold" : "normal"};
                </p>
                <p>border: {buttonStyles.border};</p>
                <p>border-radius: {buttonStyles.borderRadius};</p>
                <p>padding: {buttonStyles.padding};</p>
                <p>{"}"}</p>
                <div className="container-hover">
                  <p>
                    .{template.defaultStyles[0]}:hover {"{"}
                  </p>
                  <p>
                    transition:{" "}
                    {hoverStyles.transition ? hoverStyles.transition : null}
                  </p>
                  <p>
                    box-shadow:{" "}
                    {hoverStyles.boxShadow ? hoverStyles.boxShadow : null}
                  </p>
                  <p>
                    transform:{" "}
                    {hoverStyles.transform ? hoverStyles.transform : null}
                  </p>
                  <p>{"}"}</p>
                </div>
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

export default ButtonComponent;
