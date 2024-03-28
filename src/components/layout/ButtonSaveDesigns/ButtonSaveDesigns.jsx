import React, { useState, useEffect } from 'react';
import './_buttonSaveDesigns.scss';
import { useAuth } from '../../context/AuthContext';
import { createDesign, patchDesignReq } from '../../../api/axios/designs';
import { getUserLogged } from '../../../api/axios/auth';

const ButtonSaveDesigns = ({ designToSave, setDesignToSave }) => {
    const { authState, setAuthState } = useAuth();
    const [showForm, setShowForm] = useState(false);
    const [designName, setDesignName] = useState('');
    const [innerHeight, setInnerHeight] = useState(window.innerHeight);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const handleResize = () => {
        setInnerHeight(window.innerHeight);
        setWindowWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
        window.removeEventListener('resize', handleResize);
        };
    }, []);

    const postDesign = async () => {
        setDesignToSave(prevTemplate => ({
            ...prevTemplate,
            template: false 
        }));
        setShowForm(true);
    };

    const handleSaveDesign = async () => {
        setShowForm(false);
        if (!designToSave.template && designName.trim() !== '') {
            try {
                const response = await createDesign(authState.user._id, designToSave);
                const createdDesign = response.data;

                await patchDesignReq(createdDesign.data._id, { nameDesign: designName });

                const updatedUser = await getUserLogged(authState.user._id);
                setAuthState(prevState => ({
                    ...prevState,
                    user: updatedUser.data
                }));
            } catch (error) {
                console.error('Error saving design:', error);
            }
        }
    }

    return (
        <div className="button-save-designs-container">
            <button type='button' onClick={postDesign}>Guardar Diseño</button>
            {showForm && (
                <div className="centered-overlay" style={{ height: innerHeight, width: windowWidth }}>
                    <div className="overlay-content">
                        <h2>Ponle un nombre a tu diseño</h2>
                        <input
                            type="text"
                            placeholder="Nombre del diseño"
                            value={designName}
                            onChange={(e) => setDesignName(e.target.value)}
                        />
                        <button onClick={handleSaveDesign}>Guardar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ButtonSaveDesigns;
