import React, { Component } from "react";
import web3 from "./../services/web3";
import ElfakContract from "../services/ElfakContract";

class TransferComponent extends Component {
  constructor(props) {
    super(props);

    this.checkApproved = this.checkApproved.bind(this);
    this.handleTransfer = this.handleTransfer.bind(this);
  }

  state = {
    approvedAmount: "",
    classes: "label",
    tokenOwner: ""
  };

  async checkApproved() {
    let addreses = await web3.eth.getAccounts();
    let address = addreses[0];
    let approved = ElfakContract.getAllowedAmountOfTokens(
      address,
      this.state.tokenOwner
    );
    let approvedText;
    let classes;
    if (approved > 0) {
      approvedText =
        "User have " +
        approved +
        " approved tokens from address " +
        this.state.tokenOwner;
      classes = "label label-success";
    } else {
      approvedText =
        "User does not have approved tokens from address " +
        this.state.tokenOwner;
      classes += "label label-danger";
    }

    this.setState({ approvedAmount: approvedText, classes: classes });
  }

  async handleTransfer() {}

  render() {
    return (
      <React.Fragment>
        <h1 className="form-text m-2">Check approved</h1>
        <div className="col-md-12">
          <div className="form-group">
            <label htmlFor="InputAdressWhoSend">Adress who approved</label>
            <input
              type="text"
              className="form-control"
              id="InputAdressWhoSend"
              aria-describedby="emailHelp"
              placeholder="Enter adress"
            />
            <button
              className="btn btn-primary m-2"
              onClick={this.checkApproved}
            >
              Check
            </button>
            <label htmlFor="InputAdressApproved" className="">
              {this.state.approvedAmount}
            </label>
          </div>
        </div>
        <h1 className="form-text m-2">Transfer tokens</h1>
        <div className="col-md-12">
          <div className="form-group">
            <label htmlFor="InputAdressWhoSend">Adress who send</label>
            <input
              type="text"
              className="form-control"
              id="InputAdressWhoSend"
              aria-describedby="emailHelp"
              placeholder="Enter adress"
            />
            <small id="InputAdressWhoSendHelp" className="form-text text-muted">
              The address from where it is sent.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="InputAdress">Adress where send</label>
            <input
              type="text"
              className="form-control"
              id="InputAdress"
              aria-describedby="emailHelp"
              placeholder="Enter adress"
            />
            <small id="AdressHelp" className="form-text text-muted">
              Adress where send tokens.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="InputQuantity">Quantity tokens</label>
            <input
              type="text"
              className="form-control"
              id="InputQuantity"
              placeholder="Enter quantity"
            />
          </div>
          <button className="btn btn-primary" onClick={this.handleTransfer}>
            Transfer
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default TransferComponent;
