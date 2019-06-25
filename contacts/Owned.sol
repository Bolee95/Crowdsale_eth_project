pragma solidity ^0.4.22;
contract Owned {
    address private _owner;
    address private _newOwner;

    event OwnershipTransferred(address indexed from, address indexed to);

    constructor() public {
        _owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == _owner);
        _;
    }
    
    function getOwnerAddress() public view returns (address) {
        return _owner;
    }

    function transferOwnership(address newOwner) public onlyOwner {
        _newOwner = newOwner;
    }
    function acceptOwnership() public {
        require(msg.sender == _newOwner);
        emit OwnershipTransferred(_owner, _newOwner);
        _owner = _newOwner;
        _newOwner = address(0);
    }
}