import React, { useRef, useEffect } from 'react';
import './_loading.scss'; 

function App() {
  const titleRef = useRef(null);

  async function animateTitle() {
    titleRef.current.classList.add("animate");

    const animations = titleRef.current.getAnimations();
    await Promise.all(animations.map((animation) => animation.finished));

    setTimeout(() => {
      
      titleRef.current.classList.remove("animate");
      setTimeout(() => {
        animateTitle();
      }, 500);
    }, 1000);
  }

  useEffect(() => {
    animateTitle();
  }, []); 

  return (
    <div className="App">
      <h1 ref={titleRef}>&lt;UP_C0DE/&gt;</h1>
    </div>
  );
}

export default App;
