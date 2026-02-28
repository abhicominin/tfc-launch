'use client'
import PageWrapper from "../_components/PageWrapper";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText);


export default function Services() {
  const containerRef = useRef(null);  

  useGSAP(() => {

    const sections = containerRef.current?.querySelectorAll("section");

    // Initial setup to avoid flash of content
    const subheading = document.querySelector(".subheading");
    const split = new SplitText(subheading, { type: "chars, words" });
    
    // Clear all existing SplitText logic and hidden chars
    gsap.set(split.chars, { opacity: 0, filter: "blur(10px)" });

    const timeline = gsap.timeline({
        scrollTrigger: {
            trigger: sections[1], // Section 2
            start: "top top",
            endTrigger: sections[4], // End at Section 5
            end: "bottom bottom",
            scrub: true,
            markers: true,
        }
    });

    // Reveal at Section 2
    timeline.to(split.chars, {
        opacity: 1,
        filter: "blur(0px)",
        stagger: 0.02,
        ease: 'none'
    });

    // Hold visible during Section 3
    timeline.to({}, { duration: 1 });

    // Hide at Section 4
    timeline.to(split.chars, {
        opacity: 0,
        filter: "blur(10px)",
        stagger: 0.02,
        ease: 'none'
    });

    sections.forEach((section, index) => {
        // ... (keep any other section-specific logic if needed, but remove the old split.chars animations)
    });

  }, { scope: containerRef.current });  

  return (
    <>
    {/* Fixed text */}
    <div className="fixed top-0 left-0 flex flex-col justify-center pointer-events-none bg-black w-screen h-screen text-white">
        <span className="heading font-futura-light text-[110px] translate-x-[15vw]">SERVICE</span>
        <span className="subheading font-futura-light text-[48px] text-start whitespace-nowrap translate-x-[28vw]">Most brands don’t fail because of their products or bad design. <br/> They fail because they fix the wrong thing first.</span>
    </div>
    <PageWrapper>
       {/* Our gsap animation will target this container using useGSAP */}
       <div ref={containerRef} className="w-full border-1">
          <section className="h-screen flex items-center justify-center">
            <h1 className="text-4xl font-bold text-white font-montserrat-medium">Section 1</h1>
          </section>
          <section className="h-screen flex items-center justify-center border-1 border-red-500">
            <h1 className="text-4xl font-bold text-white font-montserrat-medium ">Service 2</h1>
          </section>
          <section className="h-screen flex items-center justify-center">
            <h1 className="text-4xl font-futura-heavy text-white">Service 3</h1>
          </section>
          <section className="h-screen flex items-center justify-center border-1 border-blue-500">
            <h1 className="text-4xl font-futura-medium text-white">Service 4</h1>
          </section>
          <section className="h-screen flex items-center justify-center">
            <h1 className="text-4xl font-montserrat-medium text-white">Service 5</h1>
          </section>
          <section className="h-[150vh] flex items-center justify-center border-1 border-green-500">
            
          </section>
       </div>
    </PageWrapper>
    </>
  );
}