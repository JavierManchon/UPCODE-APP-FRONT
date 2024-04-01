# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh



Documentación del Proyecto

1. Introducción y Visión General

Este proyecto es una plataforma de gestión de diseño de código, desarrollada utilizando React para el frontend, Node.js para el backend y MongoDB como base de datos. Su objetivo principal es proporcionar una herramienta intuitiva para la creación y gestión en diseños de código html y css, permitiendo a los usuarios guardar sus creaciones y modificarlos en tiempo real.

Objetivo
Proveer una solución integral para equipos de diseño que buscan agilizar el proceso de diseño mediante una plataforma accesible y fácil de usar.

Alcance del Proyecto
El proyecto abarca el desarrollo de un frontend interactivo con React, un backend con Node.js y una base de datos NoSQL con MongoDB. Incluye funcionalidades clave como autenticación de usuarios gestión de diseños en tiempo real.

2. Requisitos
Node.js v14.17.0 o superior.
MongoDB v4.4 o superior.
npm para el manejo de paquetes.

Dependencias Tecnológicas Externas
React para el desarrollo del frontend.
Express.js como framework de servidor para Node.js.
Mongoose para la modelación de objetos con MongoDB.


3. Configuración y Instalación
Asegúrate de tener MongoDB corriendo localmente o en un servidor remoto.


Instalación:

bash
Copy code
git clone https://github.com/ejemplo/mi-proyecto.git
cd mi-proyecto
npm install
npm run dev

4. Estructura del Proyecto
El proyecto sigue una estructura modular para separar las preocupaciones y facilitar el mantenimiento. La estructura de directorios es la siguiente:

frontend: Contiene el código fuente del frontend desarrollado con React.
components: Componentes de React reutilizables.
services: Lógica para comunicación con el backend.
styles: Archivos SCSS para estilos.

backend: Código fuente del servidor Node.js.
controllers: Lógica de controladores para manejar peticiones.
models: Modelos de Mongoose para estructuras de datos.
routes: Definición de rutas del API REST.


5. Guía de Uso
Crear un Diseño
Inicia sesión o regístrate.
Navega a "Crear Diseño" desde el menú principal.
Completa el formulario con los detalles del diseño .
Haz clic en "Guardar Diseño" para añadir el diseño a la plataforma del usuario .


6. API y Endpoints
GET /api/diseños: Obtiene todos los diseños.
POST /api/diseños: Crea un nuevo diseño. Parámetros: nombre, descripcion, imagenUrl.
DELETE /api/diseños/:id: Elimina un diseño por su ID.


9. Despliegue
Para desplegar en producción, ejecuta npm run dev en el directorio /frontend para preparar la build de producción de React. Despliega el backend y frontend según las instrucciones .

10. Licencia
Este proyecto se desarrolló con fines educativos dentro de un bootcamp de programación y no está destinado a la distribución o uso comercial. Por tanto, no se incluye una licencia de software abierto.

Créditos y Reconocimientos
Agradecimientos especiales a todos los colaboradores y a las comunidades detrás de React, Node.js y MongoDB por su apoyo y recursos que han hecho posible este proyecto.

Justo abajo os dejamos la Guía de Uso UpCode , donde está la información más detallada para poder entender el funcionamiento de la app .



Guía de Uso UpCode


Hay varios puntos a tener en cuenta que creemos que os pueden facilitar la labor a la hora de entender el funcionamiento de la app y de poder leer el flujo de datos que hay entre los distintos componentes .


FRONT 

En esta parte , distribuimos los archivos en la carpeta SRC de la siguiente manera : 

API AXIOS : 

Las peticiones que hacemos de cada modelo las configuramos en AXIOS de manera independiente .


axios.js
Define la configuración base de Axios para realizar llamadas HTTP a una API, incluyendo la base URL y headers comunes como el tipo de contenido y tokens de autorización almacenados en sessionStorage para las solicitudes.

auth.js
Este archivo contiene funciones para manejar la autenticación de usuarios. Incluye operaciones como registro, inicio de sesión, cierre de sesión, y la obtención de datos del usuario logueado, interactuando con una API mediante Axios para realizar estas acciones.

designs.js & tickets.js
Ambos archivos definen funciones para interactuar con endpoints específicos de una API relacionados con "diseños" y "tickets", respectivamente. Incluyen operaciones para obtener, crear, modificar y eliminar diseños o tickets, utilizando Axios para las peticiones HTTP.


AUTHCONTEXT

Usamos el contexto para la gestión de autenticación en la app .


AuthContext.jsx
Define un contexto de autenticación en React, proporcionando un mecanismo para compartir el estado de autenticación y funciones relacionadas (como iniciar sesión o cerrar sesión) entre componentes de tu aplicación, facilitando el manejo de la sesión del usuario.


LAYOUT 

Aquí usamos herramientas transversales a toda la app . 

AsideTickets.jsx
Este componente de React implementa la visualización y lógica para unA sección que muestra tickets. Permitir a los usuarios interactuar con los tickets, visualizar detalles y cambiar su estado.

ButtonSaveDesigns.jsx
Componente de React que implementa un botón para guardar diseños .Este botón interactua con la API para guardar cambios en un diseño, proporcionando feedback visual al usuario mediante el uso de estilos.

Footer.jsx
Define el componente de pie de página (footer) de la aplicación, incluyendo información de contacto y enlaces a redes sociales. Este componente mejora la estructura y navegabilidad de la aplicación, proporcionando información relevante sobre los desarrolladores de la app .

Header.jsx & HeaderAdmin.jsx
Header.jsx implementa el componente de encabezado común para la mayoría de las páginas de tu aplicación, incluyendo navegación y enlaces a secciones principales. HeaderAdmin.jsx es una variante del encabezado diseñada específicamente para usuarios administradores, con enlaces y funciones adicionales relevantes para la gestión del app.

InfoTicketArea.jsx
Define un componente de React que muestra detalles sobre tickets . Este componente es crucial para la interfaz de usuario de las secciones relacionadas con la gestión o visualización de tickets, ofreciendo una vista detallada y acciones relacionadas.



MIDDLEWARES

Aquí configuramos la protección de las rutas .

AdminMiddleware.jsx & AuthMiddleware.jsx
Estos archivos contienen componentes y funciones de middleware de React para manejar la lógica de autorización o autenticación. AdminMiddleware.jsx se encargaría de verificar si el usuario tiene privilegios de administrador antes de permitir el acceso a ciertas rutas o componentes. AuthMiddleware.jsx verifica si un usuario está autenticado para acceder a rutas protegidas.


PAGES

Aquí tenemos las ubicaciones de las rutas .

ADMIN

Aquí configuramos todo lo relacionado con los usuarios administradores .

AdminControlPanel.jsx
AdminControlPanel.jsx implementa el panel de control en React, proporcionando acceso a las diferentes herramientas y secciones de administración, como gestión de usuarios, diseño, y tickets.

DesignManagement.jsx
 DesignManagement.jsx es el componente que permite a los administradores crear, editar, eliminar y organizar diseños, facilitando la gestión del contenido visual de la aplicación.

TicketsManagement.jsx
TicketsManagement.jsx implementa esta funcionalidad, permitiendo a los administradores revisar, responder y organizar los tickets de manera eficiente.

UserManagement.jsx
UserManagement.jsx permite a los administradores gestionar los usuarios de la aplicación, incluyendo la creación, edición y eliminación de cuentas de usuario, asegurando una administración efectiva de los accesos y roles dentro de la plataforma.




AUTENTICATION

Aquí introducimos los formularios de acceso y registro para los usuarios .

RegisterForm.jsx
RegisterForm.jsx es el componente que maneja la lógica del formulario de registro, validando la entrada del usuario y gestionando la comunicación con el backend para registrar nuevos usuarios.

LoginForm.jsx
LoginForm.jsx contiene la lógica para autenticar a los usuarios, permitiéndoles acceder a su cuenta mediante la verificación de sus credenciales.



CATALOGUE

Catalogue.jsx
Catalogue.jsx implementa el componente de catálogo en React, mostrando los productos y permitiendo a los usuarios interactuar con ellos .



USERAREA Y MYAREA

UserArea.jsx & MyAreaMobile.jsx
UserArea.jsx es un componente que proporciona una interfaz para la interacción de todos los usuario con su perfil, configuraciones o cualquier otra funcionalidad relacionada con los diseños guardados, esto solo para usuarios PREMIUM . MyAreaMobile.jsx adapta o complementa esta funcionalidad para usuarios de dispositivos móviles, reorganizando elementos y simplificando la interfaz para mejorar la experiencia móvil .

COMPONENTES 


SectionComponent.jsx,FormComponent.jsx,NavComponent.jsx,//ButtonComponent.jsx//,FigureComponent.jsx,DivComponent.jsx,FooterComponent.jsx

Son los componente de React que construyen los paquetes, manejan la entrada de datos, y  gestionan la validación y envío de estos diseños.



En estos componentes queremos hacer especial incapié . Es cardinal que podáis entender el funcinamiento y el flujo de datos de estos si queréis seguir desarrollando y aumentar el código que podemos generar desde la app .


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Ejemplo del componente DIV : 

CÓDIGO : 

// Importación de los hooks y componentes necesarios de React, así como estilos y otras utilidades.
import React, { useEffect, useState, useRef } from "react";
import "./_divComponent.scss"; // Estilos específicos para este componente
import { Link, useLocation } from "react-router-dom"; // Navegación y acceso al estado de la ubicación actual
import ButtonSaveDesigns from "../../layout/ButtonSaveDesigns/ButtonSaveDesigns"; // Componente personalizado para guardar diseños
import { useAuth } from "../../context/AuthContext"; // Hook de contexto para la autenticación
import _ from "lodash"; // Biblioteca de utilidades para operaciones en objetos y arrays

// Definición del componente DivComponent, recibiendo propiedades.
const DivComponent = ({ isLogged }) => {
  // Uso de contextos y estados para manejar la autenticación, navegación y estados locales.
  const { authState } = useAuth(); // Estado de autenticación
  const location = useLocation(); // Ubicación actual en la app
  const previousRoute = location.state.url; // Ruta anterior desde donde el usuario llegó
  const template = location.state.templateData; // Datos del template actual
  console.log(template); // Logging de los datos del template para depuración
  
  // Estados para controlar la visualización de los códigos CSS, HTML y la visualización del diseño
  const [designToSave, setDesignToSave] = useState(); // Diseño actual que se puede guardar
  const [showCss, setShowCss] = useState(false); // Controla la visibilidad del código CSS
  const [showHtml, setShowHtml] = useState(false); // Controla la visibilidad del código HTML
  const [showVisual, setShowVisual] = useState(true); // Controla la visibilidad de la visualización del diseño
  const visualButtonRef = useRef(null); // Referencia al botón de visualización para poder hacer scroll hacia él

  // Funciones para manejar los eventos de clic en los botones que controlan qué se muestra en el area de visualización 
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

  // Efecto para actualizar el diseño a guardar cada vez que cambien los datos del template
  useEffect(() => {
    setDesignToSave(location.state.templateData);
  }, [location.state.templateData]);

  // Función para actualizar el template basado en un camino (path) y valor específicos
  const updateTemplate = (path, value) => {
    setDesignToSave((currentTemplate) => {
      let updatedTemplate = _.cloneDeep(currentTemplate); // Clonación profunda para no modificar el estado directamente

      _.set(updatedTemplate, "edit.textArray", pValues); // Actualiza el array de textos del template

      _.set(updatedTemplate, path, value); // Actualiza el valor específico en el path dado
      return updatedTemplate; // Retorna el template actualizado
    });
  };

  // Estado para controlar el número de párrafos y sus valores
  const [numP, setNumP] = useState(template.defaultContent.countChildren); // Número inicial de párrafos
  const [pValues, setPValues] = useState(() => { // Valores iniciales de los párrafos
    if (template.edit && template.edit.textArray.length > 0) {
      return [...template.edit.textArray];
    } else {
      return Array.from({ length: numP }, () => "Item"); // Retorna un array con "Item" repetido numP veces
    }
  });

  // Efecto para actualizar el array de textos del diseño cada vez que cambie pValues
  useEffect(() => {
    setDesignToSave((currentTemplate) => {
      let updatedTemplate = _.cloneDeep(currentTemplate);
      _.set(updatedTemplate, "edit.textArray", pValues);
      return updatedTemplate;
    });
  }, [pValues]);

  // Estados para controlar los estilos del div y de los párrafos
  const [bgColor, setBgColor] = useState(template.edit.bgColorDiv ? template.edit.bgColorDiv : ""); // Color de fondo
  const [fontColor, setFontColor] = useState(template.edit.colorText ? template.edit.colorText : ""); // Color de fuente
  const [fontSize, setFontSize] = useState(template.edit.fontSizeText ? template.edit.fontSizeText : ""); // Tamaño de fuente
  const [fontWeight, setFontWeight] = useState(template.edit.fontWeightText ? template.edit.fontWeightText : ""); // Peso de la fuente
  const [divStyles, setDivStyles] = useState([]); // Estilos calculados del div
  const [pStyles, setPStyles] = useState([]); // Estilos calculados de los párrafos

  // Funciones para manejar cambios en los inputs de estilos
  const handlePChange = (index) => (event) => { // Cambio en el valor de un párrafo
    const newPValues = [...pValues];
    newPValues[index] = event.target.value;
    setPValues(newPValues);
    updateTemplate("edit.textArray", event.target.value);
  };

  const handleBgColor = (event) => { // Cambio en el color de fondo
    updateTemplate("edit.bgColorDiv", event.target.value);
    setBgColor(event.target.value);
  };

  const handleFontColor = (event) => { // Cambio en el color de fuente
    updateTemplate("edit.colorText", event.target.value);
    setFontColor(event.target.value);
  };

  const handleFontSize = (event) => { // Cambio en el tamaño de fuente
    updateTemplate("edit.fontSizeText", event.target.value);
    setFontSize(`${event.target.value}px`);
  };

  const handleFontWeight = (newValue) => { // Cambio en el peso de la fuente
    setFontWeight(newValue);
  };

  const handleNumP = (event) => { // Cambio en el número de párrafos
    updateTemplate("defaultContent.countChildren", event.target.value);
    setNumP(event.target.value);
  };




//En esta parte del código, el componente DivComponent maneje dinámicamente los estilos de un div
 y sus párrafos internos (elementos <p>), reflejando los cambios en tiempo real según las interacciones del usuario.

  const visualDiv = useRef(null); //useRef es útil cuando necesitas acceder directamente a un nodo del DOM para leer valores o invocar métodos imperativos sobre el elemento.
//La inicialización de estas referencias con null indica que aún no apuntan a ningún elemento del DOM, lo cual cambiará una vez que el componente se haya montado y los elementos correspondientes estén disponibles en el DOM.
  useEffect(() => { //useEffect se utiliza para calcular y almacenar los estilos CSS aplicados a visualDiv y visualP una vez que estos elementos están disponibles en el DOM. 
    if (visualDiv.current) { 
      const computedDivStyles = window.getComputedStyle(visualDiv.current);//Utiliza window.getComputedStyle para obtener los estilos aplicados al elemento referenciado por visualDiv.current. Los estilos calculados se almacenan en el estado divStyles//
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

//En conjunto, estas secciones del código demuestran cómo manejar elementos del DOM de manera imperativa en React para leer sus estilos computados y responder a cambios en tiempo real.

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

  // Función para copiar al portapapeles el contenido de un elemento
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

  // Renderizado del componente con opciones de estilizado, visualización de códigos y botones condicionales para guardar diseños
  return (
    <div className="container-pages-default-styles">
      // Contenedores para editar estilos, mostrar códigos y visualizar el diseño
      <div className="styles-editor">
        // Inputs para editar estilos del div y párrafos
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
        <span onClick={handleCss}>Mostrar código</span>
      </div>

      <div className="container-containers">
        <div className="container-editor">
          // Visualización de la estructura HTML con entradas para editar el texto de los párrafos
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

          <span onClick={handleHtml}>Mostrar código</span>
        </div>

        <div className="container-render">
          // Contenedor para la visualización del diseño con los estilos aplicados
          <div
            className={`container-renderized_visual ${
              showVisual ? "" : "hidden"
            }`}
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

          // Contenedor para mostrar el código HTML del diseño
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

          // Contenedor para mostrar los estilos CSS aplicados al div y párrafos
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
                {Object.entries(divStyles).map(([key, value]) => (
                  <span key={key}>{`${key}: ${value};`}</span>
                ))}
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
                {Object.entries(pStyles).map(([key, value]) => (
                  <span key={key}>{`${key}: ${value};`}</span>
                ))}
                <span>{"}"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      // Botón para volver a mostrar la visualización del diseño
      <button ref={visualButtonRef} className={`no-visual ${!showVisual ? 'btn-visual' : ''}`} onClick={handleVisual}>Mostrar visualizado</button>

      // Botones condicionales para guardar diseños, mostrados solo si el usuario está autenticado y es premium, o para contratar la suscripción premium
      {isLogged && authState.user.isPremium && previousRoute === "/catalogue" ? (
        <ButtonSaveDesigns
          designToSave={designToSave}
          setDesignToSave={setDesignToSave}
        />
      ) : null}
      {isLogged && (!authState.user.isPremium) && previousRoute === "/catalogue" ? (
          <Link className="premiumsavedesign" to='/payments'>Hazte Premium</Link>
      ) : null}
    </div>
  );
};

export default DivComponent; // Exportación del componente para su uso en otras partes de la aplicación


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



PAYMENTS

Payments.jsx
Payments.jsx implementa la lógica de la interfaz de usuario para realizar pagos, interactuar con un procesador de pagos y manejar la validación y presentación de mensajes al usuario.


PROFILE

Profile.jsx
Profile.jsx es el componente que construye la página de perfil del usuario, permitiendo ver y editar información personal, cambiar la foto de perfil, y otras acciones relacionadas con la cuenta del usuario.




HOME 

Home.jsx
Home.jsx es el componente de React que construye la página de inicio integrando varios subcomponentes y utilizando los estilos definidos para crear una entrada atractiva y funcional para los usuarios.

TableComparationPremium.jsx
TableComparationPremium.jsx diseñado para mostrar comparaciones en forma de tabla, entre diferentes niveles de membresía . 

Slider.jsx
Slider.jsx es el componente que implementa la funcionalidad del slider, permitiendo a los usuarios navegar a través de una serie de imágenes de forma interactiva.

Description.jsx
Description.jsx construye el componente de descripción, organizando el contenido de manera efectiva y haciendo de cabecera para la home con una pequeña introducción y un vídeo demo de la app.



APP

App.jsx
El punto de entrada principal para tu aplicación React. Este archivo define la estructura de componentes de alto nivel y el enrutamiento dentro de tu aplicación, utilizando React Router para manejar la navegación entre distintas vistas o componentes.



CONTROLADOR

DesignsController.jsx
Este archivo contiene la lógica de React para controlar la visualización y manejo de datos relacionados con diseños a través de la API.



Aquí dejamos la información relativa al BACK :








BACKEND 


Archivos Principales

index.js
Descripción: Archivo principal que inicia el servidor Express, configura middleware como CORS, maneja rutas y errores globales.
Librerías Utilizadas: express, cors, dotenv, nodemailer.
Funcionalidades Principales:
Configuración de CORS para permitir solicitudes de cualquier origen.
Conexión a la base de datos MongoDB a través del módulo db.js.
Configuración de Cloudinary para manejo de imágenes.
Declaración de rutas para usuarios, productos, diseños y tickets.
Configuración del servidor para escuchar en el puerto definido en el archivo .env o 8084 por defecto.
Manejo de errores no capturados en las peticiones.
Rutas API:
/api/users, /api/products, /api/designs, /api/tickets: Rutas para la gestión de usuarios, productos, diseños y tickets, respectivamente.

db.js
Descripción: Configura y realiza la conexión a la base de datos MongoDB.
Librerías Utilizadas: mongoose, dotenv.
Funcionalidades Principales:
Carga de variables de entorno.
Conexión a MongoDB utilizando Mongoose.

Utilidades

config.js
Descripción: Configura Cloudinary para la gestión de imágenes.
Librerías Utilizadas: cloudinary.

Funcionalidades Principales:
Configura Cloudinary con las credenciales definidas en las variables de entorno.

nodemailer-config.js
Descripción: Configuración de Nodemailer para el envío de correos electrónicos.
Librerías Utilizadas: nodemailer.
Funcionalidades Principales:
Creación del transportador de Nodemailer con configuración para Gmail y autenticación mediante variables de entorno.

jwt.js
Descripción: Funciones para generar y verificar tokens JWT.
Librerías Utilizadas: jsonwebtoken.
Funcionalidades Principales:
Generación de tokens JWT para autenticación.
Verificación de tokens JWT.

validators.js
Descripción: Funciones para validar correos electrónicos y contraseñas.
Funcionalidades Principales:

Validación de formatos de correo electrónico y contraseña mediante expresiones regulares.
Helpers
generateID.js
Descripción: Generador de identificadores únicos.

Funcionalidades Principales:
Genera un ID único combinando un valor aleatorio y la fecha actual.
error.js
Descripción: Función para estandarizar la creación y manejo de errores.
Funcionalidades Principales:
Permite definir errores con código y mensaje personalizados.





Aquí tienes la documentación para los archivos adicionales del back end:




Middleware y Modelos

auth.middleware.js
Descripción: Middleware para autenticar rutas mediante JWT.
Funcionalidades:
Extrae el token JWT de las cabeceras de la solicitud.
Verifica la validez del token.
Obtiene la información del usuario asociado al token y la adjunta al objeto req para su uso en controladores subsecuentes.

deleteFile.middleware.js
Descripción: Middleware para eliminar imágenes de Cloudinary.
Funcionalidades:
Recibe la URL de una imagen.
Extrae el public_id de la imagen basándose en su URL.
Utiliza cloudinary.uploader.destroy para eliminar la imagen de Cloudinary.

updateFile.middleware.js
Descripción: Middleware que utiliza multer y multer-storage-cloudinary para gestionar la carga de archivos a Cloudinary.
Funcionalidades:
Configura un almacenamiento de Cloudinary para definir la carpeta de destino y los formatos permitidos de los archivos.
Crea una instancia de multer configurada para usar este almacenamiento.



designs.model.js
Descripción: Define el esquema para los diseños en la base de datos.
Campos: Amplios y detallados, incluyen nombre del diseño, tipo de elemento, si es una plantilla, imagen, contenido por defecto, estilos por defecto, ID de usuario, tickets asociados, y campos para edición de diseño.

tickets.model.js
Descripción: Modelo de Mongoose para tickets.
Campos: Incluye título, descripción, comentarios, estado, captura de pantalla, usuario y timestamps.
Validaciones:
El estado del ticket es un enumerado con valores "Enviado", "En proceso" y "Completado".

users.model.js
Descripción: Modelo de Mongoose para usuarios.
Campos: Incluye nombre, apellido, nombre de usuario, contraseña, token, correo electrónico, imagen, confirmación, administrador, premium, proyectos, diseños y tickets.
Funcionalidades:
Encripta la contraseña antes de guardarla en la base de datos.
Provee un método para verificar la contraseña.






Rutas

designs.routes.js
Descripción: Gestiona las rutas para las operaciones relacionadas con los diseños.
Endpoints: Incluye endpoints para crear, eliminar, editar, obtener todos los diseños, obtener diseño por ID y obtener diseños por usuario.

tickets.routes.js
Descripción: Define rutas para la gestión de tickets, incluyendo obtener todos los tickets, obtener, publicar, editar y eliminar un ticket, y obtener tickets por usuario.
Autenticación: Utiliza el middleware isAuth para proteger las rutas.
Carga de Archivos: Utiliza upload.single('screenshot') para la carga de capturas de pantalla.

users.routes.js
Descripción: Define rutas para la gestión de usuarios, incluyendo registro, inicio de sesión, cierre de sesión, confirmación, actualización de contraseña, verificación de administrador, obtención y actualización de información de usuario, y eliminación de usuario.
Autenticación: Algunas rutas requieren autenticación a través del middleware isAuth.
Carga de Archivos: Utiliza upload.single('image') para la carga de imágenes de perfil.




Controladores

Controladores: designs.controllers.js
Descripción: Contiene la lógica para manejar las solicitudes de diseños.
Operaciones: Crear, eliminar, editar, obtener todos los diseños, obtener diseño por ID y obtener diseños por usuario.

tickets.controllers.js
Descripción: Contiene controladores para manejar las solicitudes de tickets, incluyendo obtener, crear, actualizar y eliminar tickets, así como obtener tickets por usuario.
Funcionalidades:
Las operaciones de creación y actualización de tickets soportan la carga de capturas de pantalla.
La eliminación de tickets incluye la eliminación opcional de la captura de pantalla asociada desde Cloudinary.

users.controllers.js
Descripción: Contiene controladores para manejar las solicitudes relacionadas con los usuarios, incluyendo registro, confirmación de correo electrónico, inicio y cierre de sesión, actualización de contraseña, verificación de rol de administrador, y obtención, actualización y eliminación de información de usuario.
Funcionalidades:
El registro y la actualización de contraseña incluyen la generación y manejo de tokens.
La confirmación de correo electrónico cambia el estado de confirmación del usuario.
La actualización de información de usuario soporta la carga de imágenes de perfil.
