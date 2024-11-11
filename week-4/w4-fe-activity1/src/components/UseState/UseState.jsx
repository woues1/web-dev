import { useState } from 'react';
import './UseState.css';

const UseState = () => {
  const [theme, setTheme] = useState('light');
  const [count, setCount] = useState(0);

  function Increment(){
    setCount(count => count + 1)
  }
  function Decrement(){
    setCount(count => count - 1)
  }
  function DarkTheme(){
    setTheme('dark')
  }
  function LightTheme(){
    setTheme('light')
  }
  function ToggleTheme(){
    if (theme == 'light'){
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }

  return (
    <div className={`state ${theme}`}>
      <h1>UseState Component</h1>
      <button onClick={DarkTheme}>Dark</button>
      <button onClick={LightTheme}>Light</button>
      <h2>{count}</h2>
      <button onClick={Increment}>
        Increment
      </button>
      <button onClick={Decrement}>
        Decrement
      </button>
      <button onClick={ToggleTheme}>
        Toggle Theme
      </button>
    </div>
  );
};

export default UseState;
