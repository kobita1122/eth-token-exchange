const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DEX", function () {
  it("Should allow buying and selling", async function () {
    const [deployer, user] = await ethers.getSigners();
    
    // Deploy
    const Token = await ethers.getContractFactory("MyToken");
    const token = await Token.deploy();
    const Dex = await ethers.getContractFactory("Exchange");
    const dex = await Dex.deploy(token.address);
    
    // Fund DEX
    await token.transfer(dex.address, ethers.utils.parseEther("1000"));

    // User Buy
    await dex.connect(user).buyTokens({ value: ethers.utils.parseEther("1") });
    expect(await token.balanceOf(user.address)).to.equal(ethers.utils.parseEther("100"));

    // User Sell
    await token.connect(user).approve(dex.address, ethers.utils.parseEther("100"));
    await dex.connect(user).sellTokens(ethers.utils.parseEther("100"));
    
    expect(await token.balanceOf(user.address)).to.equal(0);
  });
});
