import React, { useState, useEffect, useRef } from "react";
import "./_catalogue.scss";
import { Link } from "react-router-dom";
import { getDesigns } from "../../../api/axios/designs";
import gsap from 'gsap';

const Catalogue = ({ setIsLogged }) => {
  const [groupedTemplates, setGroupedTemplates] = useState({});
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDesigns();
        const fetchedTemplates = response.data;
        setGroupedTemplates(groupByElementType(fetchedTemplates));
        setDataLoaded(true);
      } catch (error) {
        console.error("Error fetching designs:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setIsLogged(!!token);
  }, [setIsLogged]);

  const groupByElementType = (designsToGroup) => {
    return designsToGroup.reduce((grouped, template) => {
      (grouped[template.elementType] = grouped[template.elementType] || []).push(template);
      return grouped;
    }, {});
  };

  const animatedCatalogue = useRef(null);

  useEffect(() => {
    if (dataLoaded && animatedCatalogue.current) {
      const elementsToAnimate = animatedCatalogue.current.querySelectorAll(".pack");
      console.log(elementsToAnimate)
      gsap.from(elementsToAnimate, {
        scale: 0,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    }
  }, [dataLoaded]);

  function capitalizeFirstLetter(text) {
    if (!text) {
      return "";
    }
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  const templateToDesign = (template) => {
    const modifiedTemplate = { ...template };
    modifiedTemplate.template = false;
    return modifiedTemplate;
  };

  return (
    <main className="container-catalogue" ref={animatedCatalogue}>
      <h2>Catálogo de Diseños</h2>
      {Object.entries(groupedTemplates).map(
        ([elementType, templates]) =>
          elementType !== "button" && (
            <section
              key={elementType}
              className={`container-packs ${elementType}`}
            >
              {elementType !== "button" && (
                <h3>{`Packs de ${capitalizeFirstLetter(elementType)}`}</h3>
              )}
              <div className="packs">
                {templates.map(
                  (template, index) =>
                    template.template &&
                    template.elementType !== "button" && (
                      <Link
                        key={index}
                        className={`pack ${elementType}`}
                        to={`/catalogue/template-${elementType}s/${template._id}`}
                        state={{
                          templateData: templateToDesign(template),
                          url: window.location.pathname
                        }}
                      >
                        <div className={`identifier ${template.elementType}`}></div>
                        <img src={template.image} alt={`imagen de ${template.nameDesign}`} />
                        <h4>{template.nameDesign}</h4>
                      </Link>
                    )
                )}
              </div>
            </section>
          )
      )}
    </main>
  );
};

export default Catalogue;
