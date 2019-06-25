# Crowdsale_eth_project Deployment process

***IMPORTANT***
Steps for working deployment:
1) Deploy **ELFAKtoken.sol** contract with some value of tokens that are going to be created
2) Deploy **TimedTokenCrowdsale.sol** contract by passing address of 
previously created ELFAKtoken on network
3) **Most important step, must be done to work properly with current implementation** Call ELFAKtoken contract as creator of it and trasfer directly some value of tokens to address of deployed **TimedTokenCrowdsale** contract. By doing this, **TimedTokenCrowdsale** can call functions of **ELFAKtoken** contract and transfer funds to those who want to purchase tokens, thus wallet that was given will get pay in gas and will transfer tokens to beneficiary.