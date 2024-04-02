import React, { useEffect, useState, useRef } from "react";
import "./_sectionComponent.scss";
import { Link, useLocation } from "react-router-dom";
import ButtonSaveDesigns from "../../layout/ButtonSaveDesigns/ButtonSaveDesigns";
import { useAuth } from "../../context/AuthContext";
import _ from "lodash";

const SectionComponent = ({ isLogged, overflowHidden, setOverflowHidden }) => {
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

      _.set(updatedTemplate, "edit.textArray", h2Values);
      _.set(updatedTemplate, "edit.textArray2", pValues);

      _.set(updatedTemplate, path, value);
      return updatedTemplate;
    });
  };

  const [h2Values, setH2Values] = useState(() => {
    if (template.edit.textArray.length > 0) {
      return [...template.edit.textArray];
    } else {
      return Array.from(
        { length: template.defaultContent.countChildren },
        () => "Section 'h2'"
      );
    }
  });

  useEffect(() => {
    // Actualiza textArray basado en h2Values
    setDesignToSave((currentTemplate) => {
      let updatedTemplate = _.cloneDeep(currentTemplate);
      _.set(updatedTemplate, "edit.textArray", h2Values);
      return updatedTemplate;
    });
  }, [h2Values]);

  const [pValues, setPValues] = useState(() => {
    if (template.edit.textArray2.length > 0) {
      return [...template.edit.textArray2];
    } else {
      return Array.from(
        { length: template.defaultContent.countChildren },
        () => "Section 'p'"
      );
    }
  });

  useEffect(() => {
    // Actualiza textArray2 basado en pValues
    setDesignToSave((currentTemplate) => {
      let updatedTemplate = _.cloneDeep(currentTemplate);
      _.set(updatedTemplate, "edit.textArray2", pValues);
      return updatedTemplate;
    });
  }, [pValues]);

  const [SectionBgColor, setSectionBgColor] = useState(
    template.edit.bgColorSection ? template.edit.bgColorSection : ""
  );

  const [ArticleBgColor, setArticleBgColor] = useState(
    template.edit.bgColorArticle ? template.edit.bgColorArticle : ""
  );

  const [h2FontColor, setH2FontColor] = useState(
    template.edit.colorTitle ? template.edit.colorTitle : ""
  );

  const [pFontColor, setPFontColor] = useState(
    template.edit.colorItem ? template.edit.colorItem : ""
  );

  const [h2FontSize, setH2FontSize] = useState(
    template.edit.fontSizeTitle ? template.edit.fontSizeTitle : ""
  );

  const [pFontSize, setPFontSize] = useState(
    template.edit.fontSizeItem ? template.edit.fontSizeItem : ""
  );

  const [h2FontWeight, setH2FontWeight] = useState(
    template.edit.fontWeightTitle ? template.edit.fontWeightTitle : ""
  );

  const [pFontWeight, setPFontWeight] = useState(
    template.edit.fontWeightItem ? template.edit.fontWeightItem : ""
  );

  const [h2TextDecoration, setH2TextDecoration] = useState(
    template.edit.textDecorationTitle ? template.edit.textDecorationTitle : ""
  );

  const [pTextDecoration, setPTextDecoration] = useState(
    template.edit.textDecorationText ? template.edit.textDecorationText : ""
  );

  const [sectionStyles, setSectionStyles] = useState([]);

  const [articleStyles, setArticleStyles] = useState([]);

  const [pStyles, setPStyles] = useState([]);

  const [h2Styles, setH2Styles] = useState([]);

  const handleH2Change = (index) => (event) => {
    const newH2Values = [...h2Values];
    newH2Values[index] = event.target.value;
    setH2Values(newH2Values);
    updateTemplate("edit.textArray", event.target.value);
  };

  const handlePChange = (index) => (event) => {
    const newPValues = [...pValues];
    newPValues[index] = event.target.value;
    setPValues(newPValues);
    updateTemplate("edit.textArray2", event.target.value);
  };

  const handleSectionBgColor = (event) => {
    updateTemplate("edit.bgColorSection", event.target.value);
    setSectionBgColor(event.target.value);
  };
  const handleArticleBgColor = (event) => {
    updateTemplate("edit.bgColorArticle", event.target.value);
    setArticleBgColor(event.target.value);
  };

  const handleH2FontColor = (event) => {
    updateTemplate("edit.colorTitle", event.target.value);
    setH2FontColor(event.target.value);
  };
  const handlePFontColor = (event) => {
    updateTemplate("edit.colorItem", event.target.value);
    setPFontColor(event.target.value);
  };

  const handleH2FontSizeChange = (event) => {
    updateTemplate("edit.fontSizeTitle", event.target.value);
    setH2FontSize(`${event.target.value}px`);
  };

  const handlePFontSizeChange = (event) => {
    updateTemplate("edit.fontSizeItem", event.target.value);
    setPFontSize(`${event.target.value}px`);
  };

  const handleH2FontWeightChange = (newValue) => {
    updateTemplate("edit.fontWeightTitle", newValue);
    setH2FontWeight(newValue);
  };

  const handlePFontWeightChange = (newValue) => {
    updateTemplate("edit.fontWeightItem", newValue);
    setPFontWeight(newValue);
  };

  const handleH2TextDecorationChange = (newValue) => {
    updateTemplate("edit.textDecorationTitle", newValue);
    setH2TextDecoration(newValue);
  };

  const handlePTextDecorationChange = (newValue) => {
    updateTemplate("edit.textDecorationText", newValue);
    setPTextDecoration(newValue);
  };

  const visualSection = useRef(null);
  useEffect(() => {
    if (visualSection.current && visualArticle.current) {
      const computedSectionStyles = window.getComputedStyle(
        visualSection.current
      );
      const computedArticleStyles = window.getComputedStyle(
        visualArticle.current
      );
      let widthValue;
      if (computedArticleStyles.flexDirection === "row") {
        widthValue = "100%";
      } else {
        widthValue = computedSectionStyles.width;
      }

      setSectionStyles({
        backgroundColor: computedSectionStyles.backgroundColor,
        width: widthValue,
        padding: computedSectionStyles.padding,
        display: computedSectionStyles.display,
        flexFlow: computedSectionStyles.flexFlow,
        justifyContent: computedSectionStyles.justifyContent,
        alignItems: computedSectionStyles.alignItems,
        gap: computedSectionStyles.gap,
        gridTemplateColums: computedSectionStyles.gridTemplateColumns,
        gridTemplateRows: computedSectionStyles.gridTemplateRows
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
        width: "100%",
        gap: computedStyles.gap,
        justifyContent: computedStyles.justifyContent,
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
        textDecoration: computedStyles.textDecoration,
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
        textDecoration: computedStyles.textDecoration,
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
    document.execCommand("copy");
    selection.removeAllRanges();
  };

  return (
    <div className={`container-pages-default-styles ${overflowHidden ? 'hidden' : ''}`}>

      <div className="styles-editor">
        <div className="container-label">
          <label htmlFor="sectionbgColor">
            <p>BgColor Section</p>
            <input type="color" id="bgColor" onChange={handleSectionBgColor} />
          </label>

          <label htmlFor="articlebgColor">
            <p>BagColor Article</p>
            <input type="color" id="bgColor" onChange={handleArticleBgColor} />
          </label>

          <label htmlFor="colorTitle">
            <p>TextColor H2</p>
            <input type="color" id="colorTitle" onChange={handleH2FontColor} />
          </label>

          <label htmlFor="colorItem">
            <p>TextColor P</p>
            <input type="color" id="colorItem" onChange={handlePFontColor} />
          </label>

          <label htmlFor="fontSizeTitle">
            <p>FontSize H2</p>
            <input
              type="number"
              id="fontSizeTitle"
              onChange={handleH2FontSizeChange}
              max={20} min={12}
            />
          </label>

          <label htmlFor="fontSizeItem">
            <p>FontSize P</p>
            <input
              type="number"
              id="fontSizeItem"
              onChange={handlePFontSizeChange}
              max={20} min={12}
            />
          </label>

          <label htmlFor="fontWeightTitle">
            <p>Negrita H2</p>
            <div>
              <input
                type="checkbox"
                name="FontWeightTitle"
                value="bold"
                checked={h2FontWeight === "bold"}
                onChange={(event) => {
                  const isChecked = event.target.checked;
                  const newValue = isChecked ? "bold" : "normal";
                  handleH2FontWeightChange(newValue);
                }}
              />
            </div>
          </label>

          <label htmlFor="fontWeightItem">
            <p>Negrita P</p>
            <div>
              <input
                type="checkbox"
                name="FontWeightItem"
                value="bold"
                checked={pFontWeight === "bold"}
                onChange={(event) => {
                  const isChecked = event.target.checked;
                  const newValue = isChecked ? "bold" : "normal";
                  handlePFontWeightChange(newValue);
                }}
              />
            </div>
          </label>

          <label htmlFor="textDecorationTitle">
            <p>Subrayado H2</p>
            <div>
              <input
                type="checkbox"
                name="textDecorationTitle"
                value="underline"
                checked={h2TextDecoration === "underline"}
                onChange={(event) => {
                  const isChecked = event.target.checked;
                  const newValue = isChecked ? "underline" : "none";
                  handleH2TextDecorationChange(newValue);
                }}
              />
            </div>
          </label>

          <label htmlFor="textDecorationText">
            <p>Subrayado P</p>
            <div>
              <input
                type="checkbox"
                name="textDecorationText"
                value="underline"
                checked={pTextDecoration === "underline"}
                onChange={(event) => {
                  const isChecked = event.target.checked;
                  const newValue = isChecked ? "underline" : "none";
                  handlePTextDecorationChange(newValue);
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
            {Array.from({ length: template.defaultContent.countChildren }).map(
            (_, index) => (
              <React.Fragment key={index}>
                <div className={`${template.defaultContent.children[0]}`}>
                  <p className="padding-left-10">
                    {"<"}
                    {template.defaultContent
                      ? template.defaultContent.children[0]
                      : null}
                    {">"}
                  </p>
                  <p className={`padding-left-20 ${template.defaultContent.children[1]}`}>
                    {"<"}
                    {template.defaultContent
                      ? template.defaultContent.children[1]
                      : null}
                    {">"}
                    <input
                      type="text"
                      onChange={handleH2Change(index)}
                      maxLength={12}
                      placeholder="Máximo 12 caracteres"
                    />
                    {"</"}
                    {template.defaultContent
                      ? template.defaultContent.children[1]
                      : null}
                    {">"}
                  </p>
                  <p className={`padding-left-20 ${template.defaultContent.children[1]}`}>
                    {"<"}
                    {template.defaultContent
                      ? template.defaultContent.grandson[0]
                      : null}
                    {">"}
                    <input
                      type="text"
                      onChange={handlePChange(index)}
                      maxLength={12}
                      placeholder="Máximo 12 caracteres"
                      className={template.elementType ? 'input-img' : ''}
                    />
                    {"</"}
                    {template.defaultContent
                      ? template.defaultContent.grandson[0]
                      : null}
                    {">"}
                  </p>

                  <p className="padding-left-10">
                    {"</"}
                    {template.defaultContent
                      ? template.defaultContent.children[0]
                      : null}
                    {">"}
                  </p>
                </div>
              </React.Fragment>
            )
            )}
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
            <section
              className={template.defaultStyles[0]}
              style={{ backgroundColor: `${SectionBgColor}` }}
              ref={visualSection}
            >
              {Array.from({
                length: template.defaultContent.countChildren,
              }).map((_, index) => (
                <article
                  className={template.defaultStyles[1]}
                  style={{ backgroundColor: `${ArticleBgColor}` }}
                  key={index}
                  ref={visualArticle}
                >
                  <h2
                    className={template.defaultStyles[2]}
                    style={{
                      color: `${h2FontColor}`,
                      fontSize: `${h2FontSize}`,
                      fontWeight: `${h2FontWeight}`,
                      textDecoration: `${h2TextDecoration}`,
                    }}
                    ref={visualH2}
                  >
                    {h2Values[index]}
                  </h2>
                  <p
                    className={template.defaultStyles[3]}
                    style={{
                      color: `${pFontColor}`,
                      fontSize: `${pFontSize}`,
                      fontWeight: `${pFontWeight}`,
                      textDecoration: `${pTextDecoration}`,
                    }}
                    key={`${index}-${index}`}
                    ref={visualP}
                  >
                    {pValues[index]}
                  </p>
                </article>
              ))}
            </section>
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
                {">"}
              </span>
              {Array.from({
                length: template.defaultContent.countChildren,
              }).map((_, index) => (
                <React.Fragment key={index}>
                  <span>
                    {"<"}
                    {template.defaultContent
                      ? template.defaultContent.children[0]
                      : null}
                    {">"}
                  </span>
                  <span className="section-h2">
                    {"<" +
                      (template.defaultContent
                        ? template.defaultContent.children[1]
                        : null) +
                      ">"}
                    {h2Values[index]}
                    {"</" +
                      (template.defaultContent
                        ? template.defaultContent.children[1]
                        : null) +
                      ">"}
                  </span>
                  <span className="section-p">
                    {"<" +
                      (template.defaultContent
                        ? template.defaultContent.grandson[0]
                        : null) +
                      ">"}
                    {pValues[index]}
                    {"</" +
                      (template.defaultContent
                        ? template.defaultContent.grandson[0]
                        : null) +
                      ">"}
                  </span>
                  <span>
                    {"</"}
                    {template.defaultContent
                      ? template.defaultContent.children[0]
                      : null}
                    {">"}
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
            <div className="css-section">
              <div className="title-btn">
                <h4>Estilos del {"<section>"}</h4>
                <button onClick={() => copyToClipboard("css-section")}>
                  Copiar
                </button>
              </div>
              <div className="css" id="css-section">
                <span>
                  .{template.defaultStyles[0]}
                  {" {"}
                </span>
                <span>background-color: {sectionStyles.backgroundColor};</span>
                <span>width: {sectionStyles.width};</span>
                <span>padding: {sectionStyles.padding};</span>
                <span>display: {sectionStyles.display};</span>
                {sectionStyles.display === 'flex' 
                  ? <>
                    <span>flex-flow: {sectionStyles.flexFlow};</span>
                    <span>justify-content: {sectionStyles.justifyContent};</span>
                    <span>align-items: {sectionStyles.alignItems};</span>
                    <span>align-items: {sectionStyles.alignItems};</span>
                    </>
                  : null
                }
                {sectionStyles.display === 'grid' 
                  ? <>
                    <span>grid-template-columns: {sectionStyles.gridTemplateColums};</span>
                    <span>grid-template-rows: {sectionStyles.gridTemplateRows};</span>
                    </>
                  : null
                }
                <span>{"}"}</span>
              </div>
            </div>

            <div className="css-article 300px">
              <div className="title-btn">
                <h4>Estilos de la {"<article>"}</h4>
                <button onClick={() => copyToClipboard("css-article")}>
                  Copiar
                </button>
              </div>
              <div className="css" id="css-article">
                <span>
                  .{template.defaultStyles[1]}
                  {" {"}
                </span>
                <span>display: {articleStyles.display};</span>
                <span>flex-direction: {articleStyles.flexDirection};</span>
                <span>justify-content: {articleStyles.justifyContent};</span>
                <span>gap: {articleStyles.gap};</span>
                <span>width: {articleStyles.width};</span>
                <span>{"}"}</span>
              </div>
            </div>

            <div className="css-h2">
              <div className="title-btn">
                <h4>Estilos de la {"<h2>"}</h4>
                <button onClick={() => copyToClipboard("css-h2")}>
                  Copiar
                </button>
              </div>
              <div className="css" id="css-h2">
                <span>
                  .{template.defaultStyles[2]}
                  {" {"}
                </span>
                <span>color: {h2Styles.color};</span>
                <span>font-size: {h2Styles.fontSize};</span>
                <span>font-weight: {h2Styles.fontWeight};</span>
                <span>
                  text-decoration: {getFirstWord(h2Styles.textDecoration)};
                </span>
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
                  .{template.defaultStyles[3]}
                  {" {"}
                </span>
                <span>color: {pStyles.color};</span>
                <span>font-size: {pStyles.fontSize};</span>
                <span>font-weight: {pStyles.fontWeight};</span>
                <span>
                  text-decoration: {getFirstWord(pStyles.textDecoration)};
                </span>
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

export default SectionComponent;
