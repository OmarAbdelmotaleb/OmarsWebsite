import React, { useRef } from 'react';
import ReactDOM from 'react-dom';

import gsap from 'gsap'; // <-- import GSAP
import { useGSAP } from '@gsap/react'; // <-- import the hook from our React package
import './App.css'

// TODO: OnClick animations, placing all the shapes similar to figma tempalte
// Play with animations


// Function for making planets (this will include the sun)
// Make it generate circles
// Parameters will be: size, color, location

function App() {

  const container = useRef();
  const { contextSafe } = useGSAP();

  const onEnter = contextSafe(({ currentTarget }) => {
    gsap.to(currentTarget, { rotation: "+=360" });
    gsap.to(currentTarget, { scale: "+=0.5" })
    
  });

  useGSAP(() => {
    generateStars(100);
  });


  // Generate Stars randomly across a background
  const generateStars = (numStars) => {
    const starContainers = document.getElementById("star-container");
    for (let i = 0; i < numStars; i++){
      const star = document.createElement('div');
      star.className = 'star';
      star.style.top = `${Math.random() * 100}vh`;
      star.style.left = `${Math.random() * 100}vw`;
      starContainers.appendChild(star);
    }
  };

  // Spin the sun in and out on click
  const spinSun = () => {
    gsap.to('#sun', {scale: "+=1", duration: 1, ease: "power2.inOut"});
  }

  return (
    <div className="App">
      <div id = "star-container"></div>
      <div id= "sun" className='sun' onClick={spinSun}></div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

export default App;