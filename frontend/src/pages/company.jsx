import React from 'react';
import { useRef } from "react"

const Company = () => {
 
        const inputEl = useRef(null);
        const onButtonClick = () => {
          // `current` apunta al elemento de entrada de texto montado
          inputEl.current.focus();
        };
    return (
        <div>
           <h1>company</h1> 
      
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>

        </div>
    );
};

export default Company