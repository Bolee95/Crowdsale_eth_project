const path = require('path');
const fs = require('fs-extra');
const solc = require('solc');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const publicTokenPath = path.resolve(__dirname, 'contacts', 'ELFAKtoken.sol');
const publicCrowdsalePath = path.resolve(__dirname, 'contacts', 'CrowdsaleProject.sol');
const publicOwnedPath = path.resolve(__dirname, 'contacts', 'Owned.sol');
const publicIERC20Path = path.resolve(__dirname, 'contacts', 'IERC20.sol');
const publicERC20DetailedPath = path.resolve(__dirname, 'contacts', 'ERC20Detailed.sol');
const publicSafeMathPath = path.resolve(__dirname, 'contacts', 'SafeMath.sol');
const publicAbsCrowdsalePath = path.resolve(__dirname, 'contacts', 'Crowdsale.sol');
const publicReentrancyPath = path.resolve(__dirname, 'contacts', 'ReentrancyGuard.sol');

// TimedTokenCrowdsale 
const publicTimedCrowdsalePath = path.resolve(__dirname, 'contacts', 'TimedCrowdsale.sol');
const publicTimedTokenCrowdsalePath = path.resolve(__dirname, 'contacts', 'TimedTokenCrowdsale.sol');
const publicIncreasedPriceCrowdsalePath = path.resolve(__dirname, 'contacts', 'IncreasingPriceCrowdsale.sol');

const sources = {
    'ELFAKtoken.sol' : fs.readFileSync(publicTokenPath, 'utf8'),
    'CrowdsaleProject.sol' : fs.readFileSync(publicCrowdsalePath, 'utf8'),
    'Owned.sol' : fs.readFileSync(publicOwnedPath, 'utf8'),
    'IERC20.sol' : fs.readFileSync(publicIERC20Path, 'utf8'),
    'ERC20Detailed.sol' : fs.readFileSync(publicERC20DetailedPath, 'utf8'),
    'SafeMath.sol' : fs.readFileSync(publicSafeMathPath, 'utf8'),
    'Crowdsale.sol' : fs.readFileSync(publicAbsCrowdsalePath, 'utf8'),
    'ReentrancyGuard.sol' : fs.readFileSync(publicReentrancyPath, 'utf8'),
    'TimedCrowdsale.sol': fs.readFileSync(publicTimedCrowdsalePath, 'utf8'),
    'TimedTokenCrowdsale.sol': fs.readFileSync(publicTimedTokenCrowdsalePath, 'utf8'),
    'IncreasingPriceCrowdsale.sol': fs.readFileSync(publicIncreasedPriceCrowdsalePath, 'utf8')
}

const output = solc.compile({sources}, 1).contracts;

fs.ensureDirSync(buildPath);

console.log('Saving interface and bytecode for contracts....');
for (let contract in output) {
    fs.outputJsonSync(
        path.resolve(buildPath, contract.substring(contract.indexOf(':') + 1) + '.json'),
    output[contract]
    );
}