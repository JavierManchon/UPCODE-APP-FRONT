import React, { useState, useEffect, useRef } from 'react';
import './_buttonSaveDesigns.scss';
import { useAuth } from '../../context/AuthContext';
import { createDesign, patchDesignReq } from '../../../api/axios/designs';
import { getUserLogged } from '../../../api/axios/auth';

const ButtonSaveDesigns = ({ designToSave, setDesignToSave, overflowHidden, setOverflowHidden }) => {
    const { authState, setAuthState } = useAuth();
    const [showForm, setShowForm] = useState(false);
    const [designName, setDesignName] = useState('');
    const [innerHeight, setInnerHeight] = useState(window.innerHeight);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const overlayRef = useRef(null);

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
        setOverflowHidden(true);
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
                    setAlertMessage('Diseño guardado con éxito');
                    setShowAlert(true);
            } catch (error) {
            console.error('Error saving design:', error);
            setAlertMessage('Error al guardar el diseño');
            setShowAlert(true);
            }
        }
        setOverflowHidden(false)
    };

    useEffect(() => {
    const handleClickOutside = (event) => {
        if (overlayRef.current && !overlayRef.current.contains(event.target)) {
            setShowForm(false);
            setOverflowHidden(false);
        }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    if (overflowHidden) {
        const centeredOverlay = document.querySelector('.centered-overlay');
        if (centeredOverlay) {
            centeredOverlay.scrollIntoView({ behavior: 'auto', block: 'start' });
        }
    }

    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
}, [overflowHidden]);
    
    useEffect(() => {
        if (showAlert) {
            const timer = setTimeout(() => {
                setShowAlert(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [showAlert]);

    return (
        <div className="button-save-designs-container">
            <button type='button' onClick={postDesign} className='btn-save'>Guardar diseño</button>
            {showForm && (
                <div className="centered-overlay" style={{ height: innerHeight, width: windowWidth }}>
                    <div className="overlay-content" ref={overlayRef}>
                        <h2>Ponle un nombre a tu diseño</h2>
                        <input
                            type="text"
                            placeholder="Nombre del diseño"
                            value={designName}
                            onChange={(e) => setDesignName(e.target.value)}
                            maxLength={20} 
                        />
                        <button onClick={handleSaveDesign}>Guardar</button>
                    </div>
                </div>
            )}
            {showAlert && (
                <div className="alert-overlay">{alertMessage}</div>
            )}
        </div>
    );
};

export default ButtonSaveDesigns;
