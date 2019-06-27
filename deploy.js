const path = require('path');
const fs = require('fs-extra');
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');

const tokenProvider = new HDWalletProvider('oxygen purchase shy seven filter saddle mansion process joke begin abstract hover','https://rinkeby.infura.io/v3/b218dc156a124ecdaf26797f287fdd73');
const crowdsaleProvider = new HDWalletProvider('oxygen purchase shy seven filter saddle mansion process joke begin abstract hover','https://rinkeby.infura.io/v3/ab736db017d74d9dbf2333566d6700cb');
var web3 = new Web3(tokenProvider);

const ELFAKToken = require('./build/ELFAKtoken.json');
const Crowdsale = require('./build/TimedTokenCrowdsale.json');

const deploy = async() => {

    accounts = await web3.eth.getAccounts();
    let resultToken;
    let resultCrowdsale;

    console.log('Starting deployment of ELFAKtoken');
    console.log('Attempt to deploy from account', accounts[0]);

    try {
        resultToken = await new web3.eth.Contract(JSON.parse(ELFAKToken.interface))
            .deploy({ data: '0x' + ELFAKToken.bytecode, arguments: [10000000000000]})
           .send({from: accounts[0]});

           console.log('ELFAKtoken deployment completed');
           console.log(resultToken.options.address);
       
           fs.outputFileSync(path.resolve(__dirname, 'ELFAKtokenContractAddress.js'),
           'const tokenAddress = ' + resultToken.options.address + ';\nmodule.exports = { tokenAddress };\n');
    }
    catch(err) {
        console.log('Error has occured during ELFAKtoken deployment', err);
    }

    console.log('Starting deployment of TimedTokenCrowdsale');
    console.log('Attempt to deploy from account', accounts[0]);

    try {
        let time = (new Date).getTime() / 1000; // Unix Epoch time

        web3 = new Web3(crowdsaleProvider);
        resultCrowdsale = await new web3.eth.Contract(JSON.parse(Crowdsale.interface))
        .deploy({ data: '0x' + Crowdsale.bytecode, arguments: [100, 1, accounts[0], resultToken.options.address, time, time + 1562454178]}) // 6.7.2019. 11:02:58
        .send({from: accounts[0], gas: '7000000'});

        console.log('TimedTokenCrowdsale deployment completed');
        console.log(resultCrowdsale.options.address);

        fs.outputFileSync(path.resolve(__dirname, 'TimedTokenCrowdsaleContractAddress.js'),
        'const crowdsaleAddress = ' + resultCrowdsale.options.address + ';\nmodule.exports = { crowdsaleAddress };\n');
    }
    catch(err) {
        console.log('Error has occured during TimedTokenCrowdsale deployment', err);
    }
};

deploy();
