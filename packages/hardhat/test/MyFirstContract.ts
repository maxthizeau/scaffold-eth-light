import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('MyFirstContract', function () {
  it("should read 'Build unstoppable dApps !' from purpose after deploy", async function () {
    const [owner] = await ethers.getSigners();
    const MyFirstContract = await ethers.getContractFactory('MyFirstContract');
    const contract = await MyFirstContract.deploy();
    await contract.deployed();
    expect(await contract.purpose()).to.equal('Build unstoppable dApps !');
  });
});
