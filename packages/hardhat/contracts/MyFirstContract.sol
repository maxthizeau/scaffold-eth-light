// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.6;

contract MyFirstContract {
  event SetPurpose(address sender, string purpose);

  string public purpose = 'Build unstoppable dApps !';

  function setPurpose(string memory _newPurpose) public {
    purpose = _newPurpose;
    emit SetPurpose(msg.sender, purpose);
  }
}
