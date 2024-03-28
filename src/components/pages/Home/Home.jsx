

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
    const slides = [
        'https://images.pexels.com/photos/6272/wood-free-wooden-home.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/19035715/pexels-photo-19035715/free-photo-of-francia-campo-verano-jardin.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/10434596/pexels-photo-10434596.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/18874829/pexels-photo-18874829/free-photo-of-ciudad-cielo-punto-de-referencia-calle.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://res.cloudinary.com/dtsp1wfry/image/upload/v1711110900/lmconhq5hl1t9efxcqaz.jpg',
        // Agrega más URLs de imágenes según sea necesario
      ];
    
      const slideImages = slides.map((url, index) => (
        <img key={index} src={url} alt={`Slide ${index}`} style={{ width: '30%', height: '300px' }} />
    ));
  return (
    <div className="home-container">
      <Description isLogged={isLogged}/>
      {isLogged && isPremium 
        ? ( <PremiumContent /> ) 
        : ( <TableComparationPremium isLogged={isLogged} /> )
      }
      <Slider slides={slideImages} />
    </div>            
  );
}

export default Home;
