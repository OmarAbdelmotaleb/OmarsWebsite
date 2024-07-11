import { useRef } from 'react';

import gsap from 'gsap'; // <-- import GSAP
import { useGSAP } from '@gsap/react'; // <-- import the hook from our React package

gsap.registerPlugin(useGSAP);

// TODO: OnClick animations, placing all the shapes similar to figma tempalte
// Play with animations
function Box({ children }) {
  return <div className="box gradient-blue">{children}</div>;
}

function Circle({ children }) {
  return <div className="circle gradient-green">{children}</div>;
}

export default function App() {
    const container = useRef();
    const tl = useRef();

    useGSAP(
        () => {

          tl.current = gsap
          .timeline()
          .to(".box", {
            rotate: 360
          })
          .to(".circle", {
            x: 100
          });
            // gsap code here...
            // gsap.from('.box', { opacity: 0, stagger: 0.1 }); // <-- automatically reverted
        }, { scope: container }
    ); // <-- scope for selector text (optional)

    return (
        <div ref={container} className="app">
          <Box>Box</Box>
          <Circle>Circle</Circle>
            {/* <div className="box">Hello</div>
            <div className="circle">Hello</div> */}
        </div>
    );
 }