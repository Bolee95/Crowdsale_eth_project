import web3 from "./web3";
import bigInt from "big-integer";
import elfaktoken from "../ethereum/elfaktoken";

class ElfakContract{

    async totalSupply(){
        const elfakToken = elfaktoken()
        const BN = web3.utils.BN;       
        let totalSupply = await elfakToken.methods.totalSupply().call();
        let decimalValue = bigInt(totalSupply._hex).toString();
        return decimalValue;
    }

    async balanceOf(address){
        const elfakToken = elfaktoken()
        const BN = web3.utils.BN;       
        let balanceOf = await elfakToken.methods.balanceOf(address).call();
        let decimalValue = bigInt(balanceOf._hex).toString();
        return decimalValue;
    }
}

export default ElfakContract = new ElfakContract();