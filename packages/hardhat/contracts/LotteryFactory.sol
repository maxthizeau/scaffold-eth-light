pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT
import './LotteryHelper.sol';

contract LotteryFactory is LotteryHelper {
  using SafeMath for uint256;

  uint256 public lotteryCount;
  uint256 public ticketPrice = 0.005 ether;
  uint256 claimableBalance = 0;
  uint256 devFeeBalance = 0;
  uint256 stakingBalance = 0;
  uint256 burnBalance = 0;

  enum TicketStatus {
    Pending,
    Lost,
    TwoWinningNumber,
    ThreeWinningNumber,
    FourWinningNumber,
    FiveWinningNumber
  }

  struct Ticket {
    uint8[5] numbers;
    uint256 drawNumber;
    bool claimed;
  }

  Ticket[] public tickets;

  mapping(uint256 => address) public ticketToOwner;
  mapping(uint256 => uint256[]) public drawToTickets;
  mapping(address => uint256) ownerTicketCount;

  // mapping(address => mapping(uint256 => uint256)) ownerDrawsTicketCount;

  //   function createTicket() {}
  function buyRandomTicket(address _owner, uint256 _randomArg) private {
    // require(msg.value == ticketPrice, 'Value given is different from the ticket price');
    // Store lotterycount in memory to save some gas
    uint256 lotteryCountMem = lotteryCount;
    uint8[5] memory numbers = generateRandomTicketNumbers(lotteryCountMem + _randomArg);
    tickets.push(Ticket(numbers, lotteryCountMem, false));
    uint256 id = tickets.length.sub(1);
    ticketToOwner[id] = _owner;
    drawToTickets[lotteryCountMem].push(id);
    ownerTicketCount[_owner] = ownerTicketCount[_owner].add(1);
    // ownerDrawsTicketCount[_owner][lotteryCountMem]++;
  }

  function buyMultipleRandomTicket(uint256 amount) public payable {
    require(msg.value / amount == ticketPrice, 'Value given is different from the ticket price');
    for (uint256 i = 0; i < amount; i++) {
      buyRandomTicket(msg.sender, i);
    }
  }

  function _getTicketsByOwner(address _owner) external view returns (uint256[] memory) {
    uint256[] memory result = new uint256[](ownerTicketCount[_owner]);
    uint256 counter = 0;
    for (uint256 i = 0; i < tickets.length; i++) {
      if (ticketToOwner[i] == _owner) {
        result[counter] = i;
        counter = counter.add(1);
      }
    }
    return result;
  }

  function _getTicket(uint256 _ticketId) public view returns (Ticket memory) {
    return tickets[_ticketId];
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

  function _getDrawToTickets(uint256 _drawId) public view returns (uint256[] memory) {
    return drawToTickets[_drawId];
  }
}
