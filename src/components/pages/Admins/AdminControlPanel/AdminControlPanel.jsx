import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';


function AdminControlPanel() {
  const { authState } = useAuth();

  return (
    <div>
    <h2>Bienvenido {authState.user.username}</h2>
    </div>
  );
}

export default AdminControlPanel;
