import React, { useEffect, useState } from 'react';
import './_header.scss';
import { Link } from 'react-router-dom';
import Logo from '../../../images/upcode.png';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
    const { isLogged, logout } = useAuth();

    const handleLogout = () => {
        sessionStorage.clear()
        logout();
    }

    return (
        <header className='container-title-links'>
            <Link className='title-logo' to='/'>
                <h1>UP-CODE</h1>
                <img src={Logo} alt="Logo" />
            </Link>
            <nav className='list-links'>
                <ul className='container-items'>
                    {isLogged ? (
                        <>
                            <li><Link to="/user-area">Mis Diseños</Link></li>
                            <li><Link to="/catalogue">Catálogo</Link></li>
                            <li onClick={handleLogout}>Logout</li>
                        </>
                    ) : (
                        <>
                        <li><Link to="/catalogue">Catálogo</Link></li>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
}

export default Header;
