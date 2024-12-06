import { useState } from 'react';
import { createContext } from 'react';


export const ThemeContext = createContext('light'); // Default value: 'light'

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light'); // Manage theme state

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark')); // Switch between themes
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}> 
      {children}
    </ThemeContext.Provider>
  );
}