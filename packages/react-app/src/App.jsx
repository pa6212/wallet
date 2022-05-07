import React, { useCallback, useEffect, useState } from 'react';
import { Link, Route, Switch, useLocation } from 'react-router-dom';
import { useExchangeEthPrice } from 'eth-hooks/dapps/dex';
import './App.css';
import externalContracts from './contracts/external_contracts';

// contracts
import deployedContracts from './contracts/hardhat_contracts.json';

const { ethers } = require('ethers');

const network = 'hardhat';
const chainId = 31337;

const { contracts } = deployedContracts[chainId][network];
const { Wallet: walletContract } = contracts;

function App(props) {
  return <div className='App'>Hello</div>;
}

export default App;
