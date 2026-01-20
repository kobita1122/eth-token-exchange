// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Exchange is Ownable {
    IERC20 public token;
    uint256 public rate = 100; // 1 ETH = 100 Tokens

    event Bought(address indexed buyer, uint256 amount);
    event Sold(address indexed seller, uint256 amount);

    constructor(address _tokenAddress) {
        token = IERC20(_tokenAddress);
    }

    // User sends ETH, gets Tokens
    function buyTokens() external payable {
        uint256 tokenAmount = msg.value * rate;
        require(token.balanceOf(address(this)) >= tokenAmount, "Not enough liquidity");
        
        token.transfer(msg.sender, tokenAmount);
        emit Bought(msg.sender, tokenAmount);
    }

    // User sends Tokens, gets ETH
    function sellTokens(uint256 _amount) external {
        require(_amount > 0, "Amount must be > 0");
        uint256 ethAmount = _amount / rate;
        require(address(this).balance >= ethAmount, "Not enough ETH in DEX");

        token.transferFrom(msg.sender, address(this), _amount);
        payable(msg.sender).transfer(ethAmount);
        
        emit Sold(msg.sender, _amount);
    }

    // Admin adds liquidity
    function withdrawLiquidity() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}
