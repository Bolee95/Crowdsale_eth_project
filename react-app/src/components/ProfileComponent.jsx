import React, { Component } from "react";
import web3 from "./../services/web3";
import ElfakContract from "../services/ElfakContract";
import CrowdsaleContract from "../services/CrowdsaleContract";
import Addresses from "../ethereum/TokenAddresses";

class ProfileComponent extends Component {

  constructor(props) {
    super(props);
    this.handleGettingTokens = this.handleGettingTokens.bind(this);
  }

  state = {
    connected: false,
    address: "",
    totalSupply: "0",
    userBalans: "0",
    userAllowence: "0",
    metamaskBalans: "0 ETH",
    userAddress: ""
  };

  async componentDidMount() {
    let addreses = await web3.eth.getAccounts();
    let connected = addreses.length > 0;
    let address = "Adress not available";
    let balanceETH = "0 ETH";
    let totalBalans = 0;
    let userBalans = 0;
    let userAllowedFunds = 0;
    let userAddr = "";
    if (connected) {
      userAddr = addreses[0];
      balanceETH = await this.getBalance(userAddr);
      totalBalans = await ElfakContract.totalSupply();
      userBalans = await ElfakContract.balanceOf(userAddr);
      let ownerAddress = await ElfakContract.getOwnerAddress();
      userAllowedFunds = await ElfakContract.getAllowedAmountOfTokens(userAddr, ownerAddress);
      await ElfakContract.approvedFunds(userAddr);
      console.log();
    }

    this.setState({
      connected: connected,
      address: userAddr,
      totalSupply: totalBalans,
      userAllowence: userAllowedFunds,
      userBalans: userBalans,
      metamaskBalans: balanceETH,
      userAddress: userAddr
    });
  }
  
  async getBalance(address) {
    let balanceETH = "0 ETH";
    await web3.eth.getBalance(address, (err, balance) => {
      balanceETH = web3.utils.fromWei(balance, "ether") + " ETH";
    });

    return balanceETH;
  }

  async handleGettingTokens() {
    try {
      let tokensTransfered = await ElfakContract.getTokens(Addresses.TimedTokenCrowdsale,
        this.state.userAddress);
    }
    catch (error) { console.log("ERROR:   " + error) }

    //if (tokensTransfered) {
    //    this.state.userBalans = await ElfakContract.balanceOf(this.state.userAddress);
    //}
  }


  connectedText() {
    let connected;
    if (this.state.connected) {
      connected = "User connected to Metamask";
    } else {
      connected = "User not connected to Metamask";
    }
    return connected;
  }

  render() {
    let renderButton = "";
    if (this.state.userAllowence > 0) {
      renderButton = <button
        className="btn btn-primary text-center"
        onClick={this.handleGettingTokens}       
      >
        Get tokens
     </button>
    }

    return (
      <React.Fragment>
        <h1 className="form-text m-2">User profile</h1>
        <h3 className="form-text m-2">{this.connectedText()}</h3>
        <div className="m-2">
          <div className="form-group row">
            <label htmlFor="staticAdress" className="col-sm-4 col-form-label">
              Address:
            </label>
            <div className="col-sm-8">
              <input
                type="text"
                readOnly
                className="form-control-plaintext"
                id="staticAdress"
                value={this.state.address}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="metamaskBalans" className="col-sm-4 col-form-label">
              Metamask balance:
            </label>
            <div className="col-sm-8">
              <input
                type="text"
                readOnly
                className="form-control"
                id="metamaskBalans"
                value={this.state.metamaskBalans}
              />
            </div>
          </div>
          <div className="form-group row">
            <label
              htmlFor="inputTotalSypply"
              className="col-sm-4 col-form-label"
            >
              Total supply:
            </label>
            <div className="col-sm-8">
              <input
                type="text"
                readOnly
                className="form-control"
                id="inputTotalSypply"
                value={this.state.totalSupply}
              />
            </div>
          </div>
          <div className="form-group row">
            <label
              htmlFor="inputTotalBalans"
              className="col-sm-4 col-form-label"
            >
              Total balance of user:
            </label>
            <div className="col-sm-8">
              <input
                type="text"
                readOnly
                className="form-control"
                id="inputTotalBalans"
                value={this.state.userBalans}
              />
            </div>
          </div>
          <div className="form-group row">
            <label
              htmlFor="inputTotalBalans"
              className="col-sm-4 col-form-label"
            >
              Current allowance:
            </label>
            <div className="col-sm-8">
              <input
                type="text"
                readOnly
                className="form-control"
                id="inputTotalBalans"
                value={this.state.userAllowence}
              />
            </div>
          </div>
          {renderButton}
        </div>
      </React.Fragment>
    );
  }
}

export default ProfileComponent;
