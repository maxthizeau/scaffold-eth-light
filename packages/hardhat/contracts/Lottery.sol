pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import './LotteryClaimer.sol';
import 'hardhat/console.sol';

contract Lottery is LotteryClaimer {
  uint256 private delay = 6 hours;

  function draw() public returns (bool) {
    bool success = false;
    if (needToDraw()) {
      success = processDraw();
    }
    return success;
  }

  function nextLotteryAt() public view returns (uint256) {
    return draws[lotteryCount].startedAt + delay;
  }

  function needToDraw() public view returns (bool) {
    return block.timestamp - draws[lotteryCount].startedAt >= delay;
  }
}
