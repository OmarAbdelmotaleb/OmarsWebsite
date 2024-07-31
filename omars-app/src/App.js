 /*
  TODO: 
  - Populate the data structure and we'll customize automatically ig 
  - Work on Orbiting animation NEED TO FIGURE OUT HOW TO MOVE THINGS AROUND TOWN
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

function Planet({ timeline, click, pName, children, style }) {
  let planetRef = useRef();
  const orbitRadius = 150;
  useGSAP(() => {
    // gsap.to(planetRef.current, {
    //   rotation: "+360"
    // });
    // const path = [];
    // const numPoints = 360; // Number of points on the circle (adjust for smoothness)
    // const angleIncrement = 360 / numPoints;
    // const width = window.innerWidth;
    // const height = window.innerHeight;

    // for (let i = 0; i < numPoints; i++) {
    //   const angle = i * angleIncrement;
    //   const radians = angle * (Math.PI/180);
    //   const x = Math.cos(radians) * 150;
    //   const y = Math.sin(radians) * 150;
    //   path.push({x, y});
    // }
    // console.log(path);
    // [
    //   {x: -250, y: 250},  
    //   {x: -250, y: -250},  
    //   {x: 250, y: -250},  
    //   {x: 250, y: 250},  
    // ],

    // const path = MotionPathPlugin.getRawPath('#orbit_1');
    if (pName !== "AboutMe") {
      timeline && timeline.to(planetRef.current, {
        // rotation: "+=360",
        duration: 1,
        motionPath: {
          path: "#orbit1",
          align: "#orbit1",
          curviness: 1,
        }
      }, "<");

    }

  }, [timeline])

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


function GetPlanets({ planets, onEnter, timeline }) {
  return (
    processPlanets(planets).map((planet) => (
    <Planet
      key={planet.name}
      timeline={timeline}
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

  // const orbit = useRef();

  // UseState for timeline?
  const [tl, setTL] = useState();

  const { contextSafe } = useGSAP({ scope: container });

  useGSAP(() => {
    fetchPlanets().then(setPlanets).catch(error => console.error(error));
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({ repeat:-1 });
    setTL(tl);
  });

  const onEnter = contextSafe(({ currentTarget }) => {
    gsap.to(currentTarget, { rotation: "+=360", duration: 1 });
    gsap.to(currentTarget, { scale: 1.5, duration: 1 });
  });

  // Orbiting Animation
  // useGSAP(() => {
  //   gsap.to()
  // }, { scope: orbit});  

  return (
    <div className="App">
      <svg class="orbit" width="416" height="312" viewBox="0 0 416 312" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path id="orbit1" d="M415 156C415 198.693 391.929 237.42 354.478 265.509C317.027 293.597 265.242 311 208 311C150.758 311 98.9733 293.597 61.5218 265.509C24.0706 237.42 1 198.693 1 156C1 113.307 24.0706 74.5797 61.5218 46.4913C98.9733 18.4027 150.758 1 208 1C265.242 1 317.027 18.4027 354.478 46.4913C391.929 74.5797 415 113.307 415 156Z" stroke="white" stroke-width="2"/>
      </svg>
      <svg class="orbit" width="736" height="552" viewBox="0 0 736 552" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path id="orbit2" d="M735 276C735 351.83 694.021 420.557 627.615 470.361C561.21 520.166 469.425 551 368 551C266.575 551 174.79 520.166 108.385 470.361C41.9792 420.557 1 351.83 1 276C1 200.17 41.9792 131.443 108.385 81.6385C174.79 31.8342 266.575 1 368 1C469.425 1 561.21 31.8342 627.615 81.6385C694.021 131.443 735 200.17 735 276Z" stroke="white" stroke-width="2"/>
      </svg>
      <svg class="orbit" width="1056" height="792" viewBox="0 0 1056 792" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path id="orbit3" d="M1055 396C1055 504.967 996.112 603.694 900.752 675.214C805.392 746.734 673.608 791 528 791C382.392 791 250.608 746.734 155.248 675.214C59.8878 603.694 1 504.967 1 396C1 287.033 59.8878 188.306 155.248 116.786C250.608 45.2656 382.392 1 528 1C673.608 1 805.392 45.2656 900.752 116.786C996.112 188.306 1055 287.033 1055 396Z" stroke="white" stroke-width="2"/>
      </svg>
      <svg class="orbit" width="1376" height="1032" viewBox="0 0 1376 1032" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path id="orbit4" d="M1375 516C1375 658.104 1298.2 786.832 1173.89 880.067C1049.58 973.303 877.791 1031 688 1031C498.21 1031 326.425 973.303 202.111 880.067C77.7964 786.832 1 658.104 1 516C1 373.896 77.7964 245.168 202.111 151.933C326.425 58.6971 498.21 1 688 1C877.791 1 1049.58 58.6971 1173.89 151.933C1298.2 245.168 1375 373.896 1375 516Z" stroke="white" stroke-width="2"/>
      </svg>
      <svg class="orbit" width="1696" height="1080" viewBox="0 0 1696 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path id="orbit5" d="M1695 540C1695 715.241 1600.29 873.969 1447.03 988.92C1293.76 1103.87 1081.97 1175 848 1175C614.027 1175 402.242 1103.87 248.973 988.92C95.7051 873.969 1 715.241 1 540C1 364.759 95.7051 206.031 248.973 91.0801C402.242 -23.8714 614.027 -95 848 -95C1081.97 -95 1293.76 -23.8714 1447.03 91.0801C1600.29 206.031 1695 364.759 1695 540Z" stroke="white" stroke-width="2"/>
      </svg>
      <div ref={container}>
        
      
        <GetPlanets planets={planets} onEnter={onEnter} timeline={tl} ></GetPlanets>
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



