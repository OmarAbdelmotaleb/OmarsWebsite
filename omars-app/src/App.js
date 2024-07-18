import React, { useRef } from 'react';
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

  // const dumbass = contextSafe(({currentTarget}) =>{
  //   function checkPlanet(planet){
  //     return planet.name === "sun";
  //   };
  //   const idx = planets.findIndex(checkPlanet);
  //   delete planets[idx];
  //   console.log(planets);
  // });


  // TODO: 

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


  const planets = [
    {name: 'sun',  className: 'sun',  label: 'Sunny', top: temp(1080), left: temp(0)},
    {name: 'sun2', className: 'sun2', label: 'Sun2',  top: '30%', left: '25%'},
    {name: 'sun3', className: 'sun3', label: 'Sun3',  top: '75%', left: '75%'},
  ]

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
      {planets.map((planet) => (
        <Planet
          key={planet.name}
          click={onEnter}
          pName={planet.className}
          style={{ top: planet.top, left: planet.left, position:'absolute', transform: 'translate(-50%, -50%)'}}
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
  

  // Generate Stars randomly across a background
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

