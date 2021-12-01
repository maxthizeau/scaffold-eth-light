pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import 'hardhat/console.sol';

contract MyFirstContract {
  event SetPurpose(address sender, string purpose);

  string public purpose = 'Build unstoppable dApps !';

  function setPurpose(string memory _newPurpose) public payable {
    // require(msg.value >= 0.001 ether);
    purpose = _newPurpose;
    console.log(msg.sender, 'set purpose to', _newPurpose);
    emit SetPurpose(msg.sender, purpose);
  }

  function balance() public view returns (uint256) {
    return address(this).balance;
  }
}
