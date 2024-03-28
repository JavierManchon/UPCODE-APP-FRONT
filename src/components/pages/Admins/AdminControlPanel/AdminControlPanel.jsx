import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import "./_adminControlPanel.scss";
import { useNavigate } from "react-router-dom";
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

  const handleButtonClick = () => {
    navigate('/user-area'); 
};
  return (
    <div className="container">
      <div className="content1">
        <div className="image-container">
          <h2 className="username">Bienvenido {dynamicText} </h2>
          <img
            className="AvatarImg"
            src={"/src/images/upcode.png"}
            alt="User Avatar"
          />
        </div>
      </div>
      <div className="content2">
        <div className="text-container">
          <h3 className="title">
            Esta es tu zona de administración de usuarios y diseños
          </h3>
          <h4 className="subtitle">Desde este área podrás:</h4>
          <ul className="list-container">
            <li>Borrar diseños y usuarios.</li>
            <li>Gestionar tickets de usuarios.</li>
            <li>Enviar notificaciones a usuarios.</li>
            <li>Actualizar información de usuarios.</li>
          </ul>
        </div>
      </div>
    </div>
    
  );
}

export default AdminControlPanel;
