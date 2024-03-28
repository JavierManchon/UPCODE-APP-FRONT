import React, { useEffect } from 'react';
import './_buttonSaveDesigns.scss';
import { useAuth } from '../../context/AuthContext';
import { createDesign } from '../../../api/axios/designs';
import { getUserLogged } from '../../../api/axios/auth';

const ButtonSaveDesigns = ({ designToSave, setDesignToSave }) => {
    const { authState, setAuthState } = useAuth();
    // useEffect(() => {
    //     const getUser = async() => {
    //         try {
    //             const response = await getUserLogged(authState.user._id);
    //             console.log(response.data.designs)
    //         }catch (error) {
    //             console.error(error)
    //         }
    //     }
    //     getUser()
    // }, [])
    
    
    const postDesign = async () => {
        setDesignToSave(prevTemplate => ({
            ...prevTemplate,
            template: false 
        }));
        if (!designToSave.template) {
            try {
                const response = await createDesign(authState.user._id, designToSave);
                const updatedTemplate = response.data;
                console.log(updatedTemplate);
                // console.log(designToSave)

                const updatedUser = await getUserLogged(authState.user._id);
                setAuthState(prevState => ({
                    ...prevState,
                    user: updatedUser.data
                }));

                console.log(updatedUser);
            } catch (error) {
                console.error('Error fetching designs:', error);
            }
        }
        
    };

    return (
        <button type='button' onClick={() => postDesign(designToSave)} >Guardar Diseño</button> 
    );
};

export default ButtonSaveDesigns;
