import bigInt from "big-integer";
import elfaktoken from "../ethereum/elfaktoken";
import crowdsale from "../ethereum/crowdsaletoken";

class ElfakContract {

    // Vraca naziv tokena
    async getTokenName() {
        const elfakToken = elfaktoken();      
        let tokenName = await elfakToken.methods.name().call();
        return tokenName.toString();
    }

    // Vraca skracenicu tokena (kao na primer ELF...)
    async getTokenSymbol() {
        const elfakToken = elfaktoken();      
        let tokenSymbol = await elfakToken.methods.symbol().call();
        return tokenSymbol.toString();
    }

    // Vraca ukupan broj tokena 
    async totalSupply() {
        const elfakToken = elfaktoken();      
        let totalSupply = await elfakToken.methods.totalSupply().call();
        let decimals = await elfakToken.methods.decimals().call();
        let decimalValue = bigInt(totalSupply._hex) / Math.pow(10,decimals);
        return decimalValue.toString();
    }

    // Vraca balans za korisnika koji pozove ovu funkciju
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

    // Metoda za transfer tokena sa jednog racuna na drugi, u slucaju da korisnik ima dozvolu da salje tokene
    async transferTokens(address,addrFrom, addrTo, tokenAmount) {
        const tokenContract = elfaktoken();
        let tokensTransfered = await tokenContract.methods.transferFrom(addrFrom, addrTo, tokenAmount)
        .send({from: address});
        return tokensTransfered;
    }

    // Metoda koja se poziva kada se klikne dugme @Get tokens@
    async getTokens(tokenOwner, address) {
        const tokenContract = elfaktoken();
        let approvedFunds = await tokenContract.methods.allowance(tokenOwner, address).call();
        let tokensTransfered = await tokenContract.methods.transferFrom(tokenOwner, address, approvedFunds)
        .send({from: address});
        return tokensTransfered;
    }

    // Metoda koja vraca adresu vlasnika tokena  
    async getOwnerAddress() {
        const tokenContract = elfaktoken();
        let tokenOwner = await tokenContract.methods.getOwnerAddress().call();
        return tokenOwner;   
    }

    // Metoda za slanje tokena od strane trenutnog korisnika prema drugom korisniku
    async sendTokens(address, addressTo, tokensAmmount) {
        const tokenContract = elfaktoken();
        let tokensTransfered = await tokenContract.methods.transfer(addressTo, tokensAmmount)
        .send({from: address});

        return tokensTransfered;
    }

    // Metoda za dozvoljavanje prenosa odredjene kolicine tokena onog ko poziva onome ko je prosledjen kao parametar 
    async allowTokenTransfer(callerAddress, addressTo, ammount) {
        const tokenContract = elfaktoken();
        let transferApproved = await tokenContract.methods.approve(addressTo, ammount)
        .send({from: callerAddress});
        return transferApproved;
    }

    // Metoda za proveru koliko korisnik ima dozvoljenih tokena da skine sa odredjene adrese
    async getAllowedAmountOfTokens(callerAddress, tokenOwner) {
        const tokenContract = elfaktoken();
        let allowedFunds = await tokenContract.methods.allowance(tokenOwner, callerAddress)
        .call();

        return bigInt(allowedFunds._hex).toString();
    }
    
    // Metoda koja pribavlja broj decimala zadatog tokena
    async getDecimals(){
        const tokenContract = elfaktoken();
        let decimals = await tokenContract.methods.decimals().call();

        return decimals;
    }    
}

export default ElfakContract = new ElfakContract();