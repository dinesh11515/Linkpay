import { ethers, accounts } from "hardhat";

async function main() {
  // We get the contract to deploy
  const signer = await accounts.getSigners();
  const LinkPay = await ethers.getContractFactory("LinkPay", signer[0]);
  const linkPay = await LinkPay.deploy();

  await linkPay.deployed();

  console.log("LinkPay deployed to:", linkPay.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
