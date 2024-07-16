import React, { useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import gsap from 'gsap'; // <-- import GSAP
import { useGSAP } from '@gsap/react'; // <-- import the hook from our React package
import './App.css'

// TODO: OnClick animations, placing all the shapes similar to figma tempalte
// Play with animations


// Function for making planets (this will include the sun)
// Make it generate circles
// Parameters will be: size, color, location

gsap.registerPlugin(MotionPathPlugin);

function App() {

  const container = useRef();
  const { contextSafe } = useGSAP();

  const onEnter = contextSafe(({ currentTarget }) => {
    gsap.to(currentTarget, { rotation: "+=360", duration: 1});
    gsap.to(currentTarget, { scale: "+=1.5", duration: 1})
    
  });

  // useGSAP(() => {
  //   generateStars(100);
  //   generatePlanets();
  // }, {scope: container});


  useGSAP(() => {
    const ctx = gsap.context(() =>{
      generateStars(100);
      generatePlanets(); 
    }, container);
    return () => ctx.revert();
  }, []);
  

  const generatePlanets = () => {
    createPlanet('sun', 50, 'yellow', 0, onEnter);
    createPlanet('planet1', 30, 'blue', 100, onEnter);
    createPlanet('planet2', 40, 'gray', 150, onEnter);
    createPlanet('planet3', 30, 'magenta', 200, onEnter);
    createPlanet('planet4', 35, 'green', 250, onEnter);
  };

  const createPlanet = (id, size, color, radius, onClickHandler) => {
    const planet = document.createElement('div');
    planet.id = id;
    planet.className = 'planet';
    gsap.set(planet, {
      width: `${size}px`,
      height: `${size}px`,
      background: color,
      position: 'absolute',
      borderRadius: '50%',
      cursor: 'pointer'
    });
    planet.addEventListener('click', onClickHandler);
    document.body.appendChild(planet);

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    gsap.to(planet, {
      motionPath: {
        path: [
          { x: centerX + radius, y: centerY },
          { x: centerX, y: centerY + radius },
          { x: centerX - radius, y: centerY },
          { x: centerX, y: centerY - radius },
          { x: centerX + radius, y: centerY }
        ],
        align: [
          { x: centerX + radius, y: centerY },
          { x: centerX, y: centerY + radius },
          { x: centerX - radius, y: centerY },
          { x: centerX, y: centerY - radius },
          { x: centerX + radius, y: centerY }
        ],
        alignOrigin: [0.5, 0.5]
      },
      duration: (radius / 50),
      repeat: -1,
      ease: 'linear'
    });
  };

  
  // // TEMP: Created planets with values for POC
  // const generatePlanets = () => {
  //   createPlanet('sun', 50, 'yellow', 20, onEnter);
  //   // createPlanet('sun', 50, 'blue', '20%', '50%', onEnter);
  //   // createPlanet('sun', 100, 'yellow', '40%', '20%', onEnter);
  // };


  // // Create a planet with unique ID values stored in DIV classes
  // const createPlanet = (id, size, color, radius, onClickHandler) => {
  //   const planet = document.createElement('div');
  //   planet.id = id;
  //   planet.className = 'planet';
  //   gsap.set(planet, {
  //     width: `${size}px`,
  //     height: `${size}px`,
  //     background : color,
  //     top: '70%',
  //     left: '70%',
  //     position: 'absolute',
  //     borderRadius: '50%',
  //     cursor:'pointer',
  //     transformOrigin: `${radius}px 0`
  //   });
  //   planet.addEventListener('click', onClickHandler);
  //   document.body.appendChild(planet);

   
  //   gsap.to(planet, {
  //     motionPath:{ 
  //       path: getCirclePath(radius),
  //       align: getCirclePath(radius),
  //       alignOrigin: [0.5, 0.5]
  //     },
  //     duration: (radius / 50),
  //     repeat: -1,
  //     ease: 'linear'
  //   });
 
  // };

  const getCirclePath = (radius) => {
    return [
      { x: radius, y: 0 },
      { x: 0, y: radius },
      { x: -radius, y: 0 },
      { x: 0, y: -radius },
      { x: radius, y: 0 },
    ]
  };


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

  return (
    <div className="App">
      <div id = "star-container"></div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

export default App;