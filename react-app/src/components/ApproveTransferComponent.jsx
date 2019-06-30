import React, { Component } from "react";

class ApproveComponent extends Component {
    constructor(props) {
        super(props);
        this.handleBye = this.handleBye.bind(this);
        this.handleChangeAddress = this.handleChangeAddress.bind(this);
        this.handleChangeElfak = this.handleChangeElfak.bind(this);
      }
    
  state = {
    address: "",
    elfakTokens: ""
  };

  handleChangeAddress(event) {
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
        <h1 className="form-text m-2">Approve tokens</h1>
        <div className="col-md-12">
          <div className="form-group">
            <label htmlFor="AddressWhereSend">Address where approve</label>
            <input
              type="text"
              className="form-control"
              id="AddressWhereSend"
              aria-describedby="emailHelp"
              placeholder="Enter address"
              value = {this.state.address}
              onChange = {this.handleChangeAddress}
            />
            <small id="QuantityEtherHelp" className="form-text text-muted">
              Address which approve to withdraw tokens from your account.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="InputQuantityELFAK">Quantity ELFAK token</label>
            <input
              type="text"
              className="form-control"
              id="InputQuantityELFAK"
              placeholder="Enter quantity"
              value = {this.state.elfakTokens}
              onChange = {this.handleChangeElfak}
            />
            <small id="QuantityEtherELFAKHelp" className="form-text text-muted">
              Enter quantity of elfak token wihch you wont to withdraw.
            </small>
          </div>          
          <button
            className="btn btn-primary"
            onClick={this.handleBye}
          >
            Approve
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default ApproveComponent;
