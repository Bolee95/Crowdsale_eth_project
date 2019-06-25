pragma solidity ^0.4.22;
import "./Crowdsale.sol";
import "./IERC20.sol";
import "./ELFAKtoken.sol";

contract TokenCrowdsale is Crowdsale {
    
    struct Transaction
    {
        address beneficiaryAddress;
        uint256 tokensBrought;
        uint256 time;
    }
    
    Transaction[] public transactions;
    uint128 public transactionCounter = 0;
    
    address private creator;
    
    constructor(uint16 _rate, address  _wallet, IERC20 _token) public Crowdsale(_rate, _wallet, _token) {
        creator = msg.sender;
    }
    
    function _preValidatePurchase(address beneficiary, uint256 weiAmount) internal view {
        super._preValidatePurchase(beneficiary, weiAmount);
    }
    
    function _postValidatePurchase(address beneficiary, uint256 weiAmount) internal view {
        super._postValidatePurchase(beneficiary,weiAmount);
    }
    
    function _deliverTokens(address beneficiary, uint256 tokenAmount) internal {
        token().approve(beneficiary,tokenAmount);
        // Mora ovako za sad, mozda se nadje bolje resenje
        // transferFrom moze da koristi klijent, jer on na taj nacin moze da prebacuje sredstava koja su prethodno dodeljena sa approve
        //token().transferFrom(msg.sender,beneficiary,tokenAmount);
        token().transfer(beneficiary,tokenAmount);
        
        Transaction memory newOrder;
        newOrder.beneficiaryAddress = beneficiary;
        newOrder.tokensBrought = tokenAmount;
        newOrder.time = now;
        
        transactions.push(newOrder);
        transactionCounter++;
    }
}