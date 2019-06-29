import bigInt from "big-integer";
import elfaktoken from "../ethereum/elfaktoken";
import crowdsale from "../ethereum/crowdsaletoken";

class CrowdsaleContract {
    
    // Vraca vreme kada krece da bude aktivan ugovor - Unix Epoch time
    async openingTime() {
        const crowdsaleContract = crowdsale();
        let openingTime = await crowdsaleContract.methods.openingTime().call();

        var date = new Date(0);
        date.setUTCSeconds(bigInt(openingTime._hex));
        return date.toLocaleTimeString() + ' ' +  date.toDateString();
    }

    // Vraca vreme kada se ugovor zavrsava - Unix Epoch time
    async closingTime() {
        const crowdsaleContract = crowdsale();
        let closingTime = await crowdsaleContract.methods.closingTime().call();

        var date = new Date(0);
        date.setUTCSeconds(bigInt(closingTime._hex));
        return date.toLocaleTimeString() + ' ' +  date.toDateString();
    }

    // Proverava da li je ugovor otvoren za trgovinu
    async isCrowdsaleOpen() {
        const crowdsaleContract = crowdsale();
        let isOpen = await crowdsaleContract.methods.isOpen().call();
        return isOpen; // bool vraca
    }

    // Vraca vreme koliko je jos ugovor Crowdsale otvoren za trgovinu
    async timeLeftToCloseContract() {
        const crowdsaleContract = crowdsale();
        let timeLeft = await crowdsaleContract.methods.timeLeft().call();

        var date = new Date(0);
        date.setUTCSeconds(bigInt(timeLeft._hex));

        return date.toLocaleTimeString();
    }
    
    // Metoda za kupovinu tokena od strane trenutnog korisnika (dobija se samo approve)
    async buyTokens(address,tokenAmount) {
        const crowdsaleContract = crowdsale();
        let tokensApproved = await crowdsaleContract.methods.buyTokens(address)
        .send({from: address, value: tokenAmount});
        return tokensApproved;
    }

     // Metoda za kupovinu tokena od strane trenutnog korisnika (dobija se samo approve)
     async getCurrentRate() {
        const crowdsaleContract = crowdsale();
        let currentRate = await crowdsaleContract.methods.getCurrentRate()
        .call();
        return bigInt(currentRate._hex).toString;
    }

}
