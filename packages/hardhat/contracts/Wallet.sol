//SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "hardhat/console.sol";

import {IUniswapV2Router02} from '../interfaces/uniswap/IUniswapV2Router02.sol';

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Wallet {

  address public owner;

  address public constant UNISWAP_V2_ROUTER = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;
  IUniswapV2Router02 public uniswapRouter;

  constructor() {
    uniswapRouter = IUniswapV2Router02(UNISWAP_V2_ROUTER);
    owner = msg.sender;
  }

  modifier ownerOnly {
    require(msg.sender == owner, 'Only the owner can call this function');
    _;
  }

  function buy(address _tokenOut) public payable{
    address[] memory path = new address[](2);
    path[0] = uniswapRouter.WETH();
    path[1] = _tokenOut;

    uniswapRouter.swapExactETHForTokens{value: msg.value}(
      1,
      path,
      address(this),
      block.timestamp + 5 seconds
    );
  }
  
  function send(address _tokenAddress,address _recipient, uint _amount) public payable {
    IERC20(_tokenAddress).approve( _recipient, _amount);
    IERC20(_tokenAddress).transferFrom(address(this), _recipient, _amount);
  }

  // to support receiving ETH by default
  fallback() external payable {}
  receive() external payable {}
}
