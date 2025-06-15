"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DarkModeContextProps {
  isDark: boolean;
  toggleDarkMode: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const DarkModeContext = createContext<DarkModeContextProps>({
  isDark: false,
  toggleDarkMode: () => {},
});

export const useDarkMode = () => useContext(DarkModeContext);

export const DarkModeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDark, setIsDark] = useState(false);
  const [circlePos, setCirclePos] = useState({ x: 0, y: 0 });
  const [isAnimating, setIsAnimating] = useState(false);
  const [circleColor, setCircleColor] = useState("#000");

  useEffect(() => {
    if (!isAnimating) {
      document.documentElement.classList.toggle("dark", isDark);
    }
  }, [isDark, isAnimating]);

  const toggleDarkMode = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = e;
    const nextIsDark = !isDark;

    setCirclePos({ x: clientX, y: clientY });
    setCircleColor(nextIsDark ? "#000000" : "#ffffff");
    setIsAnimating(true);

    // Wait until animation ends before toggling
    setTimeout(() => {
      setIsDark(nextIsDark); // Toggle AFTER animation completes
      setIsAnimating(false);
    }, 900);
  };

  return (
    <DarkModeContext.Provider value={{ isDark, toggleDarkMode }}>
      {children}

      <AnimatePresence>
        {isAnimating && (
          <motion.div
            key="circle"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 50, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
            style={{
              position: "fixed",
              top: circlePos.y,
              left: circlePos.x,
              transform: "translate(-50%, -50%)",
              width: 100,
              height: 100,
              borderRadius: "50%",
              backgroundColor: circleColor,
              zIndex: 9999,
              pointerEvents: "none",
            }}
          />
        )}
      </AnimatePresence>
    </DarkModeContext.Provider>
  );
};
