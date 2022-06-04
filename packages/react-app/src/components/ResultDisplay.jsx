import React, { useState, useEffect } from 'react';
import '../style/Button.css';
const { ethers } = require('ethers');

function ResultDisplay({ result}) {

  return (
    <div className='resultContainer'>
      <span className='result'>{result}</span>
    </div>
  );
}

export default ResultDisplay;
