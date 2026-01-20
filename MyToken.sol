// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor() ERC20("DEX Coin", "DEX") {
        // Mint 1 Million tokens to deployer
        _mint(msg.sender, 1000000 * 10**18);
    }
}
