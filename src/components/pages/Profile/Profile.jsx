import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useLocation } from "react-router-dom";
import "./_profile.scss";
import defaultUser from '../../../images/default-user.png';

const Profile = () => {
  const { authState, patchUser, setAuthState } = useAuth();
  
  const location = useLocation();
  const isUserArea = location.pathname === "/user-area";

  const [showEditForm, setShowEditForm] = useState(false);

  const [newUsername, setNewUsername] = useState("");
  const [newPicture, setNewPicture] = useState(null);

  const handleChangeUsername = (event) => {
    setNewUsername(event.target.value);
  };

  const handleFileChange = (event) => {
    setNewPicture(event.target.files[0]);
  };

  const handleUserEdit = async (event) => {
    event.preventDefault();

    try {
      const userData = {};

      if (newUsername) {
        userData.username = newUsername;
      }

      if (newPicture) {
        userData.image = newPicture;
      }

      await patchUser(authState.user._id, userData);

      setNewUsername("");
      setNewPicture(null);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const toggleEditForm = () => {
    setShowEditForm((prevState) => !prevState);
  };

  if (!authState.user) {
    return <div>Cargando...</div>;
  }

  return (
    <section className={isUserArea ? "profile-container-myarea" : "profile-container"}>
      <div className="profile-id-image-container">
        {authState.user.image 
          ? <img className="profile-id-image" alt="" src={authState.user.image} />
          : <img className="profile-id-image" alt="" src={defaultUser} />}
        
      </div>
      <div className="profile-info">
        <h3 className="profile-id-username">{authState.user.username}</h3>
        <h4 className="profile-id-name">{authState.user.name}</h4>
        <h4 className="profile-id-surname">{authState.user.surname}</h4>
        <h4 className="profile-id-email">{authState.user.email}</h4>
      </div>
      <span className="edit-span" onClick={toggleEditForm}>Editar Información</span>
      <div className={`edit-profile-form ${showEditForm ? "show" : ""}`}>
        <form onSubmit={handleUserEdit}>
          <div className="input-area">
            <label htmlFor="newUsername">Nuevo username:</label>
            <input
              type="text"
              id="newUsername"
              name="newUsername"
              value={newUsername}
              onChange={handleChangeUsername}
              maxLength={10}
            />
          </div>
          <div className="input-area">
            <label htmlFor="newPicture">Nueva imagen de perfil:</label>
            <input
              type="file"
              id="newPicture"
              name="newPicture"
              onChange={handleFileChange}
            />
          </div>
          <div className="edit-profile-form-buttons">
            <button type="submit" className="form-button" onClick={toggleEditForm}>
              Guardar cambios
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Profile;
