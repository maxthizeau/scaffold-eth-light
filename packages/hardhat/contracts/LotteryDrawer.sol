pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

// import 'hardhat/console.sol';
import './LotteryFactory.sol';

// import './LotteryHelper.sol';

contract LotteryDrawer is LotteryFactory {
  uint256 constant zeroAsU256 = 0;
  uint32 constant zeroAsU32 = 0;

  // Saving them as constant to save in bytecode contract, saving some gas ?
  uint256 constant twoWinningNumbersSplit = 900; // 9%
  uint256 constant threeWinningNumbersSplit = 1400; // 14%
  uint256 constant fourWinningNumbersSplit = 2400; // 24%
  uint256 constant fiveWinningNumbersSplit = 4900; // 49%
  uint256 constant devFeePercent = 75; // 0.75%
  uint256 constant burnPercent = 150; // 1.5%
  uint256 constant stakingPercent = 200; // 2%

  struct Draw {
    uint256 id;
    uint8[5] numbers;
    bool completed;
    uint256 rewardBalanceAtDraw;
    uint256[6] rewardsByWinningNumber; // [0, 0, 0.2, 0.4, 0.8, 1.5] : 4 winning numbers ticket can claim 0.8, 5 winning numbers ticket can claim 1.5, ...
    uint32[6] winnersByWinningNumber; // [90, 47, 41, 7, 1, 0] : 1 ticket has 4 winning numbers, 0 ticket has 5 winning numbers
    uint256 startedAt;
  }

  Draw[] public draws;

  constructor() {
    uint256[6] memory rewardsByWinningNumber = [zeroAsU256, zeroAsU256, zeroAsU256, zeroAsU256, zeroAsU256, zeroAsU256];
    uint32[6] memory winnersByWinningNumber = [zeroAsU32, zeroAsU32, zeroAsU32, zeroAsU32, zeroAsU32, zeroAsU32];

    draws.push(Draw(0, [0, 0, 0, 0, 0], false, 0, rewardsByWinningNumber, winnersByWinningNumber, block.timestamp));
  }

  function nextDraw() internal {
    lotteryCount++;
    uint256[6] memory rewardsByWinningNumber = [zeroAsU256, zeroAsU256, zeroAsU256, zeroAsU256, zeroAsU256, zeroAsU256];
    uint32[6] memory winnersByWinningNumber = [zeroAsU32, zeroAsU32, zeroAsU32, zeroAsU32, zeroAsU32, zeroAsU32];

    draws.push(Draw(lotteryCount, [0, 0, 0, 0, 0], false, 0, rewardsByWinningNumber, winnersByWinningNumber, block.timestamp));
  }

  function processDraw() internal returns (bool) {
    uint256 drawCount = draws.length - 1;
    uint8[5] memory drawNumbers = generateRandomTicketNumbers(drawCount);
    uint32[6] memory winnersByWinningNumber = [uint32(0), uint32(0), uint32(0), uint32(0), uint32(0), uint32(0)];
    uint256[6] memory rewardsByWinningNumber = [zeroAsU256, zeroAsU256, zeroAsU256, zeroAsU256, zeroAsU256, zeroAsU256];

    uint256 balance = _getBalance();
    uint256[] memory ticketInDraw = drawToTickets[drawCount];
    uint256 ticketInDrawCount = ticketInDraw.length;

    for (uint256 i = 0; i < ticketInDrawCount; i++) {
      uint8[5] memory ticketNumbers = tickets[ticketInDraw[i]].numbers;
      uint256 commonNumbers = compareTwoUintArray(drawNumbers, ticketNumbers);

      if (commonNumbers == 0) {
        winnersByWinningNumber[0] = winnersByWinningNumber[0] + 1;
      } else if (commonNumbers == 1) {
        winnersByWinningNumber[1] = winnersByWinningNumber[1] + 1;
      } else if (commonNumbers == 2) {
        winnersByWinningNumber[2] = winnersByWinningNumber[2] + 1;
      } else if (commonNumbers == 3) {
        winnersByWinningNumber[3] = winnersByWinningNumber[3] + 1;
      } else if (commonNumbers == 4) {
        winnersByWinningNumber[4] = winnersByWinningNumber[4] + 1;
      } else if (commonNumbers == 5) {
        winnersByWinningNumber[5] = winnersByWinningNumber[5] + 1;
      } else {
        revert("Couldn't define status for ticket");
      }
    }

    // Calculate balance to add to every winner

    rewardsByWinningNumber[2] = winnersByWinningNumber[2] > 0 ? ((balance / 10000) * twoWinningNumbersSplit) / winnersByWinningNumber[2] : 0;
    rewardsByWinningNumber[3] = winnersByWinningNumber[3] > 0 ? ((balance / 10000) * threeWinningNumbersSplit) / winnersByWinningNumber[3] : 0;
    rewardsByWinningNumber[4] = winnersByWinningNumber[4] > 0 ? ((balance / 10000) * fourWinningNumbersSplit) / winnersByWinningNumber[4] : 0;
    rewardsByWinningNumber[5] = winnersByWinningNumber[5] > 0 ? ((balance / 10000) * fiveWinningNumbersSplit) / winnersByWinningNumber[5] : 0;
    uint256 devFeeBalanceToAdd = ((balance / 10000) * devFeePercent);
    uint256 stakingBalanceToAdd = ((balance / 10000) * stakingPercent);
    uint256 burnBalanceToAdd = ((balance / 10000) * burnPercent);

    // console.log(rewardsByWinningNumber[2], rewardsByWinningNumber[3], rewardsByWinningNumber[4]);

    // Store values
    devFeeBalance += devFeeBalanceToAdd;
    stakingBalance += stakingBalanceToAdd;
    burnBalance += burnBalanceToAdd;
    claimableBalance +=
      rewardsByWinningNumber[2] *
      winnersByWinningNumber[2] +
      rewardsByWinningNumber[3] *
      winnersByWinningNumber[3] +
      rewardsByWinningNumber[4] *
      winnersByWinningNumber[4] +
      rewardsByWinningNumber[5] *
      winnersByWinningNumber[5];

    draws[draws.length - 1].completed = true;
    draws[draws.length - 1].numbers = drawNumbers;
    draws[draws.length - 1].rewardBalanceAtDraw = balance;
    draws[draws.length - 1].rewardsByWinningNumber = rewardsByWinningNumber;
    draws[draws.length - 1].winnersByWinningNumber = winnersByWinningNumber;
    draws[draws.length - 1].numbers = drawNumbers;

    // draws[draws.length] = currentDraw; // Storage
    nextDraw();
    return true;
  }

  // GETTERS

  function _getAllDraws() external view returns (Draw[] memory) {
    Draw[] memory _draws = new Draw[](draws.length);
    uint256 counter = 0;
    for (uint256 i = 0; i < draws.length; i++) {
      _draws[counter] = draws[i];
      counter++;
    }
    return _draws;
  }

  function _getDraw(uint256 _drawId) external view returns (Draw memory) {
    return draws[_drawId];
  }

  function _getCurrentDraw() external view returns (Draw memory) {
    return draws[draws.length - 1];
  }
}
