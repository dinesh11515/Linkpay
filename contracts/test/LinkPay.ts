import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers } from "hardhat";
import { Contract } from "ethers";

import { expect } from "chai";

describe("LinkPay", function () {
  let linkPay: Contract;
  let deployer: SignerWithAddress,
    user: SignerWithAddress,
    client: SignerWithAddress;
  let token: Contract;

  before(async function () {
    [deployer, user, client] = await ethers.getSigners();
    const LinkPay = await ethers.getContractFactory("LinkPay", deployer);
    linkPay = await LinkPay.deploy();
    await linkPay.deployed();
    const MyToken = await ethers.getContractFactory("MyToken", client);
    token = await MyToken.deploy();
    await token.deployed();
  });

  it("generate link", async function () {
    let tx = await linkPay
      .connect(user)
      .generateLink(
        "dineshaitham",
        "",
        "Dinesh Aitham",
        "developer",
        "twitter.com/dineshaitham",
        [{ tokenName: "DIN", tokenAddress: token.address }]
      );
    await tx.wait();

    let link = await linkPay.connect(user).addressToUsername(user.address);
    expect(link).to.equal("dineshaitham");
  });

  it("pay to user", async function () {
    const balanceOFCLient = await token.balanceOf(client.address);
    console.log("balanceOFCLient", balanceOFCLient.toString());
    const balanceBefore = await token.balanceOf(user.address);
    console.log("balanceBefore", balanceBefore.toString());
    await token
      .connect(client)
      .approve(linkPay.address, ethers.utils.parseEther("100"));
    let tx = await linkPay
      .connect(client)
      .payToUser("dineshaitham", 100, token.address, token.name);
    await tx.wait();
    const balanceAfter = await token.balanceOf(user.address);
    console.log("balanceAfter", balanceAfter.toString());
    expect(balanceAfter).to.equal(
      balanceBefore.add(ethers.utils.parseEther("100"))
    );
  });
});
