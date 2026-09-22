"use client";
import React, { useRef, useEffect } from "react";

const MovingObject = ({
  children,
  verticalAmplitude = 20,
  horizontalAmplitude = 20,
}) => {
  const elementRef = useRef(null);

  const animateElement = () => {
    const element = elementRef.current;
    if (element) {
      const currentTime = Date.now();
      const verticalOffset = Math.sin(currentTime * 0.002) * verticalAmplitude;
      const horizontalOffset =
        Math.cos(currentTime * 0.002) * horizontalAmplitude;
      element.style.transform = `translate(${horizontalOffset}px, ${verticalOffset}px)`;
      window.requestAnimationFrame(animateElement);
    }
  };

  useEffect(() => {
    animateElement();
  }, []); // Empty dependency array to run once on mount

  return <div ref={elementRef}>{children}</div>;
};

export default MovingObject;
