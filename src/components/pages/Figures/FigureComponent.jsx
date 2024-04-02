import { useEffect, useState, useRef } from "react";
import "../Figures/_figureComponent.scss";
import { Link, useLocation } from "react-router-dom";
import ButtonSaveDesigns from "../../layout/ButtonSaveDesigns/ButtonSaveDesigns";
import { useAuth } from "../../context/AuthContext";
import _ from "lodash";

const FigureComponent = ({ isLogged, overflowHidden, setOverflowHidden }) => {
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

      _.set(updatedTemplate, "edit.textItem", imgUrl);
      _.set(updatedTemplate, "edit.text", figcaption);

      _.set(updatedTemplate, path, value);
      return updatedTemplate;
    });
  };

  const [colorText, setColorText] = useState(
    template.edit.colorText ? template.edit.colorText : ""
  );
  const [fontSize, setFontSize] = useState(
    template.edit.fontSizeText ? `${template.edit.fontSizeText}px` : ""
  );
  const [fontWeight, setFontWeight] = useState(
    template.edit.fontWeightText ? template.edit.fontWeightText : ""
  );
  const [textDecoration, setTextDecoration] = useState(
    template.edit.textDecorationText ? template.edit.textDecorationText : ""
  );
  const [figureStyles, setFigureStyles] = useState({});
  const [imgStyles, setImgStyles] = useState({});
  const [figcaptionStyles, setFigcaptionStyles] = useState({});
  const [imgUrl, setImgUrl] = useState(
    template.edit.textItem
      ? template.edit.textItem
      : "https://images.wikidexcdn.net/mwuploads/esssbwiki/thumb/c/c0/latest/20201213230418/Sefirot_SSBU.png/1200px-Sefirot_SSBU.png"
  );

  useEffect(() => {
    // Actualiza textArray basado en h2Values
    setDesignToSave((currentTemplate) => {
      let updatedTemplate = _.cloneDeep(currentTemplate);
      _.set(updatedTemplate, "edit.textItem", imgUrl);
      return updatedTemplate;
    });
  }, [imgUrl]);

  const [figcaption, setFigcaption] = useState(
    template.edit.text ? template.edit.text : "TheRealJefry"
  );

  useEffect(() => {
    // Actualiza textArray2 basado en pValues
    setDesignToSave((currentTemplate) => {
      let updatedTemplate = _.cloneDeep(currentTemplate);
      _.set(updatedTemplate, "edit.text", figcaption);
      return updatedTemplate;
    });
  }, [figcaption]);

  const handleFontColor = (event) => {
    updateTemplate("edit.colorText", event.target.value);
    setColorText(event.target.value);
  };

  const handleFontSize = (event) => {
    updateTemplate("edit.fontSizeText", event.target.value);
    setFontSize(`${event.target.value}px`);
  };

  const handleImgUrlChange = (event) => {
    updateTemplate("edit.textItem", event.target.value);
    setImgUrl(event.target.value);
  };

  const handleFigcaptionChange = (event) => {
    updateTemplate("edit.text", event.target.value);
    setFigcaption(event.target.value);
  };

  const visualFigure = useRef(null);
  useEffect(() => {
    if (visualFigure.current) {
      const computedFigureStyles = window.getComputedStyle(
        visualFigure.current
      );
      setFigureStyles({
        width: "100%",
        maxWidth: "350px",
        padding: computedFigureStyles.padding,
        flexDirection: computedFigureStyles.flexDirection,
        position: computedFigureStyles.position
      });
    }
  }, [figcaption]);

  const visualImg = useRef(null);
  useEffect(() => {
    if (visualImg.current) {
      const computedImgStyles = window.getComputedStyle(visualImg.current);
      setImgStyles({
        width: "100%",
        position: computedImgStyles.position,
        top: computedImgStyles.top,
        left: computedImgStyles.left,
        transform: computedImgStyles.transform,
      });
    }
  }, [imgUrl]);

  const visualFigcaption = useRef(null);
  useEffect(() => {
    if (visualFigcaption.current) {
      const computedFigcaptionStyles = window.getComputedStyle(
        visualFigcaption.current
      );
      setFigcaptionStyles({
        color: computedFigcaptionStyles.color,
        fontSize: computedFigcaptionStyles.fontSize,
        fontWeight: computedFigcaptionStyles.fontWeight,
        textDecoration: computedFigcaptionStyles.textDecoration,
        position: computedFigcaptionStyles.position,
        top: computedFigcaptionStyles.top,
        left: computedFigcaptionStyles.left,
        backdropFilter: computedFigcaptionStyles.backdropFilter
      });
    }
  }, [colorText, fontSize, fontWeight, textDecoration]);

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

  const getFirstWord = (text) => {
    if (text) {
      const words = text.split(" ");
      return words[0];
    }
    return null;
  };

  return (
    <div className={`container-pages-default-styles ${overflowHidden ? 'hidden' : ''}`}>

      <div className="styles-editor">
        <div className="container-label">
          <label htmlFor="fontColor">
            <p>Color {"<figcaption>"}</p>
            <input type="color" id="fontColor" onChange={handleFontColor} />
          </label>

          <label htmlFor="fontSize">
            <p>Fontsize</p>
            <div>
            <input
              type="number"
              id="fontSize"
              min={12}
              max={30}
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
                  setFontWeight(newValue);
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
                  updateTemplate("edit.textDecorationText", newValue);
                  setTextDecoration(newValue);
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
              {"<"}
              {template.elementType}
              {">"}
            </p>
            <p className="padding-left-10">
              {"<"}
              {template.defaultContent.children[0]}
              {' src="'}
              <input
                type="text"
                id="imgUrl"
                value={imgUrl}
                onChange={handleImgUrlChange}
                className={template.elementType === 'figure' ? 'input-img' : ''}
              />
              {'">'}
              {"<"}
              {template.defaultContent.children[0]}
              {">"}
            </p>

            <p className="padding-left-10">
              {"<"}
              {template.defaultContent.children[1]}
              {">"}
              <input
                type="text"
                id="figcaption"
                value={figcaption}
                onChange={handleFigcaptionChange}
              />
              {"<"}
              {template.defaultContent.children[1]}
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
          <div
            className={`container-renderized_visual ${
              showVisual ? "" : "hidden"
            }`}
          >
            <figure
              className={`figure ${template.defaultStyles[0]}`}
              ref={visualFigure}
            >
              <img
                src={imgUrl}
                className={template.defaultStyles[1]}
                ref={visualImg}
                alt="Image"
              />
              <figcaption
                className={template.defaultStyles[2]}
                style={{
                  color: `${colorText}`,
                  fontSize: `${fontSize}`,
                  fontWeight: `${fontWeight}`,
                  textDecoration: `${textDecoration}`,
                }}
                ref={visualFigcaption}
              >
                {figcaption}
              </figcaption>
            </figure>
          </div>

          <div
            className={`container-renderized_html ${showHtml ? "show" : ""}`}
          >
            <div className="title-btn">
              <h4>HTML</h4>
              <button onClick={() => copyToClipboard("html")}>Copiar</button>
            </div>
            <div id="html" className="html">
              <span>{`<${template.elementType}>`}</span>
              <span>
                {`<${template.defaultContent.children[0]} src="` +
                  imgUrl +
                  `" alt="" />`}
              </span>
              <span>
                {`<${template.defaultContent.children[1]}>` +
                  figcaption +
                  `</${template.defaultContent.children[1]}>`}
              </span>
              <span>{`</${template.elementType}>`}</span>
            </div>
          </div>

          <div className={`container-renderized_css ${showCss ? "show" : ""}`}>
            <div className="css-fig">
              <div className="title-btn">
                <h4>Estilos del {"<figure>"}</h4>
                <button onClick={() => copyToClipboard("css-fig")}>
                  Copiar
                </button>
              </div>
              <div className="css" id="css-fig">
                <span>
                  .{template.defaultStyles[0]}
                  {" {"}
                </span>
                <span>width: {figureStyles.width};</span>
                <span>maxWidth: {figureStyles.maxWidth};</span>
                <span>padding: {figureStyles.padding};</span>
                <span>position: {figureStyles.position};</span>
                <span>{"}"}</span>
              </div>
            </div>
            <div className="css-img">
              <div className="title-btn">
                <h4>Estilos de la {"<img>"}</h4>
                <button onClick={() => copyToClipboard("css-img")}>
                  Copiar
                </button>
              </div>
              <div className="css" id="css-img">
                <span>
                  .{template.defaultStyles[1]}
                  {" {"}
                </span>
                <span>width: {imgStyles.width};</span>
                <span>position: {imgStyles.position};</span>
                <span>top: {imgStyles.top};</span>
                <span>left: {imgStyles.left};</span>
                <span>{"}"}</span>
              </div>
            </div>
            <div className="css-figcaption">
              <div className="title-btn">
                <h4>Estilos de la {"<figcaption>"}</h4>
                <button onClick={() => copyToClipboard("css-figcaption")}>
                  Copiar
                </button>
              </div>
              <div className="css" id="css-figcaption">
                <span>{`.${template.defaultStyles[2]} {`}</span>
                <span>{`color: ${figcaptionStyles.color};`}</span>
                <span>{`font-size: ${figcaptionStyles.fontSize};`}</span>
                <span>{`font-weight: ${figcaptionStyles.fontWeight};`}</span>
                <span>{`position: ${figcaptionStyles.position};`}</span>
                <span>{`top: ${figcaptionStyles.top};`}</span>
                <span>{`left: ${figcaptionStyles.left};`}</span>
                <span>{`backdrop-filter: ${figcaptionStyles.backdropFilter};`}</span>
                <span>{`transform: translateX(-50%);`}</span>
                <span>{`text-decoration: ${getFirstWord(
                  figcaptionStyles.textDecoration
                )};`}</span>
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

export default FigureComponent;
