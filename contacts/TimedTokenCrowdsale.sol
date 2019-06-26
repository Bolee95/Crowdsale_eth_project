pragma solidity ^0.4.22;

import "./IERC20.sol";
import "./Crowdsale.sol";
import "./IncreasingPriceCrowdsale.sol";
import "./TimedCrowdsale.sol";
import "./ELFAKtoken.sol";


contract TimedTokenCrowdsale is IncreasingPriceCrowdsale {
    
    struct Transaction
    {
        address beneficiaryAddress;
        uint256 tokensBrought;
        uint256 timestamp;
    }
    
    Transaction[] public transactions;
    uint128 public transactionCounter = 0;

    address public crowdsaleCreator;
    
    constructor(uint16 _startRate,uint16 _endRate, address _wallet, IERC20 _token, uint256 _startingDate, uint256 _endingDate) public 
    Crowdsale(_startRate, _wallet, _token)
    TimedCrowdsale(_startingDate,_endingDate)
    IncreasingPriceCrowdsale(_startRate,_endRate)
    {
        crowdsaleCreator = msg.sender;
    }
    
    function _preValidatePurchase(address beneficiary, uint256 weiAmount) internal view {
        super._preValidatePurchase(beneficiary, weiAmount);
        require(isOpen() == true, "Cannot buy tokens yet, its not time!");
    }
    
    function _postValidatePurchase(address beneficiary, uint256 weiAmount) internal view {
        super._postValidatePurchase(beneficiary, weiAmount);
    }
    
    function _deliverTokens(address beneficiary, uint256 tokenAmount) internal onlyWhileOpen {

        token().approve(beneficiary,tokenAmount);
        // Promeniti kad se sredi interakcija sa klijentom
        // token().transferFrom(msg.sender,beneficiary,tokenAmount);
        // token().transfer(beneficiary,tokenAmount);

        Transaction memory newOrder = Transaction({beneficiaryAddress: beneficiary,
                                                  tokensBrought: tokenAmount,
                                                  timestamp: now});
        
        transactionCounter = transactionCounter + 1;
        transactions.push(newOrder);
    }
    
    function rate() public view returns (uint256) {
        //getCurrentRate() -> returns the number of tokens a buyer gets per wei at a given time
        return getCurrentRate();
    }
}