 /*
  TODO: 
  - Populate the data structure and we'll customize automatically ig 
  - Work on Orbiting animation
  - Work on Zooming / Fade animations on a timeline
  - Dynamically sizing planets


  Each Planet has 3 points of data
  - The text above the planet
  - The image(s) on the planet
  - The links
    Programmatically
      Color
      Size
      Position (optional)
      OnClick (optional)
      Image SRC
      Text InLine
      Hyperlinks
      background image (future, custom jpegs for planets vs basic colors)

      We should be able to modify orbitting values (i.e. speed, make speed the same?) 
      Orbits should be automatically scaled based on the position
      

  Main functionality for the planet will be the Root planet
  - onClick will zoom in on the planet, and will shrink the other planets (effectively hiding them)
  - This will involve transitioning the planet to the center of the screen while the other ones disappear (0.2 sec animation for hiding, 1 sec for moving)
  - It will the corresponding appear on screen
  --- Example would be if I clicked on GitHub planet, the respective Moons (carrying imgs and hyperlinks) will fade in on screen after the other planets fade out.
  - If you click back or whatever it will return to the original state (timeline?)

  ================
  Orbit Animation



*/
import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './App.css';

gsap.registerPlugin(MotionPathPlugin);

async function fetchPlanets() {
  try {
    const response = await fetch('/datasets/planets.json');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.Planets;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    throw error;
  }
}

function Planet({ click, pName, children, style }) {
  let planetRef = useRef();
  return <div ref={planetRef} onClick={click} className={pName} style={style}>{children}</div>;
}

function processPlanets(PlanetList) {
  // return PlanetList.map((planet, index) => {
  //   if(!planet.style.top) {
  //     planet.style.top = PlanetList[index - 1].style.top;
  //   }
  //   if(!planet.style.left) {
  //     planet.style.left = PlanetList[index - 1].style.left + (60 / PlanetList.length);
  //   }
  //   return planet;
  // });

  const padding = 3;
  const planetsWithoutTop = PlanetList.filter(planet => !planet.style.top);
  const planetsWithoutLeft = PlanetList.filter(planet => !planet.style.left);

  const sunTop = 50;
  const sunLeft = 53;
  const stepTop = (50 - padding) / (planetsWithoutTop.length + 1);
  const stepLeft = (50 - padding) / (planetsWithoutLeft.length + 1);
  planetsWithoutTop.forEach((planet, index) => {
    planet.style.top = sunTop;
  });
  planetsWithoutLeft.forEach((planet, index) => {
    planet.style.left = sunLeft + (index + 1) * stepLeft;
  });
  return PlanetList;
}


function GetPlanets({ planets, onEnter }) {
  
  return (
    processPlanets(planets).map((planet) => (
    <Planet
      key={planet.name}
      click={onEnter}
      pName={planet.className}
      style={{ 
        top: `${planet.style.top}%`,
        left: `${planet.style.left}%`,
        backgroundColor: planet.style.color,
        position: planet.style.position,
        width: planet.style.width,
        height: planet.style.height,
        transform: 'translate(-50%, -50%)',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        zIndex: 2
      }}
    >
      {planet.label}
    </Planet>
  )));
}

function logPlanets(planets) { 
  planets.forEach(planet => {
    console.log(`Name: ${planet.name}, ClassName:${planet.className}, top styling:${planet.style.top}`);
  });
}

function App() {
  const [planets, setPlanets] = useState([]);
  const container = useRef();
  const { contextSafe } = useGSAP({ scope: container });

  useGSAP(() => {
    fetchPlanets().then(setPlanets).catch(error => console.error(error));
  }, []);

  const onEnter = contextSafe(({ currentTarget }) => {
    gsap.to(currentTarget, { rotation: "+=360", duration: 1 });
    gsap.to(currentTarget, { scale: 1.5, duration: 1 });
  });

  return (
    <div className="App">
      <div ref={container}>
        <GetPlanets planets={planets} onEnter={onEnter} ></GetPlanets>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

export default App;




// STARS

  // useGSAP(() => {
  //   const ctx = gsap.context(() =>{
  //     generateStars(100);
  //   }, solar_system);
  //   return () => ctx.revert();
  // }, []);
  

  // // Generate Stars randomly across a background
  // const generateStars = (numStars) => {
  //   const starContainers = document.getElementById("star-container");
  //   for (let i = 0; i < numStars; i++){
  //     const star = document.createElement('div');
  //     star.className = 'star';
  //     star.style.top = `${Math.random() * 100}vh`;
  //     star.style.left = `${Math.random() * 100}vw`;
  //     starContainers.appendChild(star);
  //   }
  // };



