import React, { Component } from "react";
import web3 from "./../services/web3";
import swetAlert from "sweetalert2";
import ElfakContract from "../services/ElfakContract";

class TransferComponent extends Component {
  constructor(props) {
    super(props);

    this.handelCheckAddressImput = this.handelCheckAddressImput.bind(this);
    this.checkApproved = this.checkApproved.bind(this);

    this.InputAdressSender = this.InputAdressSender.bind(this);
    this.InputAdressReciver = this.InputAdressReciver.bind(this);
    this.InputTokenQuantity = this.InputTokenQuantity.bind(this);
    this.handleTransfer = this.handleTransfer.bind(this);
  }

  state = {
    approvedAmount: "",
    classes: "badge",
    tokenOwner: "",
    addressSender: "",
    adressRecive: "",
    tokenQuantity: ""
  };

  handelCheckAddressImput(event) {
    this.setState({ tokenOwner: event.target.value });
  }

  async checkApproved() {
    try {
      let addreses = await web3.eth.getAccounts();
      let address = addreses[0];
      let approved = await ElfakContract.getAllowedAmountOfTokens(
        address,
        this.state.tokenOwner
      );
      let approvedText;
      let classes;
      if (approved > 0) {
        approvedText = "User have " + approved + " approved tokens.";
        classes = "badge badge-success";
      } else {
        approvedText = "User does not have approved tokens.";
        classes = "badge badge-danger";
      }

      this.setState({ approvedAmount: approvedText, classes: classes });
    } catch (e) {
      swetAlert.fire(
        "Faild!",
        "Error! More information can found in browser console.",
        "error"
      );
      console.log("error", e);
    }
  }

  InputAdressSender(event) {
    this.setState({ addressSender: event.target.value });
  }

  InputAdressReciver(event) {
    this.setState({ adressRecive: event.target.value });
  }

  InputTokenQuantity(event) {
    this.setState({ tokenQuantity: event.target.value });
  }

  async handleTransfer() {
    try {
      let addreses = await web3.eth.getAccounts();
      let address = addreses[0];
      let transferResponse = await ElfakContract.transferTokens(
        address,
        this.state.addressSender,
        this.state.adressRecive,
        this.state.tokenQuantity
      );

      swetAlert.fire("Success!", "You successfull transfer coins!", "success");
    } catch (e) {
      swetAlert.fire(
        "Faild!",
        "Error! More information can found in browser console.",
        "error"
      );
      console.log("error", e);
    }
  }

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
              onChange={this.handelCheckAddressImput}
            />
            <button
              className="btn btn-primary m-2"
              onClick={this.checkApproved}
            >
              Check
            </button>
            <span htmlFor="InputAdressApproved" className={this.state.classes}>
              {this.state.approvedAmount}
            </span>
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
              value={this.state.addressSender}
              onChange={this.InputAdressSender}
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
              value={this.state.adressRecive}
              onChange={this.InputAdressReciver}
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
              value={this.state.tokenQuantity}
              onChange={this.InputTokenQuantity}
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
