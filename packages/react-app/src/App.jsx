import React, { useCallback, useEffect, useState } from 'react';
import { Link, Route, Switch, useLocation } from 'react-router-dom';
import { useExchangeEthPrice } from 'eth-hooks/dapps/dex';
import './style/App.css';

import Button from './components/Button';
import externalContracts from './contracts/external_contracts';

// contracts
import deployedContracts from './contracts/hardhat_contracts.json';

const { ethers } = require('ethers');

const network = 'hardhat';
const chainId = 31337;

const { contracts } = deployedContracts[chainId][network];
const { Wallet } = contracts;
const provider = new ethers.providers.JsonRpcProvider(`http://127.0.0.1:8545`);
// const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
console.log(process.env);
const walletContract = new ethers.Contract(
  Wallet.address,
  Wallet.abi,
  provider
);

function App() {
  const [contract, setContract] = useState(walletContract);
  const [methods, setMethods] = useState(() =>
    Object.keys(contract.interface.functions).map(
      (f) => contract.interface.functions[f]
    )
  );
  console.log(contract);
  useEffect(() => {
    const getBalance = async () => {
      const balance = await contract.balance();
      console.log(balance);
    };
    //getBalance();
  });
  return (
    <div className='App'>
      <div>{contract.address}</div>
      {methods.map((method) => {
        return <Button key={method.name} contract={contract} method={method} />;
      })}
    </div>
  );
}
export default App;
