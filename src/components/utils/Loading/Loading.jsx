import React, { useRef, useEffect } from 'react';
import './_loading.scss'; 

function App() {
  const titleRef = useRef(null);
  const isMounted = useRef(true); // A

  async function animateTitle() {
    if (titleRef.current && isMounted.current) { // B
      titleRef.current.classList.add("animate");

      const animations = titleRef.current.getAnimations();
      await Promise.all(animations.map((animation) => animation.finished));

      if (!isMounted.current) return; // C

      setTimeout(() => {
        if (!isMounted.current) return; // D

        titleRef.current.classList.remove("animate");
        setTimeout(() => {
          if (isMounted.current) animateTitle(); // E
        }, 500);
      }, 1000);
    }
  }

  useEffect(() => {
    animateTitle();

    return () => { // F
      isMounted.current = false; // G
    };
  }, []);

  return (
    <div className="App">
      <h1 ref={titleRef}>&lt;UP_C0DE/&gt;</h1>
    </div>
  );
}

export default App;

