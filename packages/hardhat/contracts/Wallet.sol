//SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "hardhat/console.sol";

import {SafeMath} from "@openzeppelin/contracts/utils/math/SafeMath.sol";

import {IUniswapV2Router02} from '../interfaces/uniswap/IUniswapV2Router02.sol';
import {IERC20} from '@openzeppelin/contracts/token/ERC20/IERC20.sol';

contract Wallet {

  using SafeMath for uint;

  address public owner;

  address private constant UNISWAP_V2_ROUTER = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;
  IUniswapV2Router02 private uniswapRouter;

  mapping(address => uint256) assets;

  constructor() payable {
    uniswapRouter = IUniswapV2Router02(UNISWAP_V2_ROUTER);
    owner = msg.sender;
  }

  modifier onlyOwner {
    require(msg.sender == owner, 'Only the owner can call this function');
    _;
  }

  function buy(address _token) public payable onlyOwner {
    address[] memory path = new address[](2);
    path[0] = uniswapRouter.WETH();
    path[1] = _token;

    uint[] memory amounts = uniswapRouter.swapExactETHForTokens{value: msg.value}(
      1,
      path,
      address(this),
      block.timestamp + 5 seconds
    );

    assets[_token] += amounts[amounts.length - 1];
  }
  
  function send(address _tokenAddress, uint _amount, address _recipient) public payable onlyOwner {
    require(assets[_tokenAddress] - _amount > 0, 'Insufficient amount to transfer.');
    IERC20(_tokenAddress).transfer( _recipient, _amount);
    assets[_tokenAddress] -= _amount;
  }

  function swap(address _tokenIn, uint256 _amountIn, address _tokenOut) public payable onlyOwner {
    require(assets[_tokenIn] - _amountIn > 0, 'Insufficient amount to swap.');

    IERC20(_tokenIn).approve(address(uniswapRouter), _amountIn);
    
    address[] memory path = new address[](2);
    path[0] = _tokenIn;
    path[1] = _tokenOut;

    uint[] memory amounts = uniswapRouter.swapExactTokensForTokens(
      _amountIn,
      0,
      path,
      address(this),
      block.timestamp + 5 seconds
    );

    assets[_tokenIn] -= _amountIn;
    assets[_tokenOut] += amounts[amounts.length - 1];
  }

  function balance() public view returns(uint256){
    return address(this).balance;
  }

  // to support receiving ETH by default
  fallback() external payable {}
  receive() external payable {}
}

