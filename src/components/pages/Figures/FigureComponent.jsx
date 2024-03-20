import React, { useEffect, useState, useRef } from "react";
import "../../../css/app.scss";
import "../Figures/_figureComponent.scss"

const FigureComponent = ({ template }) => {
  
  const [colorText, setColorText] = useState(template.edit.colorText ? template.edit.colorText : "");
  const [fontSize, setFontSize] = useState(template.edit.fontSize ? `${template.edit.fontSize}px` : "");
  const [fontWeight, setFontWeight] = useState(template.edit.fontWeight ? template.edit.fontWeight : "");
  const [textDecoration, setTextDecoration] = useState(template.edit.textDecoration ? template.edit.textDecoration : "");
  const [figureStyles, setFigureStyles] = useState({});
  const [imgStyles, setImgStyles] = useState({});
  const [figcaptionStyles, setFigcaptionStyles] = useState({});
  const [imgUrl, setImgUrl] = useState(template.edit.imgUrl ? template.edit.imgUrl : "https://free4kwallpapers.com/uploads/originals/2020/08/15/-programming-wallpaper.png");
  const [figcaption, setFigcaption] = useState(template.edit.figcaption ? template.edit.figcaption : "texto predefinido");

  const handleFontColor = (event) => {
    setColorText(event.target.value);
  };

  const handleFontSize = (event) => {
    setFontSize(`${event.target.value}px`);
  };

  const handleFontWeight = (event) => {
    setFontWeight(event.target.value);
  };

  const handleTextDecoration = (event) => {
    setTextDecoration(event.target.value);
  };

  const handleImgUrlChange = (event) => {
    setImgUrl(event.target.value);
  };

  const handleFigcaptionChange = (event) => {
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
        maxWidth:"350px",
        height: computedFigureStyles.height,
        padding: computedFigureStyles.padding,
        flexDirection: computedFigureStyles.flexDirection,
      });
    }
  }, [visualFigure]);

  const visualImg = useRef(null);
  useEffect(() => {
    if (visualImg.current) {
      const computedImgStyles = window.getComputedStyle(visualImg.current);
      setImgStyles({
        width: "100%",
        flexDirection: computedImgStyles.flexDirection,
      });
    }
  }, [visualImg]);

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
      });
    }
  }, [visualFigcaption, colorText, fontSize, fontWeight, textDecoration]);

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
        <label htmlFor="imgUrl">URL de la imagen:</label>
        <input
          type="text"
          id="imgUrl"
          value={imgUrl}
          onChange={handleImgUrlChange}
        />

        <label htmlFor="figcaption">Figcaption:</label>
        <input
          type="text"
          id="figcaption"
          value={figcaption}
          onChange={handleFigcaptionChange}
        />
      </div>
      <div className="styles-editor">
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
            max={30}
            onChange={handleFontSize}
          />
        </label>

        <label htmlFor="fontWeight">
          <p>Negrita</p>
          <div>
            <input
              type="radio"
              name="fontWeight"
              value="bold"
              onChange={handleFontWeight}
            />
            <input
              type="radio"
              name="fontWeight"
              value="normal"
              onChange={handleFontWeight}
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
              onChange={handleTextDecoration}
            />
            <input
              type="radio"
              name="textDecoration"
              value="none"
              onChange={handleTextDecoration}
            />
          </div>
        </label>
      </div>


      <div className="container-renderized_visual">
        <figure className={template.defaultStyles[0]} ref={visualFigure}>
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

      <div className="container-renderized_html">
        <div className="title-btn">
          <h4>HTML</h4>
          <button onClick={() => copyToClipboard("html")}>Copiar</button>
        </div>
        <div id="html" className="html">
          <span>{"<figure>"}</span>
          <br></br>
          <span>{'<img src="' + imgUrl + '" alt="Image" />'}</span>
          <span>{"<figcaption>" + figcaption + "</figcaption>"}</span>
          <br></br>
          <span>{"</figure>"}</span>
        </div>
      </div>

      <div className="container-renderized_css">
        <div className="css-fig">
          <div className="title-btn">
            <h4>Estilos del {"<figure>"}</h4>
            <button onClick={() => copyToClipboard("css-fig")}>Copiar</button>
          </div>
          <div className="css" id="css-fig">
            <span>
              .{template.defaultStyles[0]}
              {" {"}
            </span>
            <span>width: {figureStyles.width};</span>
            <span>maxWidth: {figureStyles.maxWidth};</span>
            <span>padding: {figureStyles.padding};</span>
            <span>height: {figureStyles.height};</span>
            <span>{"}"}</span>
          </div>
        </div>
        <div className="css-img">
          <div className="title-btn">
            <h4>Estilos de la {"<img>"}</h4>
            <button onClick={() => copyToClipboard("css-img")}>Copiar</button>
          </div>
          <div className="css" id="css-img">
            <span>
              .{template.defaultStyles[1]}
              {" {"}
            </span>
            <span>width: {imgStyles.width};</span>
            
            <span>{"}"}</span>
          </div>
        </div>
        <div>
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
              <span>{`text-decoration: ${figcaptionStyles.textDecoration};`}</span>
              <span>{"}"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FigureComponent;



