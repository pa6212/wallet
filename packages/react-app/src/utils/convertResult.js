const { ethers } = require('ethers');
const { ERC20ABI } = require('../contracts/external_contracts');

const provider = new ethers.providers.JsonRpcProvider(`http://127.0.0.1:8545`);

export const convertResult = async (method, values, res) => {
  let convertedRes, erc20Contract, decimals;
  switch (method) {
    case 'balance':
      convertedRes = res / 1e18;
      break;
    case 'buy':
    case 'swap':
      const tokenAddress = method === 'buy' ? values[0] : values[2];
      erc20Contract = new ethers.Contract(tokenAddress, ERC20ABI, provider);
      decimals = await erc20Contract.decimals();
      convertedRes = Math.round(res / 10 ** decimals);
      break;
    case 'send':
      convertedRes = values[1];
      break;
    default:
      convertedRes = res;
  }
  return convertedRes;
};
