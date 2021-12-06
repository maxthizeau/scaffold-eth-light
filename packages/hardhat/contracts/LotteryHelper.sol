pragma solidity >=0.8.0 <0.9.0;

//SPDX-License-Identifier: MIT

// import 'hardhat/console.sol';

contract LotteryHelper {
  /// @dev Generate 5 numbers ( 1 <= x >= 25) with no duplicate
  /// @param _lotteryCount used for the random generator number function
  /// @return uint256[5] return an array of 5 generated uint
  function generateRandomTicketNumbers(uint256 _lotteryCount) internal view returns (uint8[5] memory) {
    uint8[5] memory numbers;
    uint256 generatedNumber;

    // Execute 5 times (to generate 5 numbers)
    for (uint256 i = 0; i < 5; i++) {
      //   Check duplicate
      bool readyToAdd = false;
      uint256 maxRetry = 5;
      uint256 retry = 0;
      // Generate a new number while it is a duplicate, up to 5 times (to prevent errors and infinite loops)
      while (!readyToAdd && retry <= maxRetry) {
        generatedNumber = (uint256(keccak256(abi.encodePacked(msg.sender, block.timestamp, i, retry, _lotteryCount))) % 25) + 1;
        bool isDuplicate = false;
        // Look in all already generated numbers array if the new generated number is already there.
        for (uint256 j = 0; j < numbers.length; j++) {
          if (numbers[j] == generatedNumber) {
            isDuplicate = true;
            break;
          }
        }
        readyToAdd = !isDuplicate;
        retry++;
      }
      // Throw if we hit maximum retry : generated a duplicate 5 times in a row.
      require(retry < maxRetry, 'Error generating random ticket numbers. Max retry.');
      numbers[i] = uint8(generatedNumber);
    }

    return numbers;
  }

  function compareTwoUintArray(uint8[5] memory _drawNumbers, uint8[5] memory _ticketNumbers) internal pure returns (uint256) {
    uint256 commonNumbers = 0;

    for (uint256 i = 0; i < _drawNumbers.length; i++) {
      for (uint256 j = 0; j < _ticketNumbers.length; j++) {
        if (_drawNumbers[i] == _ticketNumbers[j]) {
          commonNumbers++;
        }
      }
    }
    return commonNumbers;
  }
}
