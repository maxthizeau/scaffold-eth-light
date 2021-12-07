import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/dist/src/signers';
import { expect } from 'chai';
import { ethers, network } from 'hardhat';
import { Contract, ContractFactory } from 'ethers';
import { formatEther, parseEther } from '@ethersproject/units';
import { Lottery } from 'helpers/types/contract-types';
import { BigNumber } from '@ethersproject/bignumber';

describe('Lottery', function () {
  let owner: SignerWithAddress, alice: SignerWithAddress, bob: SignerWithAddress;
  let Lottery: ContractFactory;
  let contract: Lottery;
  let ticketPrice: BigNumber;

  this.beforeAll(async () => {
    // [owner, alice, bob] = await ethers.getSigners();
  });
  this.beforeEach(async () => {
    [owner, alice, bob] = await ethers.getSigners();
    Lottery = await ethers.getContractFactory('Lottery');
    contract = (await Lottery.deploy()) as Lottery;
    await contract.deployed();
    ticketPrice = await contract.ticketPrice();
  });
  it('should set the right owner', async function () {
    expect(await contract.owner()).to.equal(owner.address);
  });
  it('should return the base price of a ticket (0.005)', async function () {
    const ticketPrice = (await contract.ticketPrice()).toString();
    expect(formatEther(ticketPrice)).to.equal('0.005');
  });

  // should create an empty draw after deployment with id of 0
  it('should create an empty draw after deployment with id of 0', async function () {
    const draw1 = await contract.draws(0);
    expect(draw1).to.exist;
    await expect(contract.draws(1)).to.be.reverted;
  });
  // should transfer ownership to Alice
  it('should transfer ownership to Alice', async function () {
    expect(await contract.owner()).to.be.equal(owner.address);
    await contract.transferOwnership(alice.address, { from: owner.address });
    expect(await contract.owner()).to.be.equal(alice.address);
  });

  // Buy Ticket :
  // should return a tickets array length of 1 when user buy a ticket
  it('should return a tickets array length of 1 when user buy a ticket', async () => {
    // tickets[0] should not exist yet
    await expect(contract.tickets(0)).to.be.reverted;
    const ticketPrice = await contract.ticketPrice();
    // Alice buys one ticket
    await contract.connect(alice).buyMultipleRandomTicket(1, { value: ticketPrice });
    //tickets[0] should now exist
    expect(await contract.tickets(0)).to.exist;
    await expect(contract.tickets(1)).to.be.reverted;
    //ticketToOwner[0] should now be alice's address
    expect(await contract.ticketToOwner(0)).to.be.equal(alice.address);
  });

  // should return a draw tickets array length of 1 when user buy a ticket
  it('should return a draw tickets array length of 1 when user buy a ticket', async () => {
    // Ticket should not exist in draw yet
    await expect(contract.drawToTickets(0, 0)).to.be.reverted;

    await contract.connect(alice).buyMultipleRandomTicket(1, { value: ticketPrice });
    expect(contract.drawToTickets(0, 0)).to.exist;
  });

  // Draw :
  // should increase the lottery count and create new draw after a draw
  it('should increase the lottery count and create new draw after a draw', async () => {
    expect(await contract.lotteryCount()).to.be.equal(0);
    await network.provider.send('evm_increaseTime', [3600 * 7]);
    await network.provider.send('evm_mine');
    const draw = await contract.draw();
    await expect(contract.draws(1)).to.not.be.reverted;
    expect(await contract.lotteryCount()).to.be.equal(1);
  });
  // should not be able to draw before delay time
  it('should not be able to draw before delay time', async () => {
    const draw1 = await contract.draw();
    await expect(contract.draws(1)).to.be.reverted;
  });
  // should be able to draw after delay time
  it('should be able to draw after delay time', async () => {
    await network.provider.send('evm_increaseTime', [3600 * 7]);
    await network.provider.send('evm_mine');
    const draw = await contract.draw();
    await expect(contract.draws(1)).to.not.be.reverted;
  });
  // should increase devFee balance after a draw
  it('should increase devFee balance after a draw', async () => {
    expect((await contract._getAllBalances())[2]).to.be.equal('0');
    // Buy tickets
    await contract.connect(alice).buyMultipleRandomTicket(2, { value: ticketPrice.mul(2) });
    await contract.connect(bob).buyMultipleRandomTicket(2, { value: ticketPrice.mul(2) });

    await network.provider.send('evm_increaseTime', [3600 * 7]);
    await network.provider.send('evm_mine');

    await contract.draw();
    const draw = await contract.draws(0);
    expect((await contract._getAllBalances())[2]).to.not.be.equal('0');
  });

  // Claim :
  // user should not be able to claim and get rewards twice
  it('should not be able to claim and get rewards twice', async () => {
    // Buy tickets
    await contract.connect(alice).buyMultipleRandomTicket(20, { value: ticketPrice.mul(20) });

    await network.provider.send('evm_increaseTime', [3600 * 7]);
    await network.provider.send('evm_mine');

    await contract.draw();
    const draw = await contract.draws(0);
    const balanceBeforeClaim = await alice.getBalance();
    const claimableBalanceOfAlice = await contract.getClaimableAmountOfAddress(alice.address);
    if (claimableBalanceOfAlice !== BigNumber.from(0)) {
      // First claim
      const allBalancesBeforeClaim = await contract._getAllBalances();
      expect(allBalancesBeforeClaim[1].gt(0)).to.be.true;
      await contract.connect(alice).claim();
      const balanceAfterClaim = await alice.getBalance();
      expect(balanceBeforeClaim.lt(balanceAfterClaim), "Alice's balance before claim should be less than after claim").to.be.true;
      const allBalancesAfterFirstClaim = await contract._getAllBalances();
      expect(allBalancesAfterFirstClaim[1].eq(0), `Claimable balance should be 0 after claim. Found ${formatEther(allBalancesAfterFirstClaim[1])}`).to.be.true;
      await contract.connect(alice).claim();
      const allBalancesAfterSecondClaim = await contract._getAllBalances();

      // 2 successive claims should not change any of the contract balances
      for (let i = 0; i < allBalancesAfterFirstClaim.length; i++) {
        // console.log(`${formatEther(allBalancesAfterFirstClaim[i])} = ${formatEther(allBalancesAfterSecondClaim[i])}`);
        expect(allBalancesAfterFirstClaim[i].eq(allBalancesAfterSecondClaim[i])).to.be.true;
      }
    }
  });
  // should reduce the claimable balance after user claimed rewards

  // Dev Fee :
  // should withdraw devFee to owner
  it('should withdraw devFee to owner', async function () {
    // Buy tickets and draw
    await contract.connect(alice).buyMultipleRandomTicket(10, { value: ticketPrice.mul(10) });
    await contract.connect(bob).buyMultipleRandomTicket(10, { value: ticketPrice.mul(10) });

    await network.provider.send('evm_increaseTime', [3600 * 7]);
    await network.provider.send('evm_mine');
    await contract.draw();

    const ownerBalanceBeforeWithdraw = await owner.getBalance();
    await contract.connect(owner).withdraw();
    const ownerBalanceAfterWithdraw = await owner.getBalance();

    expect(ownerBalanceBeforeWithdraw.lt(ownerBalanceAfterWithdraw)).to.be.true;
  });
  // should revert when Alice tries to withdraw devFee
  it('should revert when Alice tries to withdraw devFee', async function () {
    await expect(contract.connect(alice).withdraw()).to.be.reverted;
  });
});
