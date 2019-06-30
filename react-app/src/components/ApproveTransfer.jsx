import React, { Component } from "react";

class ApproveComponent extends Component {
    constructor(props) {
        super(props);
        this.handleBye = this.handleBye.bind(this);
        this.handleChangeEthers = this.handleChangeEthers.bind(this);
        this.handleChangeElfak = this.handleChangeElfak.bind(this);
      }
    
  state = {
    currentRate: "2",
    ethers: "0",
    elfak: "0"
  };

  handleChangeEthers(event) {
    let ethers = event.target.value;
    let elfak = 0;
   
    elfak = ethers * this.state.currentRate;

    this.setState({ ethers: ethers, elfak: elfak });
  }

  handleChangeElfak(event) {
    let elfak = event.target.value;
    let ethers = 0;

    ethers = elfak / this.state.currentRate;

    this.setState({ ethers: ethers, elfak:elfak });
  }

  async handleBye(){

  }

  render() {
    return (
      <React.Fragment>
        <h1 className="form-text m-2">Bye tokens</h1>
        <div className="col-md-12">
          <div className="form-group">
            <label htmlFor="AddressSender">Quantity of ethes</label>
            <input
              type="text"
              className="form-control"
              id="AddressSender"
              aria-describedby="emailHelp"
              placeholder="Enter quantity"
              value = {this.state.ethers}
              onChange = {this.handleChangeEthers}
            />
            <small id="QuantityEtherHelp" className="form-text text-muted">
              Enter quantity of ethers wihch you wont to spend.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="InputQuantityELFAK">Quantity ELFAK token</label>
            <input
              type="text"
              className="form-control"
              id="InputQuantityELFAK"
              placeholder="Enter quantity"
              value = {this.state.elfak}
              onChange = {this.handleChangeElfak}
            />
            <small id="QuantityEtherELFAKHelp" className="form-text text-muted">
              Enter quantity of elfak token wihch you wont to bye.
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
              Coefficient of replacement.
            </small>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={this.handleBye}
          >
            Bye
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default ApproveComponent;
