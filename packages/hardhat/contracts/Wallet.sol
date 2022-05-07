//SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "hardhat/console.sol";

contract Wallet {

  address public owner;

  event Invoked(address indexed module, address indexed target, uint indexed value, bytes data);
  
  constructor() {
    owner = msg.sender;
  }

  modifier ownerOnly {
    require(msg.sender == owner, 'Only the owner can call this function');
    _;
  }

  function invoke(address _target, uint _value, bytes calldata _data) external returns (bytes memory _result) {
      bool success;
      (success, _result) = _target.call{value: _value}(_data);
      if (!success) {
          assembly {
              returndatacopy(0, 0, returndatasize())
              revert(0, returndatasize())
          }
      }
      emit Invoked(msg.sender, _target, _value, _data);
  }

  // to support receiving ETH by default
  fallback() external payable {}
  receive() external payable {}
}
