import React, { useState, useEffect } from 'react';

import '../style/Button.css';

function Button({ contract, method }) {
  const [inputs, setInputs] = useState(method.inputs);
  const [values, setValues] = useState(Array(method.inputs.length));

  const handleClick = async () => {
    //contract[method.name](...values);
    console.log(values);
  };

  const handleChange = (e, idx) => {
    const newValues = values;
    newValues[idx] = isNaN(parseInt(e.target.value, 16))
      ? Number(e.target.value)
      : e.target.value;
    setValues(newValues);
  };

  return (
    <div className='Button'>
      <div className='inputContainer'>
        {inputs.map((input, idx) => {
          console.log(input.type.substring(0, 2));
          return (
            <input
              className='input'
              placeholder={input.name}
              onChange={(e) => handleChange(e, idx)}
            />
          );
        })}
      </div>
      <button className='methodButton' onClick={() => handleClick()}>
        {method.name}
      </button>
    </div>
  );
}

export default Button;
