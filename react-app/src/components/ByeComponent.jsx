import React, { Component } from "react";
import CrowdsaleContract from "../services/CrowdsaleContract";
import web3 from "./../services/web3";
import swetAlert from "sweetalert2";

class ByeComponent extends Component {
  constructor(props) {
    super(props);
    this.handleBye = this.handleBye.bind(this);
    this.handleChangeEthers = this.handleChangeEthers.bind(this);
    this.handleChangeElfak = this.handleChangeElfak.bind(this);
  }

  state = {
    currentRate: "",
    ethers: "",
    elfak: ""
  };

  async componentDidMount() {
    let crntRate = await CrowdsaleContract.getCurrentRate();
    this.setState({ currentRate: crntRate });
  }

  async handleChangeEthers(event) {
    let weis = event.target.value;
    let tokens = await CrowdsaleContract.convertWeiToToken(
      weis,
      this.state.currentRate
    );
    this.setState({ ethers: weis, elfak: tokens });
  }

  async handleChangeElfak(event) {
    let tokens = event.target.value;
    let weis = await CrowdsaleContract.convertTokenToWei(
      tokens,
      this.state.currentRate
    );
    this.setState({ ethers: weis, elfak: tokens });
  }

  async handleBye() {
    let addreses = await web3.eth.getAccounts();
    try {
      let tokensBrought = await CrowdsaleContract.buyTokens(
        addreses[0],
        this.state.ethers
      );
      swetAlert.fire(
        'Success!',
        'You successfull send coins!',
        'success'
      )
    } catch (error) {
      swetAlert.fire(
        "Faild!",
        "Error! More information can found in browser console.",
        "error"
      );
      console.log("ERROR message: " + error);
    }
  }

  render() {
    return (
      <React.Fragment>
        <h1 className="form-text m-2">Buy tokens</h1>
        <div className="col-md-12">
          <div className="form-group">
            <label htmlFor="QuantityEther">Quantity of wei</label>
            <input
              type="text"
              className="form-control"
              id="QuantityEther"
              aria-describedby="emailHelp"
              placeholder="Enter quantity"
              value={this.state.ethers}
              onChange={this.handleChangeEthers}
            />
            <small id="QuantityEtherHelp" className="form-text text-muted">
              Enter quantity of wei which you want to spend.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="InputQuantityELFAK">Quantity ELFAKtoken</label>
            <input
              type="text"
              className="form-control"
              id="InputQuantityELFAK"
              placeholder="Enter quantity"
              value={this.state.elfak}
              onChange={this.handleChangeElfak}
            />
            <small id="QuantityEtherELFAKHelp" className="form-text text-muted">
              Enter quantity of ELFAKtoken witch you want to buy.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="InputCurrentRate">Current rate</label>
            <input
              type="text"
              className="form-control"
              readOnly
              id="InputCurrentRate"
              aria-describedby="emailHelp"
              value={this.state.currentRate}
            />
            <small id="AdressHelp" className="form-text text-muted">
              Current rate
            </small>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={this.handleBye}
          >
            Buy
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default ByeComponent;
