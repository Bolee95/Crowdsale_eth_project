import Web3 from "web3";

let web3;

if (typeof window != "undefined" && typeof window.web3 !== "undefined") {
  //Metamask is available
  web3 = new Web3(window.web3.currentProvider);
} else {
  //Metamask is not available
  web3 = null;
}

export default web3;
