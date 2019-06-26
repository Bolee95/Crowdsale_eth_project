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

describe('Timed and rate changing Crowdsale testing', () => {

    beforeEach(async() => {
        accounts = await web3.eth.getAccounts();
        
        token = await new web3.eth.Contract(JSON.parse(ELFAKToken.interface))
        .deploy({ data: ELFAKToken.bytecode, arguments:[totalTokenSupply]})
        .send({from: accounts[0], gas: '2000000'});

        let time = (new Date).getTime() / 1000; // Unix Epoch time

        crowdsale = await new web3.eth.Contract(JSON.parse(Crowdsale.interface))
        .deploy({data: Crowdsale.bytecode, arguments:[30, 1, accounts[0], token.options.address, time, time + 1000 ]})
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

    /*
    it('Checking extension of closing time for Crowdsale contract', async() => {

        await crowdsale.methods._extendTime(time + 1100)
        .send({from: accounts[0], gas: '1000000'})

    });
    */
});
// ------------------
// Poziv payable funkcije
// ------------------
/*
it('sends donation', async () => {
    const donationsAddress = await donations.methods.getDonations()
    .call({from:accounts[0]});

    const publicDonation = new web3.eth.Contract(JSON.parse(PublicDonation.interface),donationsAddress[0]);

    // Poziv funkcije za placanje (payable)
    await publicDonation.methods.donate()
    .send({from:accounts[2], gas:60000000, value: web3.utils.toWei('0.1', 'ether')});

    const donated = await publicDonation.methods.totalDonations()
    .call({from:accounts[0]});

    const donors = await publicDonation.methods.getDonations()
    .call({from:accounts[0]});

    assert(web3.utils.fromWei(donated, 'ether'), '0.1');
    assert(donors[0], accounts[2]);
})

*/