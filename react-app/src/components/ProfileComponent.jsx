import React, { Component } from "react";
import web3 from "./../services/web3";
import ElfakContract from "../services/ElfakContract";

class ProfileComponent extends Component {
  state = {
    connected: false,
    address: "",
    totalSupply: "0",
    userBalans: "0",
    metamaskBalans: "0 ETH"
  };

  async componentDidMount() {
    let addreses = await web3.eth.getAccounts();
    let connected = addreses.length > 0;
    let address = "Adress not available";
    let balanceETH = "0 ETH";
    let totalBalans = 0;
    let userBalans = 0;
    let tokensAprroved = false;
    if (connected) {
      address = addreses[0];
      balanceETH = await this.getBalance(address);
      totalBalans = await ElfakContract.totalSupply();
      userBalans = await ElfakContract.balanceOf(address);
      //tokensAprroved =  await ElfakContract.buyTokens(address,10000000);
      await ElfakContract.approvedFunds(address);
    }

    this.setState({
      connected: connected,
      address: address,
      totalSupply: totalBalans,
      userBalans: userBalans,
      metamaskBalans: balanceETH
    });
  }
  async getBalance(address) {
    let balanceETH = "0 ETH";
    await web3.eth.getBalance(address, (err, balance) => {
      balanceETH = web3.utils.fromWei(balance, "ether") + " ETH";
    });

    return balanceETH;
  }

  connectedText() {
    let connected;
    if (this.state.connected) {
      connected = "User connected to metamask";
    } else {
      connected = "User not connected to metamask";
    }
    return connected;
  }

  render() {
    return (
      <React.Fragment>
        <h1 className="form-text m-2">User profile</h1>
        <h3 className="form-text m-2">{this.connectedText()}</h3>
        <form className="m-2">
          <div className="form-group row">
            <label htmlFor="staticAdress" className="col-sm-4 col-form-label">
              Adress:
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
              Total supplay:
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
              Total balans for user:
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
        </form>
      </React.Fragment>
    );
  }
}

export default ProfileComponent;
