pragma solidity ^0.4.22;
import "./ERC20Detailed.sol";
import "./SafeMath.sol";
import "./Owned.sol";
contract ELFAKtoken is Owned, ERC20Detailed {

    using SafeMath for uint256;
    
    uint256 private totalTokensSupply;
    mapping(address => uint256) private balances;
    mapping(address => mapping(address => uint256)) allowed;
    mapping(address => bool) private limited;
    
    // Constructor
    constructor(uint256 tokenSupply) public ERC20Detailed("ELFAKToken", "ELF", 6)
    {
        address ownerAddress = getOwnerAddress();
        totalTokensSupply = tokenSupply;
        balances[ownerAddress] = totalTokensSupply;    
        emit Transfer(address(0), ownerAddress, totalTokensSupply);
    }

    // ------------------------------------------------------------------------
    // Get total supply
    // ------------------------------------------------------------------------
    function totalSupply() external view returns (uint256) {
        return totalTokensSupply;
    }
    
    // ------------------------------------------------------------------------
    // Get balance of some contract
    // ------------------------------------------------------------------------
    function balanceOf(address tokenOwner) external view returns (uint256 balance) {
        return balances[tokenOwner];
    }
    
    // ------------------------------------------------------------------------
    // Returns the amount of tokens approved by the owner that can be
    // transferred to the spender's account
    // ------------------------------------------------------------------------
    function allowance(address tokenOwner, address spender) public view returns (uint remaining) {
        return allowed[tokenOwner][spender];
    }
    
    // ------------------------------------------------------------------------
    // Transfer the balance from token owner's account to `to` account
    // - Owner's account must have sufficient balance to transfer
    // - 0 value transfers are allowed
    // ------------------------------------------------------------------------
    function transfer(address to,uint256  tokens) public EnoughFunds(msg.sender, tokens) returns (bool success) {
        require(to != address(0));
        uint256 futureBalance = balances[to] + tokens;

        _checkTotalShare(futureBalance);
        balances[msg.sender] = balances[msg.sender].sub(tokens);
        balances[to] = futureBalance;

        emit Transfer(msg.sender, to, tokens);
        return true;
    }
    
    // ------------------------------------------------------------------------
    // Token owner can approve for `spender` to transferFrom(...) `tokens`
    // from the token owner's account
    //
    // https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20-token-standard.md
    // recommends that there are no checks for the approval double-spend attack
    // as this should be implemented in user interfaces
    function approve(address spender, uint tokens) public returns (bool success) {
        allowed[msg.sender][spender] = tokens;
        emit Approval(msg.sender, spender, tokens);
        return true;
    }
    
    // ------------------------------------------------------------------------
    // Transfer `tokens` from the `from` account to the `to` account
    //
    // The calling account must already have sufficient tokens approve(...)-d
    // for spending from the `from` account and
    // - From account must have sufficient balance to transfer
    // - Spender must have sufficient allowance to transfer
    // - 0 value transfers are allowed
    function transferFrom(address from, address to, uint tokens) public EnoughFunds(from, tokens) returns (bool success)  {
        // Ako neko zeli da prebaci neka sredstva pozivom ove funkcije, mora prethono da ima dozvolu vlasnika tokena da to uradi
        uint256 futureBalance = balances[to].add(tokens);
        _checkTotalShare(futureBalance);       

        allowed[from][msg.sender] = allowed[from][msg.sender].sub(tokens);
        balances[from] = balances[from].sub(tokens);
        balances[to] = futureBalance;

        emit Transfer(from, to, tokens);
        return true;
    }
    
    //------------------------------------------------------------------------
    // Modifier if someone is having enough funds to Transfer
    //------------------------------------------------------------------------
    modifier EnoughFunds(address owner, uint256 ammountNeeded)
    {
        require(balances[owner] >= ammountNeeded);
        _;
    }

    // ------------------------------------------------------------------------
    // Internal function that checks if someone will own more then half of coins
    // ------------------------------------------------------------------------ 
    function _checkTotalShare(uint256 futureBalance) internal view {
        uint256 share = totalTokensSupply.div(futureBalance);
        // Someone can't own more then a half the coins
        require(share >= 2 , "Transaction cannot be completed. Contract will own more then a half of tokens!");
    }
}
