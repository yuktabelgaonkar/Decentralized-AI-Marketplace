// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract AIContract {
    string public data;

    function setData(string memory _data) public {
        data = _data;
    }

    function getData() public view returns (string memory) {
        return data;
    }
}
