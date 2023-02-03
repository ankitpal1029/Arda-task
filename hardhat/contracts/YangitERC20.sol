// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract YangitERC20 is ERC20 {
    constructor(uint256 initialSupply) ERC20("Yangit", "YGT"){
        _mint(msg.sender, initialSupply);
    }
}