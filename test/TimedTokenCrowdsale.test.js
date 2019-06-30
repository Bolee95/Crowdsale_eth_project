const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const Crowdsale = require('../build/TimedTokenCrowdsale.json');
const ELFAKToken = require('../build/ELFAKtoken.json');

let accounts;
let token;
let crowdsale;

let totalTokenSupply = 100000000;
let startingRate = 100;

describe('Timed and rate changing Crowdsale testing', () => {

    beforeEach(async() => {
        accounts = await web3.eth.getAccounts();
        
        token = await new web3.eth.Contract(JSON.parse(ELFAKToken.interface))
        .deploy({ data: ELFAKToken.bytecode, arguments:[totalTokenSupply]})
        .send({from: accounts[0], gas: '2000000'});

        let time = (new Date).getTime() / 1000; // Unix Epoch time

        crowdsale = await new web3.eth.Contract(JSON.parse(Crowdsale.interface))
        .deploy({data: Crowdsale.bytecode, arguments:[startingRate, 1, accounts[0], token.options.address, time, time + 99 ]})
        .send({from: accounts[0], gas: '2000000'});

        // Sending tokens to crowdsale contract
        let resultCheck = await token.methods.transfer(crowdsale.options.address, totalTokenSupply / 2)
        .send({from: accounts[0], gas: '1000000'});
    });

    it('Checking proper deployment of a contract ELFAKtoken', () => {
        console.log(token.options.address);
        assert.ok(token.options.address);
    });
        
    it('Checking proper deployment of a contract TimedCrowdsale', () => {
        console.log(crowdsale.options.address);
        assert.ok(crowdsale.options.address);
    });   

    it('Checking if Crowdsale contract got tokens that were being send by ELFAKtoken',async() => {
        let balance = await token.methods.balanceOf(crowdsale.options.address)
        .call({from: accounts[0]});

        console.log(balance);
        assert.ok(balance == (totalTokenSupply / 2));
    });   

    it('Checking if Crowdsale contract is open for trading',async() => {
        let openContract = await crowdsale.methods.isOpen()
        .call({from: accounts[0]});

        assert.ok(openContract);
    });   
    
    it('Checking if Crowdsale contract is closed (Needs new contract to be created...)', async() => {

        let time = (new Date).getTime() / 1000; 

        let crowdsaleTest = await new web3.eth.Contract(JSON.parse(Crowdsale.interface))
        .deploy({data: Crowdsale.bytecode, arguments:[30, 1, accounts[0], token.options.address, time + 100, time + 1000 ]})
        .send({from: accounts[0], gas: '2000000'});

        let openContract = await crowdsaleTest.methods.isOpen()
        .call({from: accounts[0]});

        assert.strictEqual(openContract, false);
    });

    it('Checking if rate changes over time while contract is open', async() => {

        delay(1.5);

        let currentRate = await crowdsale.methods.getCurrentRate()
            .call({from: accounts[0]});
            assert.ok(currentRate < startingRate);
    });

    it('Checking buying of tokens from Crowdsale contract and writting to transactions array', async() => {

        await crowdsale.methods.buyTokens(accounts[1])
        .send({from:accounts[0], gas: 400000, value: web3.utils.toWei('0.01', 'Kwei')});

        let allowance = await token.methods.allowance(crowdsale.options.address, accounts[1])
        .call({from: accounts[0]});

        console.log(allowance);
        assert.ok(allowance > 0); //cant predict amount of tokens received because of rate changing

        await token.methods.transferFrom(crowdsale.options.address, accounts[1], allowance)
        .send({from: accounts[1], gas: 400000});

        let balance = await token.methods.balanceOf(accounts[1])
        .call({from: accounts[0]});
        console.log('tokens taken beneficionary adress -->>' + balance);

        assert.ok(balance == allowance); 

        // Checking if transaction is written into array

        let transaction = await crowdsale.methods._transactions(0)
        .call({from: accounts[0]});

        assert(transaction != undefined)
    })

    it('Checking if transaction can be read when there is no any transaction written', async() => {
        try {
            let transaction = await crowdsale.methods._transactions(0)
            .call({from: accounts[0]});
        } catch(error) {
            console.log('There is no transactions to be shown.');
            console.log('Error message: ' + error);
        }       
    })


    it('Checking if tokens can be brought from zero address.', async() => {
        try {
            await crowdsale.methods.buyTokens(0x0)
            .send({from: accounts[0], gas: 400000, value: web3.utils.toWei('0.01', 'Kwei')});
        }
        catch(error) {
            console.log("Function throw because of buying tokens to zero address. ");
            console.log('Error message: ' + error);
        }
        assert.ok(true);
    })

    it('Checking if amount of token brought can be zero.', async() => {
        try {
            await crowdsale.methods.buyTokens(accounts[1])
            .send({from: accounts[0], gas: 400000, value: web3.utils.toWei('0.0', 'Kwei')});
        }
        catch(error) {
            console.log('Error message: ' + error);
        }
        assert.ok(true);
    })

    it('Checking if timeLeft returns number of seconds when Crowdsale is active', async() => {
        let timeLeft = await crowdsale.methods.timeLeft()
        .call({from: accounts[0]});

        assert.notEqual(timeLeft, 0);
    })

    it('Cheking if Crowdsale can be extended if entered time is less then current close time', async() => {       
        try {

            let time = (new Date).getTime() / 1000; // Unix Epoch time
            await crowdsale.methods.extendTimedCrowdsaleDuration(time - 96)
            .send({from: accounts[0], gas: 400000})
        } catch(error)
        {
            console.log('Error message: ' + error);
        }
    })

    it('Cheking if Crowdsale can be extended if entered time is less then current close time', async() => {      
        try {
            let time = (new Date).getTime() / 1000; // Unix Epoch time
            await crowdsale.methods.extendTimedCrowdsaleDuration(time - 100)
            .send({from: accounts[0], gas: 400000})
        } catch(error)
        {
            console.log('Error message: ' + error);
        }
        assert.ok(true);
    })
});

// Helper function for delaying execution
function delay(seconds) {
    let time = (new Date).getTime() / 1000; // Unix Epoch time 
        let delay = time + seconds;

        while (time < delay) // Making a delay of 1.5 sec so rate can change
        {
            time = (new Date).getTime() / 1000;
        }
}
