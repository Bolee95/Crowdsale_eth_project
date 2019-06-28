pragma solidity ^0.4.22;
import "./ERC20Detailed.sol";
import "./SafeMath.sol";
import "./Owned.sol";
contract ELFAKtoken is Owned, ERC20Detailed {

    using SafeMath for uint256;
    
    uint256 private _totalTokensSupply;
    mapping(address => uint256) private _balances;
    mapping(address => mapping(address => uint256)) _allowed;
    
    // Constructor
    constructor(uint256 tokenSupply) public ERC20Detailed("ELFAKToken", "ELF", 6)
    {
        address ownerAddress = getOwnerAddress();
        _totalTokensSupply = tokenSupply;
        _balances[ownerAddress] = _totalTokensSupply;    
        emit Transfer(address(0), ownerAddress, _totalTokensSupply);
    }

    // ------------------------------------------------------------------------
    // Get total supply
    // ------------------------------------------------------------------------
    function totalSupply() external view returns (uint256) {
        return _totalTokensSupply;
    }
    
    // ------------------------------------------------------------------------
    // Get balance of some contract
    // ------------------------------------------------------------------------
    function balanceOf(address tokenOwner) external view returns (uint256 balance) {
        return _balances[tokenOwner];
    }
    
    // ------------------------------------------------------------------------
    // Returns the amount of tokens approved by the owner that can be
    // transferred to the spender's account
    // ------------------------------------------------------------------------
    function allowance(address tokenOwner, address spender) public view returns (uint remaining) {
        return _allowed[tokenOwner][spender];
    }
    
    // ------------------------------------------------------------------------
    // Transfer the balance from token owner's account to `to` account
    // - Owner's account must have sufficient balance to transfer
    // - 0 value transfers are allowed
    // ------------------------------------------------------------------------
    function transfer(address to,uint256  tokens) public EnoughFunds(msg.sender, tokens) returns (bool success) {
        require(to != address(0), "ERC20: Transfer cannot be made to zero address. Tokens would be destoried!");
        uint256 futureBalance = _balances[to] + tokens;

        _checkTotalShare(futureBalance);
        _balances[msg.sender] = _balances[msg.sender].sub(tokens);
        _balances[to] = futureBalance;

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
        _allowed[msg.sender][spender] = tokens;
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
        uint256 futureBalance = _balances[to].add(tokens);
        _checkTotalShare(futureBalance);       

        _allowed[from][msg.sender] = _allowed[from][msg.sender].sub(tokens);
        _balances[from] = _balances[from].sub(tokens);
        _balances[to] = futureBalance;

        emit Transfer(from, to, tokens);
        return true;
    }
    
    //------------------------------------------------------------------------
    // Modifier if someone is having enough funds to Transfer
    //------------------------------------------------------------------------
    modifier EnoughFunds(address owner, uint256 ammountNeeded)
    {
        require(_balances[owner] >= ammountNeeded, "ERC20: There is no enough funds to transfer.");
        _;
    }

    // ------------------------------------------------------------------------
    // Internal function that checks if someone will own more then half of coins
    // ------------------------------------------------------------------------ 
    function _checkTotalShare(uint256 futureBalance) internal view {
        uint256 share = _totalTokensSupply.div(futureBalance);
        // Someone can't own more then a half the coins
        require(share >= 2 , "ERC20: Transaction cannot be completed. Contract will own more then a half of tokens!");
    }
}
