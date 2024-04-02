import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import "./_adminControlPanel.scss";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../../images/Up_C0deTeam.png";
function AdminControlPanel() {
  const { authState } = useAuth();
  const [dynamicText, setDynamicText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const username = authState.user.username;
    let index = 0;

    const intervalId = setInterval(() => {
      setDynamicText(username.slice(0, index + 1));
      index++;

      if (index === username.length) {
        clearInterval(intervalId);
      }
    }, 400);

    return () => clearInterval(intervalId);
  }, [authState.user.username]);

  return <div className="container-admin">
  <div className="text-container">
  <h2>Hola {dynamicText}</h2>
        <h2 className="highlight">Te damos la Bienvenida a nuestro Panel de Administración</h2>
        <h3>Como administrador, tu papel es fundamental para garantizar el funcionamiento óptimo de nuestra plataforma y mantenerla en constante evolución. Entre tus responsabilidades se encuentran:</h3>
        <Link className="link" to="/adminDesignsManagement">Gestión de Diseños</Link>
        <Link to="/adminUserManagement">Gestión de Usuarios</Link>

</div>
<div className="image-container">
  <img className="imageAdmin" src={logo} alt="adminEffect"/>
  </div>
  </div>
}

export default AdminControlPanel;
