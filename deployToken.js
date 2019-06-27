const path = require('path');
const fs = require('fs-extra');
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');

const tokenProvider = new HDWalletProvider('ensure always need flower bullet system second harbor address smart drink tobacco','https://rinkeby.infura.io/v3/b218dc156a124ecdaf26797f287fdd73');
const web3 = new Web3(tokenProvider);

const ELFAKToken = require('./build/ELFAKtoken.json');

const deploy = async() => {

    accounts = await web3.eth.getAccounts();
    let resultToken;
    console.log('Starting deployment of ELFAKtoken');
    console.log('Attempt to deploy from account', accounts[0]);
    try {
        resultToken = await new web3.eth.Contract(JSON.parse(ELFAKToken.interface))
            .deploy({ data: '0x' + ELFAKToken.bytecode, arguments: [10000000000000]})
           .send({from: accounts[0]});

           console.log('ELFAKtoken deployment completed');
           console.log(resultToken.options.address);
       
           fs.outputFileSync(path.resolve(__dirname, 'ELFAKtokenContractAddress.js'),
           'const tokenAddress = \'' + resultToken.options.address + '\';\nmodule.exports = { tokenAddress };\n');
    }
    catch(err) {
        console.log('Error has occured during ELFAKtoken deployment', err);
    }
};

deploy();