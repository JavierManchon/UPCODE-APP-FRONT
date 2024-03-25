import React from 'react';
import './_buttonSaveDesigns.scss';
import { useAuth } from '../../context/AuthContext';
import { createDesign } from '../../../api/axios/designs';

const ButtonSaveDesigns = ({ designToSave }) => {
    const { authState } = useAuth();

    const postDesign = async () => {
        try {
            console.log(designToSave)
            const response = await createDesign(authState.user._id, designToSave);
            const updatedTemplate = response.data;
            console.log(updatedTemplate);
        } catch (error) {
            console.error('Error fetching designs:', error);
        }
    };

    return (
        <button type='button' onClick={() => postDesign(designToSave)} >Guardar Diseño</button> 
    );
};

export default ButtonSaveDesigns;
