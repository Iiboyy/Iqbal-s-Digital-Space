import { useState, useEffect } from 'react';

export const useDynamicGradient = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Generate dynamic gradient based on scroll and mouse position
  const getGradient = (section) => {
    const baseColors = {
      hero: `linear-gradient(135deg, #000000 0%, #1a0b2e 50%, #2d1b69 100%)`,
      about: `linear-gradient(135deg, #0f0f0f 0%, #2d1b69 30%, #8B5CF6 70%)`,
      skills: `linear-gradient(135deg, #2d1b69 0%, #1a0b2e 50%, #000000 100%)`,
      projects: `linear-gradient(135deg, #000000 0%, #8B5CF6 30%, #A855F7 70%)`,
      contact: `linear-gradient(135deg, #1a0b2e 0%, #000000 50%, #2d1b69 100%)`
    };

    // Dynamic adjustments based on scroll and mouse
    const scrollEffect = Math.sin(scrollY * 0.01) * 10;
    const mouseEffectX = (mousePosition.x - 50) * 0.5;
    const mouseEffectY = (mousePosition.y - 50) * 0.5;

    return {
      background: baseColors[section],
      backgroundPosition: `${50 + mouseEffectX}% ${50 + mouseEffectY}%`,
      transform: `scale(${1 + scrollY * 0.0001})`
    };
  };

  return { getGradient, scrollY, mousePosition };
};

