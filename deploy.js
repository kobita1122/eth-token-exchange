const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  // 1. Deploy Token
  const Token = await hre.ethers.getContractFactory("MyToken");
  const token = await Token.deploy();
  await token.deployed();
  console.log("Token deployed to:", token.address);

  // 2. Deploy Exchange
  const Exchange = await hre.ethers.getContractFactory("Exchange");
  const dex = await Exchange.deploy(token.address);
  await dex.deployed();
  console.log("Exchange deployed to:", dex.address);

  // 3. Fund Exchange (Add Liquidity)
  // Send 10,000 Tokens to the DEX so people can buy them
  const liquidity = hre.ethers.utils.parseUnits("10000", 18);
  await token.transfer(dex.address, liquidity);
  console.log("Liquidity added to DEX");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
