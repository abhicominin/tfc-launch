'use client';
import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import { ReactLenis } from "lenis/react";
import gsap from "gsap";

export default function PageWrapper({ children, scrollspace }) {
    const lenisRef = useRef(null);
  
    useEffect(() => {
      function update(time) {
        if (lenisRef.current?.lenis) {
          lenisRef.current.lenis.raf(time * 1000);
        }
      }
  
      lenisRef.current?.lenis?.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(update);
      gsap.ticker.lagSmoothing(0);
  
      return () => gsap.ticker.remove(update);
    }, []);

    return (
        <>
            <ReactLenis root ref={lenisRef} options={{ autoRaf: false }}/>
            <motion.div
             className={`w-full min-h-screen flex flex-col`}
             style={{ height: scrollspace }}
             initial={{ opacity: 0, filter: "blur(10px)" }}
             animate={{ opacity: 1, filter: "blur(0px)" }}
             exit={{ opacity: 0, filter: "blur(10px)" }}
             transition={{ duration: 1.0 }}
            >
                {children}
            </motion.div>
        </>    
    );
}