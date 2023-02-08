import { ethers } from "hardhat";

async function main() {
  // We get the contract to deploy
  const signer = await ethers.getSigners();
  console.log("signer", signer[0].address);
  const LinkPay = await ethers.getContractFactory("LinkPay");
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
