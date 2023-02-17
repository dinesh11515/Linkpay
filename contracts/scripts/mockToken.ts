import { ethers, accounts } from "hardhat";

async function main() {
  // We get the contract to deploy
  const signer = await accounts.getSigners();
  const USDT = await ethers.getContractFactory("USDT", signer[0]);

  const usdt = await USDT.deploy("USDT", "USDT");

  await usdt.deployed();

  console.log("USDT deployed to:", usdt.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
