import React from 'react';
import './_premiumContent.scss';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate de react-router-dom

const PremiumContent = () => {
    const navigate = useNavigate(); // Hook para navegar

    // Función para manejar el clic en el botón
    const handleButtonClick = () => {
        navigate('/ruta-destino'); // Actualiza con tu ruta de destino
    };

    return (
        <div className="premium-content">
            <button onClick={handleButtonClick}>Accede a Mi Área </button>
        </div>
    );
};

export default PremiumContent;
