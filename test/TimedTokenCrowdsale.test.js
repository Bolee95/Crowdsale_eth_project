const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const Crowdsale = require('../build/TimedTokenCrowdsale.json');

describe('Timed and rate changing Crowdsale testing', () => {
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