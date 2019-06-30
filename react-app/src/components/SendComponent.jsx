import React, { Component } from "react";
import ElfakContract from '../services/ElfakContract';
import swetAlert from "sweetalert2";
import web3 from "./../services/web3";

class SendComponent extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeValaue = this.handleChangeValaue.bind(this);
    this.handleChangeAddress = this.handleChangeAddress.bind(this);
  }

  state = {
    address: "0",
    value: "0"
  };

  /*
  handleSubmit(model){
    
  }
*/

  async handleSubmit(event) {
    try {
    let addreses = await web3.eth.getAccounts();
    let address = addreses[0];
    let success = await ElfakContract.sendTokens(address, this.state.address, this.state.value);
    if(success){
    swetAlert.fire(
      'Success!',
      'You successfull send coins!',
      'success'
    )
    }
    } catch (e) {
      swetAlert.fire(
        'Faild!',
        'Error!',
        'error'
      )
      console.log("error", e);
    }
  }

  handleChangeValaue(event) {
    this.setState({ value: event.target.value });
  }

  handleChangeAddress(event) {
    this.setState({ address: event.target.value });
  }

  render() {
    return (
      <React.Fragment>
        <h1 className="form-text m-2">Send tokens</h1>
        <div className="col-md-12">
          <div className="form-group">
            <label htmlFor="InputAdress">Adress where send</label>
            <input
              name = "address"
              onChange = {this.handleChangeAddress}
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
              name = "quantity"
              onChange = {this.handleChangeValaue}
              type="text"
              className="form-control"
              id="InputQuantity"
              placeholder="Enter quantity"
            />
          </div>
          <button className="btn btn-primary" onClick={this.handleSubmit}>
            Submit
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default SendComponent;
