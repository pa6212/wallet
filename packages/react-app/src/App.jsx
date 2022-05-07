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
const { Wallet } = contracts;

function App(props) {
  const provider = new ethers.providers.JsonRpcProvider(
    `http://127.0.0.1:8545`
  );
  const walletContract = new ethers.Contract(
    Wallet.address,
    Wallet.abi,
    provider
  );

  useEffect(() => {
    const getOwner = async () => {
      console.log(walletContract);
      let owner = await walletContract.owner();
      console.log(owner);
    };
    getOwner();
  }, []);
  return <div className='App'>Hello</div>;
}

export default App;
