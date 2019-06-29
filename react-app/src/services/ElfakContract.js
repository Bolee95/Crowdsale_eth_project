//import web3 from "./web3";
import bigInt from "big-integer";
import elfaktoken from "../ethereum/elfaktoken";
import crowdsale from "../ethereum/crowdsaletoken";
//import addresses from "../ethereum/TokenAddresses";

class ElfakContract{

    async totalSupply() {
        const elfakToken = elfaktoken();      
        let totalSupply = await elfakToken.methods.totalSupply().call();
        let decimals = await elfakToken.methods.decimals().call();
        let decimalValue = bigInt(totalSupply._hex) / Math.pow(10,decimals);
        return decimalValue.toString();
    }

    async balanceOf(address) {
        const elfakToken = elfaktoken(); 
        let balanceOf = await elfakToken.methods.balanceOf(address).call();
        let decimals = await elfakToken.methods.decimals().call();
        let decimalValue = bigInt(balanceOf._hex) / Math.pow(10,decimals);
        return decimalValue.toString();

    }

    // Metoda koja vraca dozvoljena sredstva za preuzimanje za trenutnog korisnika
    async approvedFunds(address) {
        const elfakToken = elfaktoken();
        let decimals = await elfakToken.methods.decimals().call();
        let tokenOwner = await elfakToken.methods.getOwnerAddress().call();
        let approvedFunds = await elfakToken.methods.allowance(tokenOwner, address).call();
        return bigInt(approvedFunds._hex) / Math.pow(10,decimals);
    }

    // Metoda za kupovinu tokena od strane trenutnog korisnika (dobija se samo approve)
    async buyTokens(address,tokenAmount) {
        const crowdsaleContract = crowdsale();
        let tokensApproved = await crowdsaleContract.methods.buyTokens(address)
        .send({from: address, value: tokenAmount});
        return tokensApproved;
    }

    // Metoda za transfer tokena sa jednog racuna na drugi, u slucaju da korisnik ima dozvolu da salje tokene
    async transferTokens(address,addrFrom, addrTo, tokenAmount) {
        const tokenContract = elfaktoken();
        let tokensTransfered = await tokenContract.methods.transferFrom(addrFrom, addrTo, tokenAmount)
        .send({from: address, value: tokenAmount});
        return tokensTransfered;
    }


    // Metoda koja se poziva kada se klikne dugme @Get tokens@
    async getTokens(address) {
        const tokenContract = elfaktoken();
        let tokenOwner = await tokenContract.methods.getOwnerAddress().call();
        let approvedFunds = await tokenContract.methods.allowance(tokenOwner, address).call();
        let tokensTransfered = await tokenContract.methods.transferFrom(tokenOwner, address, bigInt(approvedFunds._hex))
        .send({from: address, value: bigInt(approvedFunds._hex)});
        return tokensTransfered;
    }

    // Metoda za slanje tokena od strane trenutnog korisnika prema drugom korisniku
    async sendTokens(address, addressTo, tokensAmmount) {
        const tokenContract = elfaktoken();
        let tokensTransfered = await tokenContract.methods.transfer(addressTo, tokensAmmount)
        .send({from: address});

        return tokensTransfered;
    }
}

export default ElfakContract = new ElfakContract();