pragma solidity ^0.4.22;

import "./IERC20.sol";
import "./Crowdsale.sol";
import "./IncreasingPriceCrowdsale.sol";
import "./TimedCrowdsale.sol";
import "./ELFAKtoken.sol";
import "./Owned.sol";

contract TimedTokenCrowdsale is IncreasingPriceCrowdsale, Owned {
    
    struct Transaction
    {
        address beneficiaryAddress;
        uint256 tokensBrought;
        uint256 timestamp;
    }
    
    Transaction[] public _transactions;
    uint128 public _transactionCounter = 0;

    event TransactionMade(address indexed beneficiary, uint256 indexed tokensBrought, uint256 timestamp);
    
    constructor(uint16 _startRate,uint16 _endRate, address _wallet, IERC20 _token, uint256 _startingDate, uint256 _endingDate) public 
    Crowdsale(_startRate, _wallet, _token)
    TimedCrowdsale(_startingDate,_endingDate)
    IncreasingPriceCrowdsale(_startRate,_endRate)
    {
    }
    
    function _preValidatePurchase(address beneficiary, uint256 weiAmount) internal view {
        super._preValidatePurchase(beneficiary, weiAmount);
        require(isOpen() == true, "TimedCrowdsale: Cannot buy tokens yet, its not time!");
    }
    
    function _postValidatePurchase(address beneficiary, uint256 weiAmount) internal view {
        super._postValidatePurchase(beneficiary, weiAmount);
    }
    
    function _deliverTokens(address beneficiary, uint256 tokenAmount) internal onlyWhileOpen {

        token().approve(beneficiary,tokenAmount);

        Transaction memory newOrder = Transaction({beneficiaryAddress: beneficiary,
                                                  tokensBrought: tokenAmount,
                                                  timestamp: now});

        emit TransactionMade(beneficiary, tokenAmount, now);
        _transactionCounter = _transactionCounter + 1;
        _transactions.push(newOrder);
    }
    
    function rate() public view returns (uint256) {
        return getCurrentRate();
    }

    function timeLeft() public view returns (uint256) {
        if (isOpen()) {
            return closingTime() - openingTime();
        } else {
            return 0;
        }
    }

     function extendTimedCrowdsaleDuration(uint256 newClosingTime) public onlyOwner {
         _extendTime(newClosingTime);
    }
}