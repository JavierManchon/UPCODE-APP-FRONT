import React from "react";
import "./_footer.scss";
import { Link } from "react-router-dom";
import Alvaro from "../../../images/Admins/Alvaro.png";
import Javier from "../../../images/Admins/Javier.png";
import Mauro from "../../../images/Admins/Mauro.png";
import Santiago from "../../../images/Admins/Santiago.png";
import Linkedin from "../../../images/linkedin.png";
import Github from "../../../images/github.png";

const Header = () => {
  return (
    <footer className="container-admins">
      <ul className="admin-items">
        <li>
          <div className="name-img">
            <p>Javier Manchón</p>
            <div className="img">
              <img src={Javier} alt="imagen de Javier" />
            </div>
          </div>
          <div className="links">
            <a href="https://github.com/JavierManchon" target="_blank" rel="noopener noreferrer">
              <img src={Github} alt="" />
            </a>
            <a href="https://www.linkedin.com/in/javier-manchon/" target="_blank" rel="noopener noreferrer">
              <img src={Linkedin} alt="" />
            </a>
          </div>
        </li>
        <li>
          <div className="name-img">
            <p>Álvaro Escribano</p>
            <div className="img">
              <img src={Alvaro} alt="imagen de Álvaro" />
            </div>
          </div>
          <div className="links">
            <a href="https://github.com/AlvaroEM92" target="_blank" rel="noopener noreferrer">
              <img src={Github} alt="" />
            </a>
            <a href="https://www.linkedin.com/in/alvaro-jose-escribano-mayo-48a317146/" target="_blank" rel="noopener noreferrer">
              <img src={Linkedin} alt="" />
            </a>
          </div>
        </li>
        <li>
          <div className="name-img">
            <p>Mauro Quintana</p>
            <div className="img">
              <img src={Mauro} alt="imagen de Mauro" />
            </div>
          </div>
          <div className="links">
            <a href="https://github.com/Mauzoom03" target="_blank" rel="noopener noreferrer">
              <img src={Github} alt="" />
            </a>
            <a href="https://www.linkedin.com/in/mauro-quintana/" target="_blank" rel="noopener noreferrer">
              <img src={Linkedin} alt="" />
            </a>
          </div>
        </li>
        <li>
          <div className="name-img">
            <p>Santiago Martínez</p>
            <div className="img">
              <img src={Santiago} alt="imagen de Santiago" />
            </div>
          </div>
          <div className="links">
            <a href="https://github.com/Roissm90" target="_blank" rel="noopener noreferrer">
              <img src={Github} alt="" />
            </a>
            <a href="https://www.linkedin.com/in/roissm90/" target="_blank" rel="noopener noreferrer">
              <img src={Linkedin} alt="" />
            </a>
          </div>
        </li>
      </ul>
    </footer>
  );
};

export default Header;
