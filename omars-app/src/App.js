 /*
  TODO: 
  - Cleanup the way that planets get added cuz we need refresh the page everytime which means something is wrong again.
  - Populate the data structure and we'll customize automatically ig // bludclat mfer
  - Work on Orbiting animation
*/ 


import React, { useRef, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import gsap from 'gsap'; // <-- import GSAP
import { useGSAP } from '@gsap/react'; // <-- import the hook from our React package
import './App.css'


gsap.registerPlugin(MotionPathPlugin);

function Planet({ click, pName, children, style}) {
  const planetRef = useRef();
  return <div ref={planetRef} onClick={click} className={pName} style={style}>{children}</div>;
};

function App() {

  // const container = useRef();
  const { contextSafe } = useGSAP();
  
  

  const onEnter = contextSafe(({ currentTarget }) => {
    gsap.to(currentTarget, {rotation: "+=360", duration: 1});
    gsap.to(currentTarget, {scale:"+=1.5", duration: 1})
    
  });
  // useEffect(() => { 
  //   const myRequest = new Request("Planets.json");
  //   fetch(myRequest)
  //   .then(response => {
  //     console.log("We made it");
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }
  //     return response.json();
  //   })
  //   .then(data => {
  //     console.log(data);
  //   })
  //   .catch(error => {
  //     console.error('Error fetching the JSON file:', error);
  //   });
  // });


  const logPlanets = contextSafe((planets) => {
    planets.forEach(planet => {
      console.log(`Name: ${planet.name}, ClassName:${planet.className}, top styling:${planet.style.top}`);
    });
  });

  const outputPlanetList =[];
  const parseJsonData = contextSafe((PlanetList) => {
    PlanetList.forEach(planler => {
      outputPlanetList.push(planler);
    });
    for (let i = 1; i < outputPlanetList.length; i++){
      console.log(outputPlanetList[i].style.top);
 
      if (outputPlanetList[i].style.top === null){
        // do algo shit here for top
        // temp code
        console.log("poggers"); 
        // outputPlanetList[i].style.top = `${Math.floor(Math.random() * 100) + 1}%`;
        outputPlanetList[i].style.top = outputPlanetList[i-1].style.top;
        
        console.log(outputPlanetList[i].style.top);
      }
      if (outputPlanetList[i].style.left === null){
        // do algo shit here for left
        // temp code
        // outputPlanetList[i].style.left = `${Math.floor(Math.random() * 100) + 1}%`;
        outputPlanetList[i].style.left = outputPlanetList[i-1].style.left + 20;
      }
     }
  });
  const example = require('./Planets.json');
  //logPlanets(example.Planets);
  parseJsonData(example.Planets);

  // const dumbass = contextSafe(({currentTarget}) =>{
  //   function checkPlanet(planet){
  //     return planet.name === "sun";
  //   };
  //   const idx = planets.findIndex(checkPlanet);
  //   delete planets[idx];
  //   console.log(planets);
  // });

 

  // Each Planet has 3 points of data
  // - The text above the planet
  // - The image(s) on the planet
  // - The links
    // Programmatically
      // Color
      // Size
      // Position (optional)
      // OnClick (optional)
      // Image SRC
      // Text InLine
      // Hyperlinks
      // background image (future, custom jpegs for planets vs basic colors)

      // We should be able to modify orbitting values (i.e. speed, make speed the same?) 
      // Orbits should be automatically scaled based on the position
      

  // const planetMap = new Map();
  
  // planetMap.set("Sun", new Planet("Test", onEnter, "Testing", "SunTest"));

  // Class Name correlates with CSS

  function temp(i){
    return i + 'px';
  };
  // First planet will be at 50% 50%
  // i-th planet will be the first planet's position + N
  // Where N is the gap we make between planets

  // Planet Name
  // Planet look

  // Main functionality for the planet will be the Root planet
  // - onClick will zoom in on the planet, and will shrink the other planets (effectively hiding them)
  // - This will involve transitioning the planet to the center of the screen while the other ones disappear (0.2 sec animation for hiding, 1 sec for moving)
  // - It will the corresponding appear on screen
  // --- Example would be if I clicked on GitHub planet, the respective Moons (carrying imgs and hyperlinks) will fade in on screen after the other planets fade out.
  // - If you click back or whatever it will return to the original state (timeline?)

  // const planets = [
  //   {name: 'sun',  className: 'sun',  label: 'Sunny', top: '50%', left: '50%'},
  //   {name: 'sun2', className: 'sun2', label: 'Sun2',  top: '50%', left: '60%'},
  //   {name: 'sun3', className: 'sun3', label: 'Sun3',  top: '50%', left: '70%'},
  // ]

  // Key : Sun
  // Value : List of properties (including linked children)
    // OnClick() -> Render Linked Children (Linked Planets)
  /*

  Operate in Parallel data structures
  map Planets(Sun, Planet(...))
  map Data(Sun,[text,img,...])

  onEnter({currentPlanet}
    animate Planets(currentPlanet)
    animate/display Data(currentPlanet)

    goBack? -> revert to the previous state for all the planets
    NOTE: gsap has a timeline feature which automatically tracks current animation and previous animations
  )

  */

  // Planets.set("Sun", new Planet())

  // Datastructure
    // Call to create planet and return div class
  return (
    <div className="App">
      <div id = "solar_system">
      {outputPlanetList.map((planet) => (
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
      ))}
      {/* call a single function that parses datastructure to get all div classes and populate screen */}
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

