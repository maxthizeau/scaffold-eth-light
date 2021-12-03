pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import 'hardhat/console.sol';
import './LotteryHelper.sol';

contract Lottery is LotteryHelper {
  // LotteryHelper helper = new LotteryHelper();
  uint256 public lotteryCount;
  uint256 public ticketPrice = 0.005 ether;
  uint256 claimableBalance = 0;
  uint256 devFeeBalance = 0;
  uint256 stakingBalance = 0;
  uint256 burnBalance = 0;

  // Percents used when lottery draw
  uint256 twoWinningNumbersSplit = 900; // 9%
  uint256 threeWinningNumbersSplit = 1400; // 14%
  uint256 fourWinningNumbersSplit = 2400; // 24%
  uint256 fiveWinningNumbersSplit = 4900; // 49%
  uint256 devFeePercent = 75; // 0.75%
  uint256 burnPercent = 150; // 1.5%
  uint256 stakingPercent = 200; // 2%

  enum TicketStatus {
    Pending,
    Lost,
    TwoWinningNumber,
    ThreeWinningNumber,
    FourWinningNumber,
    FiveWinningNumber
  }

  struct Draw {
    uint256 id;
    uint8[5] numbers;
    // uint256[] tickets;
    bool completed;
  }

  struct Ticket {
    uint8[5] numbers;
    uint256 lotteryNumber;
    TicketStatus ticketStatus;
    uint256 claimableAmount;
  }

  Ticket[] public tickets;
  Draw[] public draws;

  // mapping(address => Ticket) public ownerToTickets;
  // mapping(address => uint256) public ownerToTickets;
  // mapping(uint256 => uint256) public ticketToDraw;
  mapping(uint256 => address) public ticketToOwner;
  mapping(address => uint256) ownerTicketCount;
  mapping(address => mapping(uint256 => uint256)) ownerDrawsTicketCount;
  mapping(uint256 => uint256[]) drawToTickets;

  constructor() {
    lotteryCount = 0;
    uint256 id = 0;
    uint8[5] memory numbers = [0, 0, 0, 0, 0];
    // uint256[] memory tickets = new uint256[](0);
    bool completed = false;
    draws.push(Draw(id, numbers, completed));
  }

  function nextDraw() internal {
    lotteryCount++;
    uint256 id = lotteryCount;
    uint8[5] memory numbers = [0, 0, 0, 0, 0];
    bool completed = false;
    draws.push(Draw(id, numbers, completed));
  }

  //   function createTicket() {}
  function buyRandomTicket(address _owner, uint256 randomArg) private {
    // require(msg.value == ticketPrice, 'Value given is different from the ticket price');
    uint8[5] memory numbers = generateRandomTicketNumbers(lotteryCount + randomArg);
    tickets.push(Ticket(numbers, lotteryCount, TicketStatus.Pending, 0));
    uint256 id = tickets.length - 1;
    ticketToOwner[id] = _owner;
    drawToTickets[lotteryCount].push(id);
    ownerTicketCount[_owner]++;
    ownerDrawsTicketCount[_owner][lotteryCount]++;
  }

  function buyMultipleRandomTicket(uint256 amount) public payable {
    require(msg.value / amount == ticketPrice, 'Value given is different from the ticket price');
    for (uint256 i = 0; i < amount; i++) {
      buyRandomTicket(msg.sender, i);
    }
  }

  function draw() public {
    // Draw storage currentDraw = draws[lotteryCount];
    uint8[5] memory drawNumbers = generateRandomTicketNumbers(lotteryCount);
    // Ticket[] memory drawTickets = new Ticket[](drawToTickets[lotteryCount].length);
    // Ticket[] storage drawTickets;
    uint32[5] memory winnersCountByWinningNumber = [uint32(0), uint32(0), uint32(0), uint32(0), uint32(0)];
    uint256 balance = _getBalance();

    console.log('%s draws', draws.length);
    console.log('%s lotteryCount', lotteryCount);
    console.log('%s tickets in this draw', drawToTickets[lotteryCount].length);
    console.log('Draw number : %s - %s - %s', drawNumbers[0], drawNumbers[1], drawNumbers[2]);
    console.log('%s - %s', drawNumbers[3], drawNumbers[4]);
    // Compare numbers of every tickets of the draw to the draw numbers.

    for (uint256 i = 0; i < drawToTickets[lotteryCount].length; i++) {
      uint256 commonNumbers = compareTwoUintArray(drawNumbers, tickets[drawToTickets[lotteryCount][i]].numbers);
      Ticket storage ticketTmp = tickets[drawToTickets[lotteryCount][i]];

      if (commonNumbers == 0 || commonNumbers == 1) {
        ticketTmp.ticketStatus = TicketStatus.Lost;
        winnersCountByWinningNumber[0]++;
      } else if (commonNumbers == 2) {
        ticketTmp.ticketStatus = TicketStatus.TwoWinningNumber;
        winnersCountByWinningNumber[1]++;
      } else if (commonNumbers == 3) {
        ticketTmp.ticketStatus = TicketStatus.ThreeWinningNumber;
        winnersCountByWinningNumber[2]++;
      } else if (commonNumbers == 4) {
        ticketTmp.ticketStatus = TicketStatus.FourWinningNumber;
        winnersCountByWinningNumber[3]++;
      } else if (commonNumbers == 5) {
        ticketTmp.ticketStatus = TicketStatus.FiveWinningNumber;
        winnersCountByWinningNumber[4]++;
      } else {
        revert("Couldn't define status for ticket");
      }
    }

    // Calculate balance to add to every winner

    uint256 claimableBalanceFor2WinningNumbers = winnersCountByWinningNumber[1] > 0
      ? ((balance / 10000) * twoWinningNumbersSplit) / winnersCountByWinningNumber[1]
      : 0;
    uint256 claimableBalanceFor3WinningNumbers = winnersCountByWinningNumber[2] > 0
      ? ((balance / 10000) * threeWinningNumbersSplit) / winnersCountByWinningNumber[2]
      : 0;
    uint256 claimableBalanceFor4WinningNumbers = winnersCountByWinningNumber[3] > 0
      ? ((balance / 10000) * fourWinningNumbersSplit) / winnersCountByWinningNumber[3]
      : 0;
    uint256 claimableBalanceFor5WinningNumbers = winnersCountByWinningNumber[4] > 0
      ? ((balance / 10000) * fiveWinningNumbersSplit) / winnersCountByWinningNumber[4]
      : 0;
    uint256 devFeeBalanceToAdd = ((balance / 10000) * devFeePercent);
    uint256 stakingBalanceToAdd = ((balance / 10000) * stakingPercent);
    uint256 burnBalanceToAdd = ((balance / 10000) * burnPercent);

    devFeeBalance += devFeeBalanceToAdd;
    stakingBalance += stakingBalanceToAdd;
    burnBalance += burnBalanceToAdd;

    // Now we have winner count, we can add claimable balance to each ticket.
    for (uint256 j = 0; j < drawToTickets[lotteryCount].length; j++) {
      if (tickets[drawToTickets[lotteryCount][j]].ticketStatus == TicketStatus.TwoWinningNumber) {
        tickets[drawToTickets[lotteryCount][j]].claimableAmount = claimableBalanceFor2WinningNumbers;
        claimableBalance += claimableBalanceFor2WinningNumbers;
      } else if (tickets[drawToTickets[lotteryCount][j]].ticketStatus == TicketStatus.ThreeWinningNumber) {
        tickets[drawToTickets[lotteryCount][j]].claimableAmount = claimableBalanceFor3WinningNumbers;
        claimableBalance += claimableBalanceFor3WinningNumbers;
      } else if (tickets[drawToTickets[lotteryCount][j]].ticketStatus == TicketStatus.FourWinningNumber) {
        tickets[drawToTickets[lotteryCount][j]].claimableAmount = claimableBalanceFor4WinningNumbers;
        claimableBalance += claimableBalanceFor4WinningNumbers;
      } else if (tickets[drawToTickets[lotteryCount][j]].ticketStatus == TicketStatus.FiveWinningNumber) {
        tickets[drawToTickets[lotteryCount][j]].claimableAmount = claimableBalanceFor5WinningNumbers;
        claimableBalance += claimableBalanceFor5WinningNumbers;
      } else {
        tickets[drawToTickets[lotteryCount][j]].claimableAmount = 0;
      }
    }

    // Record in storage the proccessed tickets
    for (uint256 i = 0; i < drawToTickets[lotteryCount].length; i++) {
      tickets[drawToTickets[lotteryCount][i]] = tickets[drawToTickets[lotteryCount][i]]; // Storage
    }

    draws[lotteryCount].completed = true;
    draws[lotteryCount].numbers = drawNumbers;
    for (uint256 i = 0; i < draws[lotteryCount].numbers.length; i++) {
      draws[lotteryCount].numbers[i] = drawNumbers[i];
    }
    // draws[lotteryCount] = currentDraw; // Storage
    nextDraw();
  }

  function claim() public payable returns (uint256) {
    uint256 claimableAmount = 0;
    for (uint256 i = 0; i < tickets.length; i++) {
      if (ticketToOwner[i] == msg.sender) {
        claimableAmount += tickets[i].claimableAmount;
        claimableBalance -= tickets[i].claimableAmount;
        tickets[i].claimableAmount = 0;
      }
    }
    (bool sent, bytes memory data) = msg.sender.call{value: claimableAmount}('');
    require(sent, 'Failed to send Ether');
    return claimableAmount;
  }

  function _getClaimableAmountOfAddress(address _address) external view returns (uint256) {
    uint256 claimableAmount = 0;
    for (uint256 i = 0; i < tickets.length; i++) {
      if (ticketToOwner[i] == _address) {
        claimableAmount += tickets[i].claimableAmount;
      }
    }
    return claimableAmount;
  }

  function compareTwoUintArray(uint8[5] memory _drawNumbers, uint8[5] memory _ticketNumbers) private pure returns (uint256) {
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

  function _getTicketsByOwner(address _owner) external view returns (uint256[] memory) {
    uint256[] memory result = new uint256[](ownerTicketCount[_owner]);
    uint256 counter = 0;
    for (uint256 i = 0; i < tickets.length; i++) {
      if (ticketToOwner[i] == _owner) {
        result[counter] = i;
        counter++;
      }
    }
    return result;
  }

  // function _getTicketsByOwnerAndLotteryNumber(address _owner, uint256 _lotteryNumber) external view returns (uint256[] memory) {
  //   uint256[] memory result = new uint256[](ownerTicketCount[_owner]);
  //   uint256 counter = 0;
  //   for (uint256 i = 0; i < tickets.length; i++) {
  //     Ticket memory ticket = tickets[i];
  //     if (ticketToOwner[i] == _owner && ticket.lotteryNumber == _lotteryNumber) {
  //       result[counter] = i;
  //       counter++;
  //     }
  //   }
  //   return result;
  // }

  function _getTicket(uint256 _ticketId) public view returns (Ticket memory) {
    return tickets[_ticketId];
  }

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

  function _getTicketsOfOwnerForDraw(address _owner, uint256 _drawId) external view returns (Ticket[] memory) {
    Ticket[] memory result = new Ticket[](ownerDrawsTicketCount[_owner][_drawId]);
    uint256 counter = 0;
    // drawToTickets[_drawId] returns all the ticket ids of the draw
    // So : Foreach ticket in this draw (where drawToTickets[_drawId][i] is a ticket id)
    for (uint256 i = 0; i < drawToTickets[_drawId].length; i++) {
      // Create currentTicketId var for a better readability
      uint256 currentTicketId = drawToTickets[_drawId][i];
      // If the owner of currentTicketId is the owner we're looking for, add it in result array
      if (ticketToOwner[currentTicketId] == _owner) {
        result[counter] = tickets[currentTicketId];
        counter++;
      }
    }
    return result;
  }

  function _getCurrentDrawTicketsOfOwner(address _owner) external view returns (uint256[] memory) {
    console.log('%s lottery count', lotteryCount);
    uint256[] memory ticketsOfOwner = new uint256[](ownerDrawsTicketCount[_owner][lotteryCount]);
    uint256 counter = 0;

    for (uint256 i = 0; i < drawToTickets[lotteryCount].length; i++) {
      if (_owner == ticketToOwner[drawToTickets[lotteryCount][i]]) {
        ticketsOfOwner[counter] = drawToTickets[lotteryCount][i];
        counter++;
      }
    }

    return ticketsOfOwner;
  }

  function _getCurrentDraw() external view returns (Draw memory) {
    return draws[lotteryCount];
  }

  function _getBalance() public view returns (uint256) {
    return address(this).balance - claimableBalance - stakingBalance - burnBalance - devFeeBalance;
  }

  function _getAllBalances()
    public
    view
    returns (
      uint256,
      uint256,
      uint256,
      uint256,
      uint256
    )
  {
    return (address(this).balance, claimableBalance, devFeeBalance, stakingBalance, burnBalance);
  }
  // function getTickets(address _address) external view returns (Ticket memory) {
  //   Ticket memory tickets = ownerToTickets[_address];
  //   return tickets;
  // }
  //   function claim() {}
  //   function getResultFromTicket() {}
}
