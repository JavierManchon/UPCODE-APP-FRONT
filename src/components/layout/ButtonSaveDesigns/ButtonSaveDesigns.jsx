import React, { useEffect } from 'react';
import './_buttonSaveDesigns.scss';
import { useAuth } from '../../context/AuthContext';
import { createDesign } from '../../../api/axios/designs';
import { getUserLogged } from '../../../api/axios/auth';

const ButtonSaveDesigns = ({ designToSave }) => {
    const { authState } = useAuth();
    useEffect(() => {
        const getUser = async() => {
            try {
                console.log(authState.user._id)
                const response = await getUserLogged(authState.user._id);
                console.log(response)
            }catch (error) {
                console.error(error)
            }
        }
        getUser()
    }, [])
    
    const postDesign = async () => {
        try {
            const response = await createDesign(authState.user._id, designToSave);
            const updatedTemplate = response.data;
            console.log(updatedTemplate);
            console.log(authState.user)
        } catch (error) {
            console.error('Error fetching designs:', error);
        }
    };

    return (
        <button type='button' onClick={() => postDesign(designToSave)} >Guardar Diseño</button> 
    );
};

export default ButtonSaveDesigns;
