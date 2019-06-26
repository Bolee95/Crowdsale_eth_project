
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const ELFAKToken = require('../build/ELFAKtoken.json');

// It funkcija -> za izvrsavanje pojedinacnih testova i provere dobijenih vrednosti
// Describe -> grupise vise pojedinacnih *it* funkcija 
// BeforeEach -> priprema odgovarajuce instance za dalje izvrsavanje testova

let accounts;
let token;
let totalTokenSupply = 100000000;

describe('ELFAK token testing', () => {

beforeEach(async() => {
        accounts = await web3.eth.getAccounts();

        token = await new web3.eth.Contract(JSON.parse(ELFAKToken.interface))
        .deploy({ data: ELFAKToken.bytecode, arguments:[totalTokenSupply]})
        .send({from: accounts[0], gas: '1000000'});
    });

    it('Checking proper depoyment of a contract', () => {
        assert.ok(token.options.address);
    })

    it('Checks balance of owner after creating contract with token', async () => {
        let balance = await token.methods.balanceOf(accounts[0])
            .call({from: accounts[0]});
        assert.ok(totalTokenSupply == balance);
    });

    it('Checks if allowence is being set properly', async() => {
        let approvedVal = 10000;
        await token.methods.approve(accounts[1], approvedVal)
        .send({from: accounts[0], gas: '1000000'});

        let allowence  = await token.methods.allowance(accounts[0], accounts[1])
        .call({from: accounts[1]});
        assert.ok(allowence == approvedVal);
    })

    it('Checking if token supply check is working properly', async() => {
        let resultCheck = await token.methods.transfer(accounts[1], totalTokenSupply / 2 - 1)
        .send({from: accounts[0], gas: '1000000'});
        assert.ok(resultCheck);
            
        try {
            resultCheck = await token.methods.transfer(accounts[1], totalTokenSupply / 2 + 1)
            .send({from: accounts[0], gas: '1000000'});
        } catch {
            console.log("Check throwed because require statement because someone would have more then a half of total tokens.\nThis is good in this case.");
            return;
        }
    })

    it('Testing of check when someone doesn\'t have enough tokens to send', async() => {
        let balance = await token.methods.balanceOf(accounts[0])
        .call({from: accounts[1]});

        try {
            await token.methods.transfer(accounts[1], balance + 1)
            .send({from: accounts[0], gas: '1000000'})
        }
        catch {
            console.log('Contracts method has thrown with require statement because someone is trying to send more token then it haves.');
        }
    })


    it('Testing transfer of tokens with transferFrom method when allowence was done before transaction', async() => {

        let unitsApproved = 10000;
        await token.methods.approve(accounts[1], unitsApproved)
        .send({from: accounts[0], gas: '1000000'})

        let approvedCheck = await token.methods.allowance(accounts[0], accounts[1])
        .call({from: accounts[0]})
        assert(approvedCheck == unitsApproved)

        await token.methods.transferFrom(accounts[0], accounts[1], unitsApproved)
        .send({from: accounts[1], gas: '1000000'})

        let newSpenderBalance = await token.methods.balanceOf(accounts[1])
        .call({from: accounts[0]})
        assert.ok(newSpenderBalance == unitsApproved)
    })

    it('Testing transfer of tokens with transferFrom method when allowence was NOT done before transaction', async() => {

        let tokensRequested = 10000;
        try {
            await token.methods.transferFrom(accounts[0], accounts[1], tokensRequested)
            .send({from: accounts[1], gas: '1000000'})
        }
        catch {
            console.log('This call of function should fail, because someone tries to take tokens without proper value of allowence.')
        }

        let newSpenderBalance = await token.methods.balanceOf(accounts[1])
        .call({from: accounts[0]})
        assert.notStrictEqual(newSpenderBalance, tokensRequested)
    })


    it('Testing transfer of tokens with transferFrom method when allowence was done before transaction, but with less allowense then requested', async() => {

        let unitsApproved = 10000;
        await token.methods.approve(accounts[1], unitsApproved)
        .send({from: accounts[0], gas: '1000000'})

        let approvedCheck = await token.methods.allowance(accounts[0], accounts[1])
        .call({from: accounts[0]})
        assert(approvedCheck == unitsApproved)

        try {
            await token.methods.transferFrom(accounts[0], accounts[1], unitsApproved + 1)
            .send({from: accounts[1], gas: '1000000'})
        }
        catch {
            console.log('This call of function should fail, because someone tries to take tokens without proper value of allowence.')
        }

        let newSpenderBalance = await token.methods.balanceOf(accounts[1])
        .call({from: accounts[0]})
        assert.notStrictEqual(newSpenderBalance, unitsApproved + 1)
    })
});

