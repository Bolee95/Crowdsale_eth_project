const path = require('path');
const fs = require('fs-extra');
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {tokenAddress} = require('./ELFAKtokenContractAddress');

const crowdsaleProvider = new HDWalletProvider('ensure always need flower bullet system second harbor address smart drink tobacco','https://rinkeby.infura.io/v3/af4014d9acde40558f050018384911e6');
const web3 = new Web3(crowdsaleProvider);

const Crowdsale = require('./build/TimedTokenCrowdsale.json');

const deploy = async() => {
    accounts = await web3.eth.getAccounts();
    let resultCrowdsale;
    console.log('Starting deployment of TimedTokenCrowdsale');
    console.log('Attempt to deploy from account', accounts[0]);
    try {
        const time = (new Date).getTime() / 1000; // Unix Epoch time
        resultCrowdsale = await new web3.eth.Contract(JSON.parse(Crowdsale.interface))
        .deploy({ data: '0x' + Crowdsale.bytecode, arguments: [100, 1, accounts[0], tokenAddress, time + 1000, time + 1562454178]}) // 6.7.2019. 11:02:58
        .send({from: accounts[0]});

        console.log('TimedTokenCrowdsale deployment completed');
        console.log(resultCrowdsale.options.address);
        //0x0f5ca72BcAC2f64863Ee58E4066115427041168D 
        //0x8b6Da41cc4b62eC7d49917e8B2AC93FF2d3bC017
        fs.outputFileSync(path.resolve(__dirname, 'TimedTokenCrowdsaleContractAddress.js'),
        ' const crowdsaleAddress = \'' + resultCrowdsale.options.address + '\';\nmodule.exports = { crowdsaleAddress};\n');
    }
    catch(err) {
        console.log('Error has occured during TimedTokenCrowdsale deployment', err);
    }
};

deploy();