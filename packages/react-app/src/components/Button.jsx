import React, { useState, useEffect } from 'react';

import '../style/Button.css';

function Button({ contract, method }) {
  const [inputs, setInputs] = useState(method.inputs);
  const [values, setValues] = useState(Array(method.inputs.length));

  const handleClick = async () => {
    const res = (await contract[method.name](...values)).toString() / 1e18;
    console.log('res: ', res);
  };

  const handleChange = (e, idx, inputType) => {
    const newValues = values;
    newValues[idx] =
      inputType === 'address' ? String(e.target.value) : Number(e.target.value);
    setValues(newValues);
  };

  return (
    <div className='Button'>
      <div className='inputContainer'>
        {inputs.map((input, idx) => {
          return (
            <input
              key={input.name}
              className='input'
              placeholder={input.name}
              onChange={(e) => handleChange(e, idx, input.type)}
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
