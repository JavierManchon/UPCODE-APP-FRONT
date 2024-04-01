import React, { useEffect, useState } from 'react';
import './_header.scss';
import { Link } from 'react-router-dom';
import Logo from '../../../images/upcode.png';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
    const { isLogged, logout, authState } = useAuth();
    const [openToggle, setOpenToggle] = useState(false);
    const handleOpenToggle = () => {
        setOpenToggle(!openToggle)
    }

    const handleLogout = () => {
        sessionStorage.clear()
        logout();
        setOpenToggle(false);
    }

    return (
        <>
        <header className='container-title-links'>
            <Link className='title-logo' to='/'>
                <h1>UP-CODE</h1>
                <img src={Logo} alt="Logo" />
            </Link>
            <nav className='list-links'>
                <ul className='container-items'>
                    {isLogged ? (
                        <>
                            <li><Link to="/user-area">Perfil</Link></li>
                            {authState.user.isPremium 
                                ? <li><Link to='/community'>Comunidad</Link></li>
                                : null
                            }
                            <li><Link to="/catalogue">Catálogo</Link></li>
                            <li onClick={handleLogout}>Logout</li>
                            <li className={`toggle-menu ${openToggle ? 'open' : ''}`} onClick={handleOpenToggle}>
                                <div></div>
                                <div></div>
                                <div></div>
                            </li>
                        </>
                    ) : (
                        <>
                        <li><Link to="/catalogue">Catálogo</Link></li>                     
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                        <li className={`toggle-menu ${openToggle ? 'open' : ''}`} onClick={handleOpenToggle}>
                                <div></div>
                                <div></div>
                                <div></div>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
        <ul className={`container-items-responsive ${openToggle ? 'show' : ''}`}>
            {isLogged ? (
                <>  
                    <li onClick={handleOpenToggle}><Link to="/user-area">Perfil</Link></li>
                    {authState.user.isPremium 
                        ? 
                        <>
                        <div className='separator-links'></div>
                        <li onClick={handleOpenToggle}><Link to='/community'>Comunidad</Link></li>
                        </>
                        : null
                    }
                    <div className='separator-links'></div>
                    <li onClick={handleOpenToggle}><Link to="/catalogue">Catálogo</Link></li>
                    <div className='separator-links'></div>
                    <li onClick={() => handleLogout()}>Logout</li>
                </>
            ) : (
                <>
                    <li onClick={handleOpenToggle}><Link to="/catalogue">Catálogo</Link></li>
                    <div className='separator-links'></div>
                    <li onClick={handleOpenToggle}><Link to="/login">Login</Link></li>
                    <div className='separator-links'></div>
                    <li onClick={handleOpenToggle}><Link to="/register">Register</Link></li>
                </>
            )}
        </ul>
        </>
    );
}

export default Header;
