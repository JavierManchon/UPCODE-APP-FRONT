import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';


function AdminControlPanel() {
  const { authState } = useAuth();

  return (
    <div>
      <h2>Bienvenido {authState.user.username}</h2>
      <h3>Esta es tu zona de administracion de usuarios y diseños</h3>
      <h4>Desde este area podrás:</h4>
      <ul>
        <li>Bloquear a usuarios temporalemnte.</li>
        <li>Borrar diseños y usuarios</li>
        <li>Gestionar tickets de usuarios</li>
      </ul>
    </div>
  );
}

export default AdminControlPanel;
