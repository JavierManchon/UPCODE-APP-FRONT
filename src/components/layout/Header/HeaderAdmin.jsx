import React, { useEffect, useState } from 'react';
import './_header.scss';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../../images/upcode.png';
import { useAuth } from '../../context/AuthContext';

const HeaderAdmin = ({ isLogged, setIsLogged }) => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            setIsLogged(true);
        } else {
            setIsLogged(false);
        }
    }, [setIsLogged]);

    const handleLogout = () => {
        navigate('/');
        sessionStorage.clear();
        logout();
        
    };

    return (
        <header className='container-title-links'>
            <Link className='title-logo' to='/admins'>
                <h1>UP-CODE</h1>
                <img src={Logo} alt="Logo" />
            </Link>
            <nav className='list-links'>
                <ul className='container-items'>
                    {isLogged ? (
                        <>
                            <li><Link to="/adminUserManagement">User_Management</Link></li>
                            <li><Link to="/adminDesignsManagement">Designs_Management</Link></li>
                            <li onClick={handleLogout}>Logout</li>
                        </>
                    ) : (
                        <>
                        <li><Link to="/catalogue">Templates</Link></li>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
}

export default HeaderAdmin;
