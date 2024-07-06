// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Marketplace {
    struct Dataset {
    uint id;
    string name;
    string description;
    string dataHash; // This field stores the IPFS hash
    uint price;
    address payable owner;
    bool purchased;
}

    uint public datasetCount = 0;
    mapping(uint => Dataset) public datasets;

    function createDataset(string memory _name, string memory _description, string memory _dataHash, uint _price) public {
        datasetCount++;
        datasets[datasetCount] = Dataset(datasetCount, _name, _description, _dataHash, _price, payable(msg.sender), false);
    }

    function purchaseDataset(uint _id) public payable {
        Dataset memory _dataset = datasets[_id];
        require(_dataset.id > 0 && _dataset.id <= datasetCount);
        require(msg.value >= _dataset.price);
        require(!_dataset.purchased);

        _dataset.owner.transfer(msg.value);
        _dataset.purchased = true;
        datasets[_id] = _dataset;
    }

    function getDataset(uint _id) public view returns (string memory, string memory, string memory, uint, address, bool) {
        Dataset memory _dataset = datasets[_id];
        return (_dataset.name, _dataset.description, _dataset.dataHash, _dataset.price, _dataset.owner, _dataset.purchased);
    }
}
