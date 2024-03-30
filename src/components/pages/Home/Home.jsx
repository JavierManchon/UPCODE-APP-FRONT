

import './_home.scss';
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import TableComparationPremium from './TableComparationPremium/TableComparationPremium'; 
import Slider from './Slider/Slider';
import Description from './Description/Description';
import PremiumContent from './PremiumContent/PremiumContent';
import { useAuth } from '../../context/AuthContext';

const Home = ({isLogged ,setIsLogged}) => {

    const [isPremium, setIsPremium] = useState(false);
    const { authState} = useAuth();

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        
        if(token){
            setIsLogged(true);
            const isPremium = authState.user.isPremium;
            if(isPremium){
                setIsPremium(true);            
            }
        }

    }, []);
    
  return (
    <div className="home-container">
      <Description isLogged={isLogged}/>
      {isLogged && isPremium 
        ? ( <PremiumContent /> ) 
        : ( <TableComparationPremium isLogged={isLogged} /> )
      }
      <Slider />
    </div>            
  );
}

export default Home;
