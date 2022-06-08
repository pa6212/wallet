import React, { useState, useEffect } from 'react';
import { Paper } from '@material-ui/core';
import { BsArrowUpSquare, BsArrowDownSquare } from 'react-icons/bs';

import ResultDisplay from './ResultDisplay';
import { convertResult } from '../utils/convertResult';
import '../style/Button.css';

const { ethers } = require('ethers');

function Button({ contract, method }) {
  const outputType = method.outputs[0].type;
  const [inputs, setInputs] = useState(method.inputs);
  const [values, setValues] = useState(Array(method.inputs.length).fill(''));
  const [result, setResult] = useState();
  const [resultArrow, setResultArrow] = useState(false);

  const handleClick = async () => {
    const newResult = await contract.callStatic[method.name](...values).then(
      (res) => convertResult(method.name, values, res)
    );
    await contract[method.name](...values);
    setResult(newResult);
    const newValues = values.map((v) => '');
    setValues(newValues);
    setResultArrow(true);
  };

  const handleChange = (e, idx, inputType) => {
    const newValues = [...values];
    newValues[idx] = e.target.value;
    setValues(newValues);
  };

  return (
    <Paper className='Button' elevation='4'>
      {result ? (
        resultArrow ? (
          <BsArrowDownSquare
            onClick={() => setResultArrow(!resultArrow)}
            className='resultArrow'
            size={25}
          />
        ) : (
          <BsArrowUpSquare
            onClick={() => setResultArrow(!resultArrow)}
            className='resultArrow'
            size={25}
          />
        )
      ) : null}
      {inputs.length ? (
        <div className='inputContainer'>
          {inputs.map((input, idx) => {
            return (
              <input
                key={input.name}
                className='input'
                value={values[idx]}
                placeholder={input.name}
                onChange={(e) => handleChange(e, idx, input.type)}
              />
            );
          })}
        </div>
      ) : null}
      <button className='methodButton' onClick={() => handleClick()}>
        {method.name}
      </button>
      {resultArrow ? <ResultDisplay result={result} /> : null}
    </Paper>
  );
}

export default Button;
