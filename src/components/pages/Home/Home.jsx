

import './_home.scss';
import { useState, useEffect } from 'react';
import TableComparationPremium from './TableComparationPremium/TableComparationPremium'; 
import Slider from './Slider/Slider';
import Description from './Description/Description';
import PremiumContent from './PremiumContent/PremiumContent';
import { useAuth } from '../../context/AuthContext';

const Home = ({setIsLogged}) => {

    const [isPremium, setIsPremium] = useState(false);
    const { authState, isLogged} = useAuth();

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
        <TableComparationPremium isLogged={isLogged} /> 
        <Slider />
    </div>            
  );
}

export default Home;
